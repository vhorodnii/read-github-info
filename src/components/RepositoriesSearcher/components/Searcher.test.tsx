import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import * as React from 'react';
import { Searcher } from './Searcher';

describe('search component', () => {
  let search: RenderResult;
  beforeEach(() => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }),
    });

    search = render((
      <ApolloProvider client={client}>
        <Searcher />
      </ApolloProvider>
    ));

  })
  
  it('shows loading by default', () => {
    var list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();

    var loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  })

  it('has input to search', () => {
    var input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('can find gotnet repos', async () => {
    var input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'dotnet/'}});
    expect(input).toHaveValue('dotnet/');
    // var repos = await screen.findByRole('item');
    // expect(repos).toBeInTheDocument();    
  })
});
