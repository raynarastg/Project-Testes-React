import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
  });
  test('aplicação é redirecionada para a página inicial, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const path = history.location.pathname;
    expect(path).toEqual('/');
  });
  test('é redirecionada para a página About, URL /about, ao clicar no link about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    const path = history.location.pathname;
    expect(path).toEqual('/about');
  });
  test('é redirecionada para Pokémons Favoritados, ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const path = history.location.pathname;
    expect(path).toEqual('/not-found');
  });
});
