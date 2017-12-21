import * as mobx from 'mobx';
import ajax from 'common/utils/ajax';
import Base from 'store/model/base';
const { observable, action, runInAction, computed } = mobx;

// 默认从页面里获取
const { nick, subNick, isSubAccount, avatar, level } = CFG.user;

/**
 * 当前用户
 */
export default class User extends Base {
  @observable avatar = avatar; // 用户头像
  @observable nick = nick;
  @observable subNick = subNick;
  @observable isSubAccount = isSubAccount || false;
  @observable level = level || '未知';
  @observable state = 'done'; // done, pending

  @computed get nickName() {
    return this.isSubAccount ? `${this.nick}:${this.subNick}` : this.nick;
  }

  // 暂时不用异步获取用户
  /*@action async getCurrentUser() {
    this.state = 'pending';
    try {
      const data = await ajax.req('user.getCurrentUser');
      runInAction(() => {
        this.state = 'done';
        this.avatar = data.avatar;
        this.nick = data.nick;
        this.subNick = data.subNick;
        this.isSubAccount = data.isSubAccount;
        this.level = data.level;
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }*/



}

