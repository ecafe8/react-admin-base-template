import generate from 'nanoid/generate';

// Utils 定义公共方法

/**
 * 本地开发环境
 * @returns {boolean}
 */
export function isLocal() {
  return process.env.NODE_ENV !== 'production';
}

/**
 * 生成唯一ID
 * @param prefix
 * @param char
 * @param length
 * @returns {string}
 */
export function guid({prefix = '', char = '1234567890abcdef', length = 8}) {
  let id = generate(char, length);
  return prefix ? `${prefix}_${id}` : id;
}

/**
 * 添加事件绑定
 * @param el
 * @param event
 * @param handler
 */
export function addEvent(el, event, handler) {
  if (!el) return;
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, false);
  } else {
    el['on' + event] = handler;
  }
}

/**
 * 事件绑定移除
 * @param el
 * @param event
 * @param handler
 */
export function removeEvent(el, event, handler) {
  if (!el) return;
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, false);
  } else {
    el['on' + event] = null;
  }
}

/**
 * 颜色十六进制转为RGB
 * @param hex
 * @param a
 * @returns {string}
 */
export function hex2Rgba(hex, a = 1) {
  let rgb = []; // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) { // 判断传入是否为#三位十六进制数
    let sixHex = '#';
    hex.replace(/[0-9A-F]/ig, function(kw) {
      sixHex += kw + kw; // 把三位16进制数转化为六位
    });
    hex = sixHex; // 保存回hex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) { // 判断传入是否为#六位十六进制数
    hex.replace(/[0-9A-F]{2}/ig, function(kw) {
      rgb.push(eval('0x' + kw)); // 十六进制转化为十进制并存如数组
    });
    return `rgb(${rgb.join(',')},${a})`; // 输出RGB格式颜色
  } else {
    console.log(`Input ${hex} is wrong!`);
    return 'rgb(0,0,0)';
  }
}

export function isEquals(arg1, arg2) {
  let aProps = Object.getOwnPropertyNames(arg1);
  let bProps = Object.getOwnPropertyNames(arg2);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if (arg1[propName] !== arg2[propName]) {
      return false;
    }
  }
  return true;
}

export function arrayChunk(array, size = 1) {
  let len = array.length;
  let newArr = [];
  for (let i = 0; i < len; i += size) {
    newArr.push(array.slice(i, i + size));
  }
  return newArr;
}

export function urlSlashFormat(url) {
  if (url && !/data:image/.test(url)) {
    url = `//${String(url).replace(/(.*|^)(:|^)(\/\/)(.*)/ig, '$4')}`;
  }
  return url;
}
