import React from 'react';
import { Menu } from 'antd';
import Icon from 'components/icon';
import MenuLink from 'components/menuLink';

const { SubMenu, Item } = Menu;

/**
 * 创建图标
 * @param item
 * @returns {string|string|string|string|string|*}
 */
export const createIcon = (item) => {
  return item.icon && <Icon type={item.icon} isAntd={item.isAntdIcon || true} />;
};

/**
 * 创建子菜单 推荐直接使用该方法
 * @param menuData
 * @returns {Array}
 */
export const createSubMenu = (menuData) => {
  let _subMenu = [];
  menuData.filter(child => !child.hideInMenu).forEach((item, index) => {
    const _props = {
      key: item.path, // key 必须是path，用于选中状态
      title: <MenuLink linkItem={item} />,
      children: createMenuItem(item.children),
    };
    _subMenu.push(
      <SubMenu {..._props} />
    );
  });
  return _subMenu;
};

/**
 * @param menuData
 * @returns {Array}
 */
export const createMenuItem = (menuData) => {
  let _subMenu = [];
  if (!menuData) {
    return _subMenu;
  }
  menuData.filter(child => !child.hideInMenu).forEach((item, index) => {
    if (item.children && item.children.length) {
      _subMenu.push(createSubMenu(item.children));
    } else {
      const _props = {
        key: item.path, // key 必须是path，用于选中状态
        title: item.name,
        children: <MenuLink linkItem={item} />,
      };
      _subMenu.push(
        <Item {..._props} />
      );
    }
  });
  return _subMenu;
};
