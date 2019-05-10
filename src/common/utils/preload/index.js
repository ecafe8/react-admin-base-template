
// 注入 iconfont 图标
export const loadIconJS = () => {
  const ICON_FONT_URL = '//at.alicdn.com/t/font_737129_tedk0q5hn9c.js';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.defer = true;
  script.src = ICON_FONT_URL;
  document.head.appendChild(script);
};
