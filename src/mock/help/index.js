import Mock from 'mockjs';

export function output(data, code = 0, msg = '', notice = '') {
  return Mock.mock({
    code,
    msg,
    notice,
    data,
  });
}
