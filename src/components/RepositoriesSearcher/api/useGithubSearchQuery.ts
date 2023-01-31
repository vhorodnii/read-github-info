import { gql, useQuery } from '@apollo/client';

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
      node: {
        name: string;
        stargazers: {
          totalCount: number;
        };
      }
    }>;
  };
}

interface useGithubSearchQueryResult {
  data: SearchResult | null;
  loading: boolean;
}

interface Props {
  query: string;
}

export const useGithubSearchQuery = ({ query }: Props): useGithubSearchQueryResult => {

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { query: query }
  });

  return { data, loading };
}


