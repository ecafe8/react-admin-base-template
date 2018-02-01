import React from 'react';
import { observer } from 'mobx-react';
import css from './index.less';
import { Avatar } from 'antd';
import moment from 'moment';

const hello = () => {
  const hour = moment().hour();
  let s = '';
  if (hour > 6) {
    s = '早上';
  }
  if (hour > 12) {
    s = '中午';
  }
  if (hour > 14) {
    s = '下午';
  }
  if (hour > 18) {
    s = '晚上';
  }
  return s + '好';
};

@observer
export default class WelcomePage extends React.Component {

  get nickName() {
    const { nick, subNick, isSubAccount } = CFG.user;
    return isSubAccount ? `${nick}:${subNick}` : nick;
  }

  render() {
    const { nickName } = this;
    const { company, user: { avatar, level } } = CFG;
    return (
      <div className={css.pageHeaderContent}>
        <div className={css.avatar}>
          <Avatar size="large" src={avatar} />
        </div>
        <div className={css.content}>
          <div className={css.contentTitle}>{hello()}，{nickName}，祝你开心每一天！</div>
          <div>{company || '盛夏'} - {level}</div>
        </div>
      </div>
    );
  }
}
