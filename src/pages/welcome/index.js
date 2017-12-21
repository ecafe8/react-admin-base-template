import React from 'react';
import { observer, inject } from 'mobx-react';
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
  if (hour > 18) {
    s = '晚上';
  }
  return s + '好';
};

@inject('store')
@observer
export default class WelcomePage extends React.Component {

  render() {
    const { nickName, avatar, level } = this.props.store.user;
    const { company } = CFG;
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
