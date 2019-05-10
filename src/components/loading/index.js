import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { Spin } from 'antd';
import css from './index.less';

@observer
export default class Loading extends React.Component {

  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '页面加载中...'
  };

  render() {
    return (
      <div className={css.loading}>
        <Spin />
        <div>{this.props.text}</div>
      </div>
    );
  }
}
