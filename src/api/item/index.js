import ajax from 'common/utils/ajax';

/**
 * @api {get} /getList 请求商品列表
 * @apiName getList
 * @apiGroup Item
 * @apiVersion 1.0.0
 * @apiDescription 请求商品列表
 *
 * @apiParam {string} num_iids 根据商品ID组查询商品, num_iids与其他参数互斥，如果有此参数，则不支持其他所有参数。
 * @apiParam {string} q 查询关键字
 * @apiParam {int} page_size 每页记录数
 * @apiParam {int} page_no 页码
 * @apiParam {bool} on_sale 是否在售
 * @apiParam {string='list_time:asc|desc(上架时间)', 'delist_time:asc|desc(下架时间)', 'num:asc|desc(商品数量)', 'modified:asc|desc(最近更改时间)', 'sold_quantity:asc|desc(商品销量)'} order_by 排序规则
 *
 * @apiSuccess {int} total 商品总数
 * @apiSuccess {object[]} list 商品列表
 * @apiSuccess {string} list.num_iid 商品id
 * @apiSuccess {string} list.title 商品标题
 * @apiSuccess {string} list.pic_url 商品图片地址
 * @apiSuccess {string} list.price 一口价
 * @apiSuccess {string} list.item_promo_price 优惠价
 *
 * @apiPermission user
 *
 * @apiSuccessExample 成功返回示例
 * HTTP/1.1 200 OK
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *    total: 1,
 *    list: [{
 *       num_iid: 12345,
 *       title: '五芳斋肉粽',
 *       pic_url: '//img.alicdn.com/thumb.jpg',
 *       price: '100.00',
 *       item_promo_price: '88.88',
 *     }]
 *   }
 * }
 */
export const getList = async (params) => await ajax.req({
  url: 'item.getList',
  params,
});

export const getDetail = async (params) => await ajax.req({
  url: 'item.getDetail',
  params,
});
