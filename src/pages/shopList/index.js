import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import PageLayout from 'layout/pageLayout';

@observer
export default class ShopListPage extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <PageLayout>
        门店列表
      </PageLayout>
    );
  }
}
