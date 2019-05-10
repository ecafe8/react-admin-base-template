import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';

import SCREEN_QUERY from 'common/const/screenQuery';
import GlobalContext from 'global/globalContext';
import Footer from './components/footer';
import Header from './components/header';
import { PC_PURCHASE_URL, H5_PURCHASE_URL, RAX_PURCHASE_URL } from 'common/const/other';

const { Content } = Layout;

@withRouter
export default class SiteLayout extends PureComponent {

  constructor(props) {
    super(props);
  }

  getPageTitle = pathname => {
    // const { location } = this.props;
    // console.log('this.props', this.props);
    // const title = '盛夏无线工具';
    // todo 根据路由切换title文字
    return '盛夏管理后台';
  };

  globalContext() {
    const { location } = this.props;
    return {
      location,
    };
  }

  renderLayout() {
    const {
      children,
    } = this.props;

    return (
      <Layout>
        <Header />
        <Content>{children}</Content>
        <Footer
          links={[{
            title: '盛夏PC建站工具',
            href: PC_PURCHASE_URL,
          }, {
            title: '盛夏无线应用',
            href: H5_PURCHASE_URL,
          }, {
            title: '手淘定制服务',
            href: RAX_PURCHASE_URL,
          }, {
            title: '盛夏科技官方网站',
            href: '//www.sinxia.com',
          }]}
          copyright={
            <div>
              Copyright <Icon type="copyright" /> 2013 - {moment().year()} 盛夏科技 为您呈现
            </div>
          }
        />
      </Layout>
    );
  }

  render() {
    return (
      <Fragment>
        <DocumentTitle title={this.getPageTitle()}>
          <ContainerQuery query={SCREEN_QUERY}>
            {params => (
              <GlobalContext.Provider value={this.globalContext()}>
                <div className={classnames(params)}>{this.renderLayout()}</div>
              </GlobalContext.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </Fragment>
    );
  }

}
