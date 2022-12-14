import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const textH2 = screen.getByRole('heading', { level: 2 });
    expect(textH2).toHaveTextContent(/Encountered pokémons/i);
  });

  test('É exibido o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btnProximoPokemon = screen.getAllByRole('button');
    expect(btnProximoPokemon[8]).toHaveTextContent(/Próximo pokémon/i);
    const pokemonName = screen.getByText(data[0].name);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(btnProximoPokemon[8]);
    const nextNamePokemon = screen.getByText(data[1].name);
    expect(nextNamePokemon).toBeInTheDocument();
    if (data.length - 1) {
      userEvent.click(btnProximoPokemon[8]);
      expect(pokemonName).toBeInTheDocument();
    }
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const sete = 7;
    const buttonsFilters = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilters.length).toBe(sete);
  });

  test('Se o texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const array = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    array.forEach((el) => {
      const buttonTypeFilter = screen.getByRole('button', { name: el });
      expect(buttonTypeFilter).toBeVisible();
    });
  });

  test('Se o botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeVisible();
  });

  test('Com a seleção do botão, a Pokédex deve circular pelos pokémons de tipo', () => {
    renderWithRouter(<App />);
    const buttonElectri = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(buttonElectri);
    const typeElectric = screen.getByTestId('pokemon-type');
    expect(typeElectric).toBeInTheDocument();
  });

  test('Se ao clicar no botão all todos os pokemons são retornados', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(/pikachu/i);
  });
});
