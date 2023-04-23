import { render, screen } from "@testing-library/react"
import * as React from "react";
import { RepositoryItem } from "./RepositoryItem"

describe('Repository item', () => {
  it('correctly shows data', () => {
    render(<RepositoryItem repository={{ name: 'Repo name', stars: 12, url: 'url-here', author: { login: 'vh', url: 'vlad' }, description: 'descr', mainLanguage: 'C#' }} />);
    var component = screen.getByText(/repo name - 12/i);
    expect(component).toBeInTheDocument();
  })
})