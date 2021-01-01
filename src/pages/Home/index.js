import React, { Component } from 'react';

import { FaPlus, FaGithub, FaTrash, FaSpinner } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { Form, FormButton, List, Input, ErrorLabel } from './styles';
import api from '../../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      newRepository: '',
      repositories: [],
      errorLog: '',
      hasError: false,
      loading: false,
    };
  }

  componentDidMount() {
    const localRepositories = localStorage.getItem('repositories');

    if (localRepositories) {
      this.setState({ repositories: JSON.parse(localRepositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepository: e.target.value });
  };

  handleRequestRepository = async (e) => {
    e.preventDefault();

    try {
      const { newRepository, repositories } = this.state;

      this.setState({ loading: true });

      const response = await api.get(`/repos/${newRepository}`);

      const repoData = {
        name: response.data.full_name,
        avatar_url: response.data.owner.avatar_url,
      };

      const duplicate = await repositories.find(
        (repository) => repository.name === repoData.name
      );

      if (duplicate) {
        throw new Error('Duplicate repository');
      }

      this.setState({
        repositories: [...repositories, repoData],
        newRepository: '',
        hasError: false,
        errorLog: '',
        loading: false,
      });
    } catch (err) {
      if (err.message === 'Request failed with status code 404') {
        this.setState({
          errorLog: 'Repository not found',
        });
      } else {
        this.setState({ errorLog: err.message });
      }

      this.setState({ loading: false, hasError: true });
    }
  };

  handleDeleteRepository = (name) => {
    const { repositories } = this.state;

    const filteredRepositories = repositories.filter(
      (repository) => repository.name !== name
    );

    this.setState({ repositories: filteredRepositories });
  };

  render() {
    const {
      newRepository,
      repositories,
      errorLog,
      hasError,
      loading,
    } = this.state;

    // console.log(repositories);

    return (
      <Container>
        <h1>
          <FaGithub size={64} color="#0D1117" />
        </h1>
        <Form onSubmit={this.handleRequestRepository}>
          <Input
            type="text"
            value={newRepository}
            placeholder="Add a repository"
            onChange={this.handleInputChange}
            error={hasError}
          />
          <FormButton type="submit" loading={loading}>
            {loading ? (
              <FaSpinner size={20} color="#f0f6fc" />
            ) : (
              <FaPlus size={20} color="#f0f6fc" />
            )}
          </FormButton>
        </Form>

        <ErrorLabel>{errorLog}</ErrorLabel>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <img src={repository.avatar_url} alt={repository.name} />
                {repository.name}
              </Link>

              <FaTrash
                size={10}
                onClick={() => this.handleDeleteRepository(repository.name)}
              />
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
