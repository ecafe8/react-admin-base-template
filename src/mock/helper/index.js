import Mock from 'mockjs';
import qs from 'qs';

export function output(data, code = 0, msg = '', notice = '') {
  return Mock.mock({
    code,
    msg,
    notice,
    data,
  });
}

export function queryString(url) {
  if (url.indexOf('?') !== -1) {
    url = url.split('?')[1];
  }
  return qs.parse(url);
}

/**
 * 通用mockApi方法，方便用于统一打印请求参数
 * @param url
 * @param cb
 * @returns {*}
 */
export function mockApi(url, cb = ({ request, params }) => {}) {
  return Mock.mock(url, request => {
    // console.log('request', request);
    let params = {};
    switch (request.type) {
      case 'POST': {
        params = JSON.parse(request.body);
        break;
      }
      case 'GET': {
        params = queryString(request.url);
        break;
      }
    }
    console.group(`${url}  请求参数为: `);
    console.log(params);
    console.groupEnd();
    return cb({ request, params });
  });
}
