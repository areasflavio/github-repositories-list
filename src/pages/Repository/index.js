import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

import Container from '../../components/Container';
import api from '../../services/api';

import { Loading, IssuesList, InfoHeader, ButtonGroup } from './styles';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {
      repositoryName: '',
      repository: {},
      issues: [],
      loading: true,
      stateParam: 'all',
      currentPage: 1,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repositoryName = decodeURIComponent(match.params.repository);

    await this.setState({ repositoryName });

    this.apiRequest();
  }

  handleStateFilter = async (e) => {
    await this.setState({ stateParam: e.target.innerHTML });

    this.apiRequest();
  };

  handlePageNavigate = async (e) => {
    const { currentPage } = this.state;

    if (e.target.innerHTML === 'Previous page') {
      await this.setState({
        currentPage: currentPage > 1 ? currentPage - 1 : currentPage,
      });
    } else {
      await this.setState({ currentPage: currentPage + 1 });
    }

    this.apiRequest();
  };

  async apiRequest() {
    const { repositoryName, stateParam, currentPage } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`, {
        params: {
          state: stateParam,
          page: currentPage,
          per_page: 10,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { issues, repository, loading, currentPage } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    // console.log(issues);

    return (
      <Container>
        <Link to="/">
          <FaArrowLeft color="#0d1117" size={14} />
        </Link>

        <InfoHeader>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />

          <h1>{repository.full_name}</h1>
        </InfoHeader>

        <ButtonGroup>
          <button type="button" onClick={this.handleStateFilter}>
            all
          </button>
          <button type="button" onClick={this.handleStateFilter}>
            open
          </button>
          <button type="button" onClick={this.handleStateFilter}>
            closed
          </button>
        </ButtonGroup>

        <IssuesList>
          {issues.map((issue) => (
            <li key={issue.id}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>{issue.title}</strong>
                <small>{issue.user.login}</small>
              </div>
              <a href={issue.url} target="__blank" rel="noreferrer">
                Ver no Github
              </a>
            </li>
          ))}
        </IssuesList>

        <ButtonGroup>
          <button type="button" onClick={this.handlePageNavigate}>
            Previous page
          </button>
          <div>
            <h2>{currentPage}</h2>
          </div>
          <button type="button" onClick={this.handlePageNavigate}>
            Next page
          </button>
        </ButtonGroup>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
