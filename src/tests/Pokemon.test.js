import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(`${data[0].name}`);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(`${data[0].type}`);
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toBeInTheDocument();
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toHaveAttribute('src', `${data[0].image}`);
    expect(pokemonImage).toHaveAttribute('alt', `${data[0].name} sprite`);
  });

  test('Se o card do pokémon indicado contém um link de navegação para detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
  });

  test('Se ao clicar no link de navegação, é feito o redirecionamento detalhes', () => {
    renderWithRouter(<App />);
    const linkNav = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNav);
    const textDetails = screen.getAllByRole('heading', { name: 'Pikachu Details' });
    expect(textDetails).toBeDefined();
  });

  test('Se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const path = history.location.pathname;
    expect(path).toBe(`/pokemons/${data[0].id}`);
  });

  test('Se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const checkBox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkBox);
    expect(checkBox).toBeChecked();
    const icon = screen.getAllByRole('img');
    expect(icon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(icon[1]).toHaveAttribute('alt', `${data[0].name} is marked as favorite`);
  });
});
