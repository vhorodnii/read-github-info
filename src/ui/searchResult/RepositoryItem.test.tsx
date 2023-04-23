import { render, screen } from "@testing-library/react"
import * as React from "react";
import { RepositoryItem } from "./RepositoryItem"

describe('Repository item', () => {
  it('correctly shows data', () => {
    render(<RepositoryItem repository={{name: 'Repo name', stars: 12}} />);
    var component = screen.getByText(/repo name - 12 stars/i);
    expect(component).toBeInTheDocument();
  })
})