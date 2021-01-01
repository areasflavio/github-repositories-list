import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaSpinner,
  FaStar,
  FaEye,
} from 'react-icons/fa';
import { CgGitFork, CgFileDocument } from 'react-icons/cg';

import Container from '../../components/Container';
import api from '../../services/api';

import {
  Loading,
  IssuesList,
  InfoHeader,
  ButtonGroup,
  Button,
  IssueInfo,
  LabelsDiv,
  Label,
} from './styles';

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
    await this.setState({ stateParam: e.target.innerHTML, currentPage: 1 });

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
    const { issues, repository, loading, currentPage, stateParam } = this.state;

    if (loading) {
      return (
        <>
          <Loading>
            <FaSpinner size={64} color="#f0f6fc" />
            <h1>Loading...</h1>
          </Loading>
        </>
      );
    }

    return (
      <Container>
        <Link to="/">
          <FaArrowLeft color="#0d1117" size={16} />
        </Link>

        <InfoHeader>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />

          <a href={repository.html_url} target="__blank" rel="noreferrer">
            {repository.full_name}
          </a>

          <p>{repository.description}</p>

          <div>
            <span>
              <FaEye size={20} />
              {repository.subscribers_count} Watch
            </span>
            <span>
              <CgGitFork size={24} />
              {repository.forks} Fork
            </span>
            <span>
              <FaStar size={20} />
              {repository.watchers} Star
            </span>
            <span>
              <CgFileDocument size={20} />
              {repository.license.name}
            </span>
          </div>
        </InfoHeader>

        <ButtonGroup>
          <Button
            type="button"
            onClick={this.handleStateFilter}
            active={stateParam === 'all'}
          >
            all issues
          </Button>
          <Button
            type="button"
            onClick={this.handleStateFilter}
            active={stateParam === 'open'}
          >
            open
          </Button>
          <Button
            type="button"
            onClick={this.handleStateFilter}
            active={stateParam === 'closed'}
          >
            closed
          </Button>
        </ButtonGroup>

        <IssuesList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <IssueInfo>
                <header>
                  <strong>{issue.title}</strong>
                  <small>{issue.user.login}</small>
                </header>
                <LabelsDiv>
                  {issue.labels.map((label) => (
                    <Label
                      key={String(label.id)}
                      style={{ background: `#${label.color}` }}
                    >
                      {label.name}
                    </Label>
                  ))}
                </LabelsDiv>
              </IssueInfo>
              <a href={issue.url} target="__blank" rel="noreferrer">
                <FaExternalLinkAlt size={16} />
              </a>
            </li>
          ))}
        </IssuesList>

        <ButtonGroup>
          <Button
            type="button"
            onClick={this.handlePageNavigate}
            active={currentPage !== 1}
            disable={currentPage === 1}
          >
            Previous page
          </Button>
          <div>
            <h2>{currentPage}</h2>
          </div>
          <Button type="button" onClick={this.handlePageNavigate} active>
            Next page
          </Button>
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
