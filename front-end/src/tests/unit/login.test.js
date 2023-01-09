import renderWithRouter from './renderWithRouter';
import App from '../../App';

describe('TEST LOGIN', () => {
  describe('Testa rota', () => {
    it('Testa redirecionamento de rota "/" para "/login"', () => {
      const { router } = renderWithRouter(<App />);
      const {
        location: { pathname },
      } = router;
      expect(pathname).toBe('/login');
    });
  });

  describe('Testa inputs', () => { });
});
