import { render, screen} from '@testing-library/react'
import Register from './Register';

test('renders the correct content', () => {
    const { getAllByText } = render(<Register/>);

    expect(getAllByText('Register')).not.toBeNull();
});

test('init render, Register button is enable', () =>{
    render(<Register/>);
    expect(screen.getByRole('button', {name: /Register/i})).toBeEnabled();
});

