import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import classNames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import moment from 'moment';
import SideMenu from 'components/sideMenu';
import GlobalHeader from 'components/globalHeader';
import GlobalFooter from 'components/globalFooter';

const { Content } = Layout;
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

export default class MainLayout extends React.Component {
  static propsTypes = {
    children: PropTypes.object.isRequired,
  };

  renderLayout() {
    return (
      <Layout>
        <SideMenu location={this.props.location} />
        <Layout>
          <GlobalHeader />
          <Content style={{ height: '100%' }}>

            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
              {this.props.children}
            </div>

            <GlobalFooter
              links={[{
                title: '盛夏新零售后台',
                href: '#/welcome',
              }, {
                title: '盛夏科技官方网站',
                href: '//www.sinxia.com',
                blankTarget: true,
              }]}
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2013 - {moment().year()} 盛夏科技 为您呈现
                </div>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );
  }

  render() {
    return (
      <ContainerQuery query={query}>
        {params => <div className={classNames(params)}>{this.renderLayout()}</div>}
      </ContainerQuery>
    );
  }
}
