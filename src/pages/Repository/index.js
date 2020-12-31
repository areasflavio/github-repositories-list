import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { match } = this.props;
    const { repository } = match.params;

    return <div>{repository}</div>;
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
