import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createIcon } from 'common/utils/menu';

@withRouter
export default class MenuLink extends PureComponent {

  static propTypes = {
    linkItem: PropTypes.shape({
      href: PropTypes.string,
      icon: PropTypes.string,
      target: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string,
    }),
    noLink: PropTypes.bool, // 禁用路由连接跳转，部分一级菜单做为主节点时使用。
  };

  static defaultProps = {};

  render() {
    const { linkItem, noLink } = this.props;

    if (!linkItem) {
      return null;
    }
    const icon = createIcon(linkItem);

    if (linkItem.href) {
      return (
        <a href={linkItem.href} target={linkItem.target || '_blank'}>
          {icon}<span>{linkItem.name}</span>
        </a>
      );
    }

    if (!linkItem.path || noLink) {
      return <span>{createIcon(linkItem)}{linkItem.name}</span>;
    }

    const _linkPath = linkItem.path;

    return (
      <Link
        to={_linkPath}
        target={linkItem.target}
        replace={_linkPath === this.props.location.pathname} // 点击链接后将使用新地址替换掉访问历史记录里面的原地址
      >
        {icon}<span>{linkItem.name}</span>
      </Link>
    );
  }
}
