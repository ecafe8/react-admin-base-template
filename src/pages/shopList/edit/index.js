import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

@observer
export default class ShopEditPage extends React.Component {

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
      <div>
        门店 EditPage
      </div>
    );
  }
}
