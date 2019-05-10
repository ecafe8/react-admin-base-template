import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Exception from 'components/exception';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // 从error中接收错误并设置 state
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Exception type="501" style={{ minHeight: 500, height: '80%' }} />;
    }

    return this.props.children;
  }
}
