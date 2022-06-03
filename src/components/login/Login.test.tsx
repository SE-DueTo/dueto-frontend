import { render, screen } from '@testing-library/react'
import Login from './Login';


test('renders the correct content', () => {
    const { getAllByText } = render(<Login/>);

    expect(getAllByText('Login')).not.toBeNull();
});

test('init render, login button is enable', () =>{
    render(<Login/>);
    expect(screen.getByRole('button', {name: /login/i})).toBeEnabled();
});

