import React from 'react';
import { observer, inject } from 'mobx-react';
import PageLayout from 'components/layouts/pageLayout';
import { withRouter } from 'react-router-dom';
import css from './index.less';

@withRouter
@inject('store')
@observer
export default class ItemsEditPage extends React.Component {

  render() {
    const { match: { params: { itemId } } } = this.props;

    return (
      <PageLayout>
        {
          itemId ? 'edit' : 'insert'
        }
      </PageLayout>
    );
  }
}
