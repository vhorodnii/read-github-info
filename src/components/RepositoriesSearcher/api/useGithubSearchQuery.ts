import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import { useEffect } from 'react';

const SEARCH_REPOSITORIES = gql`
  query searchRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

interface SearchResult {
  search: {
    edges: Array<{
      node: Repository;
    }>;
  };
}

interface Repository {
  name: string;
  stargazers: {
    totalCount: number;
  };
}

export const useGithubSearchQuery = ({ searchTerm }: { searchTerm: string }): SearchResult => {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer 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`,
      },
    }),
  });

  const [state, setState] = React.useState<SearchResult>({
    search: {
      edges: []
    }
  });

  const searchRepositories = async () => {
    const data = await client.query({
      query: SEARCH_REPOSITORIES,
      variables: { query: searchTerm },
    });
    setState(data.data);
  }

  useEffect(() => {
    searchRepositories();
  }, [searchTerm]);

  return state;
}


