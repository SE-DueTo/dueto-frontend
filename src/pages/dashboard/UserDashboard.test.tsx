import * as ReactDOM from 'react-dom';
import { render, screen} from '@testing-library/react'
import UserDashboard from './UserDashboard';

test('renders the correct content', () => {
  const root = document.createElement("div");
  ReactDOM.render(<UserDashboard></UserDashboard>, root);

  expect(root.querySelector('h5')?.textContent).toBe('Hallo ');
  expect(root.querySelector('h2')?.textContent).toBe('0.00€');
  expect(root.querySelector('Button')?.textContent).toBe('New Transaction');
});

test('init render, login button is enable', () =>{
    render(<UserDashboard/>);
    expect(screen.getByRole('button', {name: /new transaction/i})).toBeEnabled();
});
