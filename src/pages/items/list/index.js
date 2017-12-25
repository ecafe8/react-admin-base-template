import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import PageLayout from 'components/layouts/pageLayout';
import moment from 'moment';
import css from './index.less';
import { Table, Divider, Card } from 'antd';

@inject('store')
@observer
export default class ItemsListPage extends React.Component {
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.store.items.getItemsList();
  }

  renderTable() {
    const { selectedRowKeys } = this.state;
    const { listData, total, loading, pageNo, pageSize } = this.props.store.items;
    const columns = [
      {
        title: '商品图片',
        dataIndex: 'img',
        render: val => (
          <div className={css.img}>
            <img src={val} />
          </div>
        ),
      },
      {
        title: '商品标题',
        dataIndex: 'title',
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        render: val => <span>{val / 100} 元</span>,
      },
      {
        title: '更新时间',
        dataIndex: 'time',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (item) => (
          <div>
            <a href={`#/items/edit/${item.id}`}>修改</a>
            <Divider type="vertical" />
            <a href="">上架</a>
          </div>
        ),
      },
    ];

    const props = {
      loading,
      columns,
      rowKey: record => record.id,
      dataSource: listData,
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        currentPage: pageNo,
        pageSize: pageSize,
        total,
        onChange: (val) => {
          this.props.store.items.update({
            pageNo: val,
          });
        }
      }
    };

    return (
      <Table {...props}/>
    );
  }

  render() {
    return (
      <PageLayout>
        <Card bordered={false}>
          <div className={css.tableList}>
            {this.renderTable()}
          </div>
        </Card>
      </PageLayout>
    );
  }
}
