import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import PageLayout from 'layout/pageLayout';
import Head from './components/head';

@observer
export default class Welcome extends React.Component {

  static propTypes = {
    model: PropTypes.object,
  };

  static defaultProps = {};

  render() {
    const props = {
      headerOptions: {
        children: <Head />,
        title: false,
      }
    };
    return (
      <PageLayout {...props}>
        欢迎页面
      </PageLayout>
    );
  }
}
