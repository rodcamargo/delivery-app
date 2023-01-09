import { BrowserRouter, createMemoryHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
// https://stackoverflow.com/questions/70313688/how-i-could-test-location-with-memoryrouter-on-react-router-dom-v6
const renderWithRouter = (component) => {
  const router = createMemoryHistory();
  return ({
    ...render(<BrowserRouter>{component}</BrowserRouter>),
    router,
  });
};

export default renderWithRouter;
