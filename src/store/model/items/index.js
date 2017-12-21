import * as mobx from 'mobx';
import ajax from 'common/utils/ajax';
import Base from 'store/model/base';
const { observable, action, runInAction, computed } = mobx;

/**
 * 商品列表
 */
export default class Items extends Base {
  @observable state = 'done'; // done, pending
  @observable list = [];
  @observable total = [];
  @observable keyword = '';
  @observable categoryId = 0;
  @observable pageNo = 1;
  @observable pageSize = 20;

  @computed get nickName() {
    return this.isSubAccount ? `${this.nick}:${this.subNick}` : this.nick;
  }

  @computed get loading() {
    return this.state === 'pending';
  }

  @computed get listData() {
    return mobx.toJS(this.list);
  }

  @action async getItemsList() {
    this.state = 'pending';
    try {
      const data = await ajax.req('items.getItemsList', {
        keyword: this.keyword,
        categoryId: this.categoryId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      });
      runInAction(() => {
        this.state = 'done';
        this.list = data.list;
        this.total = data.total;
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }



}

