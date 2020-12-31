import React, { Component } from 'react';

import { FaPlus, FaGithub } from 'react-icons/fa';

import { Container, Form, FormButton, List } from './styles';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      newRepository: 'facebook/react',
    };
  }

  render() {
    const { newRepository } = this.state;

    return (
      <Container>
        <h1>
          <FaGithub size={64} color="#0D1117" />
          REPOSITÓRIOS FAVORITOS
        </h1>
        <Form>
          <input placeholder="Adicione um repositório" />
          <FormButton type="button">
            <FaPlus size={20} color="#f0f6fc" />
          </FormButton>
        </Form>
        <List>
          <li>
            <h2>{newRepository}</h2>
            <a href="/">Visualizar</a>
          </li>
          <li>
            <h2>{newRepository}</h2>
            <a href="/">Visualizar</a>
          </li>
        </List>
      </Container>
    );
  }
}
