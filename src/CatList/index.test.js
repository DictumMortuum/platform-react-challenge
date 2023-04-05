import { render, screen } from '@testing-library/react';
import List from '.';
import mediaQuery from "css-mediaquery";
import { BrowserRouter } from 'react-router-dom';
import { json } from '../setupTests';

// using https://www.js-howto.com/test-responsive-design-using-jest-and-react-testing-library/
function createMatchMedia(width) {
  return (query) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

function resizeScreenSize(width) {
  window.matchMedia = createMatchMedia(width);
}

test('renders the list with dummy data', () => {
  const data = json;
  render(
    <BrowserRouter>
      <List data={data} />
    </BrowserRouter>
  );
  const images = screen.getAllByTestId("catimage");
  images.map(d => {
    expect(d).toBeVisible();
  });
  expect(images.length).toBe(2);
});

test('renders the list with duplicate data filtering', () => {
  const data = [...json, json[0]];
  render(
    <BrowserRouter>
      <List data={data} />
    </BrowserRouter>
  );
  const images = screen.getAllByTestId("catimage");
  images.map(d => {
    expect(d).toBeVisible();
  });
  expect(images.length).toBe(2);
});

test('renders correctly on mobile screens', () => {
  const data = json;
  resizeScreenSize(400);
  render(
    <BrowserRouter>
      <List data={data} />
    </BrowserRouter>
  );
  const images = screen.getAllByTestId("catimage");

  images.map(d => {
    expect(d).toBeVisible();
  });
  expect(images.length).toBe(2);
});
