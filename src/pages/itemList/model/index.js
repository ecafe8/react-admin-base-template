import Base from 'store/model/base';
import * as mobx from 'mobx';
import { getList } from 'api/item';
const { observable, action, runInAction, computed, reaction } = mobx;

export default class ItemModel extends Base {
  @observable state = 'done'; // done, pending
  @observable.shallow list = [];
  @observable total = 0;
  @observable keyword = '';
  @observable pageNo = 1;
  @observable pageSize = 10;

  constructor() {
    super();

    // 自动发起 getList 请求.
    reaction(
      () => [this.pageNo, this.pageSize, this.keyword],
      () => {
        this.getList();
      }
    );
  }


  @computed get loading() {
    return this.state === 'pending';
  }

  @computed get listData() {
    return [...this.list];
  }

  /**
   * 获取列表
   * @returns {Promise<void>}
   */
  @action async getList() {
    this.state = 'pending';
    try {
      const data = await getList({
        keyword: this.keyword,
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
