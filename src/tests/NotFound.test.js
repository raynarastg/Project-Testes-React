import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa aplicção not found', () => {
  test('Se página contém h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const textH2 = screen.getByRole('heading', { level: 2 });
    expect(textH2).toHaveTextContent(/Page requested not found 😭/i);
  });

  test('Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
