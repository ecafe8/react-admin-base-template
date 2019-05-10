import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon as AntdIcon } from 'antd';
import './index.less';

class Icon extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    isAntd: PropTypes.bool,
  };

  static defaultProps = {
    isAntd: false,
  };

  render() {
    const { isAntd, ...props } = this.props;
    if (isAntd) {
      return <AntdIcon {...props}/>;
    }
    if (!props.type) {
      return <i {...props} />;
    }
    const svgProps = {
      ...props,
      className: classnames(['iconsvg', props.className])
    };
    return (
      <svg {...svgProps}>
        <use xlinkHref={ '#' + props.type } />
      </svg>
    );
  }
}

// 允许传入 'icon' as string or ReactNode
// 例如:
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />
export const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default Icon;
