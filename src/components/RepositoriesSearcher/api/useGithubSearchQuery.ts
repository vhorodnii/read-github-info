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
  data: { name: string, stars: number }[];
  loading: boolean;
}

interface Props {
  query: string;
}

export const useGithubSearchQuery = ({ query }: Props): useGithubSearchQueryResult => {

  const { loading, data } = useQuery<SearchResult>(SEARCH_REPOSITORIES, {
    variables: { query: query }
  });
  let res : { name: string, stars: number }[] = [];
  if (!loading) {
    res = data.search.edges.map(e => ({ name: e.node.name, stars: e.node.stargazers.totalCount }))
  }
  return { data: res, loading };
}


