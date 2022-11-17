import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const details = screen.getByText(`${data[0].name} Details`);
    expect(details).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const h2Summary = screen.getAllByRole('heading', { name: /summary/i });
    expect(h2Summary).toBeDefined();
    const paragrafoDetalhes = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragrafoDetalhes).toBeDefined();
  });

  test('Existe na página uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const h2GameLocations = screen.getByRole('heading', {
      name:
        `Game Locations of ${data[0].name}`,
    });
    expect(h2GameLocations).toBeInTheDocument();
    const textLocation = screen.getByText(/Kanto Viridian Forest/i);
    const imgLocation = screen.getAllByRole('img');
    expect(textLocation).toBeDefined();
    expect(imgLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const textLocation2 = screen.getByText(/Kanto Power Plant/i);
    expect(textLocation2).toBeDefined();
    expect(imgLocation[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const altLocation = screen.getAllByAltText(`${data[0].name} location`);
    expect(altLocation).toBeDefined();
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const checkBox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkBox);
    expect(checkBox).toBeChecked();
    userEvent.click(checkBox);
    expect(checkBox).not.toBeChecked();
  });
});
