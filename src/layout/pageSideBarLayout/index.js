import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import PageLayout from 'layout/pageLayout';
import SideBarMenu from './components/sideBarMenu';
import { Layout } from 'antd';

const { Content, Sider } = Layout;


@observer
export default class PageSideBarLayout extends React.Component {

  static propTypes = {
    // https://pro.ant.design/components/PageHeader-cn/
    headerOptions: PropTypes.any, // 透传给 PageLayout

    // https://ant.design/components/layout-cn/#Layout.Sider
    sideBarOptions: PropTypes.shape({
      width: PropTypes.number,
      children: PropTypes.any,
    }),

    sideBarPosition: PropTypes.oneOf(['left', 'right']),
  };

  static defaultProps = {
    sideBarOptions: {
      width: 200,
      children: <SideBarMenu />,
    },
    sideBarPosition: 'left',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  renderSideBar() {
    const { sideBarOptions } = this.props;

    const props = {
      key: 'sideBar',
      style: {
        background: '#fff'
      },
      ...sideBarOptions,
    };
    return (
      <Sider {...props} />
    );
  }

  renderContent() {
    const props = {
      key: 'content',
    };
    return (
      <Content {...props}>
        {this.props.children}
      </Content>
    );
  }

  render() {
    const { headerOptions, sideBarPosition } = this.props;

    const pageProps = {
      headerOptions
    };

    let pageContent = [
      this.renderSideBar(),
      this.renderContent(),
    ];

    if (sideBarPosition !== 'left') {
      pageContent.reverse();
    }

    return (
      <PageLayout {...pageProps}>
        <Layout style={ { background: '#fff' } }>
          {pageContent}
        </Layout>
      </PageLayout>
    );
  }
}
