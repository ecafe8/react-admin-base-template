import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import PageLayout from 'layout/pageLayout';
import Model from './model';
import { Table, Card } from 'antd';
import css from './index.less';

@observer
export default class ItemListPage extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.model = new Model();
  }

  componentDidMount() {
    this.model.getList();
  }

  renderTable() {
    const { model, model: { listData, total, loading, pageNo, pageSize } } = this;
    const columns = [
      {
        title: '图片',
        key: 'id',
        width: 120,
        render: item => {
          return (
            <div className={css.thumb}>
              <img src={item.pic} alt={item.title} />
            </div>
          );
        }
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '一口价',
        dataIndex: 'price',
      },
      {
        title: '优惠价',
        dataIndex: 'promotionPrice',
      }
    ];

    const props = {
      loading,
      columns,
      rowKey: record => record.id,
      dataSource: listData,
      locale: {
        emptyText: '暂无查询结果，请更改查询条件后重新查询，或新建一条数据。'
      },
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        currentPage: pageNo,
        pageSize: pageSize,
        total,
        onChange: (val) => {
          model.update({
            pageNo: val,
          });
        },
        onShowSizeChange: (val, size) => {
          model.update({
            pageSize: size,
          });
        }
      },
    };

    return (
      <Table {...props}/>
    );

  }

  render() {
    return (
      <PageLayout>
        <Card title="列表">
          {this.renderTable()}
        </Card>
      </PageLayout>
    );
  }
}
