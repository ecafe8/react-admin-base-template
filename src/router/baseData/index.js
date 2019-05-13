/**
 * 基础数据
 * route =  {
 *    key, // 必须唯一，将作为path加载文件，所以也需要为 /pages/ 文件夹下的同名文件
 *    isAntdIcon: true, // 是否使用 antd 的图标
 *    children: [], 结构同父级一致
 *    exact, // 是否绝对匹配
 *    name: '中文路径名称',
 *    icon: '', // 图标名
 *    pathParams: 'actId(\\d+)' //  路由参数, 可选
 *    hideInMenu: false, 可选
 *    target: '', // "_blank", 可选
 *    href: '', // "#", 可选
 *    needRender: '', // true/false, 可选 当含有子页面时，是否需要渲染当前页面。默认不渲染且重定向到第一个子页面。
 * }
 */
export default [
  {
    key: 'welcome',
    name: '欢迎页',
    icon: 'home',
  },
  {
    key: 'shopList',
    name: '门店列表',
    icon: 'shop',
    // 有子页面的情况下，不会加载自身渲染的index.js，默认会重定向到children[0]的子页面。
    // 如需要渲染页面，可指定 needRender: true
    needRender: true,
    children: [
      {
        key: 'detail',
        name: '门店详情',
        hideInMenu: true,
      },
      {
        key: 'edit',
        name: '门店编辑',
        hideInMenu: true,
      },
    ]
  },
  {
    key: 'itemList',
    name: '商品列表',
    icon: 'shopping',
    needRender: true,
    children: [
      {
        key: 'detail',
        name: '商品详情',
        hideInMenu: true,
      },
      {
        key: 'edit',
        name: '商品编辑',
        hideInMenu: true,
        pathParams: 'sid(\\d+)',
      },
    ]
  },
];
