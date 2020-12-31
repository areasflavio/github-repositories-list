import React, { Component } from 'react';

import { FaPlus, FaGithub, FaArrowRight, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { Form, FormButton, List } from './styles';
import api from '../../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      newRepository: '',
      repositories: [],
      errorLog: '',
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

      const response = await api.get(`/repos/${newRepository}`);

      const repoData = {
        name: response.data.full_name,
      };

      const duplicate = await repositories.find(
        (repository) => repository.name === repoData.name
      );

      if (duplicate) {
        throw new Error('Repositório duplicado');
      }

      this.setState({
        repositories: [...repositories, repoData],
        newRepository: '',
      });
    } catch (err) {
      if (err.message === 'Request failed with status code 404') {
        this.setState({ errorLog: 'Repositório não encontrado' });
      } else {
        this.setState({ errorLog: err.message });
      }
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
    const { newRepository, repositories, errorLog } = this.state;

    return (
      <Container>
        <h1>
          <FaGithub size={64} color="#0D1117" />
          REPOSITÓRIOS FAVORITOS
        </h1>
        <Form onSubmit={this.handleRequestRepository}>
          <input
            type="text"
            value={newRepository}
            placeholder="Adicione um repositório"
            onChange={this.handleInputChange}
          />
          <FormButton type="submit">
            <FaPlus size={20} color="#f0f6fc" />
          </FormButton>
        </Form>

        <small>{errorLog}</small>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <h2>{repository.name}</h2>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  <FaArrowRight size={16} color="#0D1117" />
                </Link>
                <FaTrash
                  size={16}
                  color="#999"
                  onClick={() => this.handleDeleteRepository(repository.name)}
                />
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
