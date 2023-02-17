import { fireEvent, render, screen } from '@testing-library/react'
import * as React from "react"
import SearchBar, { NewValue } from "./SearchBar"


describe('search bar', () => {
  it('has label, input and button', () => {
    render(<SearchBar valueEntered={() => { }} />);

    var label = screen.getByText(/enter github login/i);
    expect(label).toBeInTheDocument();
    let input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  })

  it('raises event on button click and a new value is correct', () => {
    let event: NewValue = null;
    render(<SearchBar valueEntered={(e) => { event = e }} />);

    let input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    let button = screen.getByRole('button');
    fireEvent.click(button);

    expect(event).not.toBeNull();
    expect(event.value).toBe('new value');
  })

  it('raises event on Enter button', () => {
    let event: NewValue = null;
    render(<SearchBar valueEntered={(e) => { event = e }} />);

    let input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13});

    expect(event).not.toBeNull();
    expect(event.value).toBe('new value');
  })
})