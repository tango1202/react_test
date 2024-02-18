import { render, screen } from '@testing-library/react';
import MyDiv from '../MyDiv';

test('MyDiv 테스트', () => {
  render(<MyDiv />);
  const element = screen.getByText('안녕하세요');
  expect(element).toBeInTheDocument();
});
