import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { Avatar, Divider, Card } from 'antd';
import moment from 'moment';
import css from './index.less';
import { H5_PURCHASE_URL, AVATAR, RAX_PURCHASE_URL, TEL_NO } from 'common/const/other';

const hello = () => {
  const hour = moment().hour();
  let s = '您';
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
export default class Head extends React.Component {

  static propTypes = {};

  static defaultProps = {};


  render() {
    const { nick } = CFG.user;
    return (
      <div className={css.pageHeaderContent}>
        <div className={css.avatar}>
          <Avatar size="large" src={AVATAR} />
        </div>
        <div className={css.content}>
          <div className={css.contentTitle}>{nick || '亲'}，{hello()}，欢迎使用盛夏管理后台！</div>
          <div className={css.contentText}>
            一些副标题文案
            <Divider type="vertical" className={css.divider}/>
            一些副标题文案
          </div>
        </div>
      </div>
    );
  }
}
