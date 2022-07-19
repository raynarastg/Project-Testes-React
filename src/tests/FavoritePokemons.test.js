import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('é exibida na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const namePokemonFavorito = screen.getByTestId('pokemon-name');
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemons);
    expect(namePokemonFavorito).toBeDefined();
  });
});
