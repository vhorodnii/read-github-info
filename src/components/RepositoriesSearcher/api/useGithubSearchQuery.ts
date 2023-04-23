import { gql, useQuery } from '@apollo/client';

const SEARCH_REPOSITORIES = gql`
  query searchRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
              url
            }
            url
            stargazerCount
            description
            languages (first: 1) {
              edges {
                node {
                  name
                }
              }
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
        stargazerCount: number;
        owner: {
          login: string;
          url: string;
        };
        url: string;
        description: string;
        languages: [{ edges: { node: { name: string; } } }];
      },
    }>;
  };
}

interface repositoryData {
  name: string,
  stars: number,
  url: string,
  author: {
    login: string,
    url: string
  },
  description: string;
  mainLanguage: string;
}

interface repositoriesSearchQueryResult {
  data: repositoryData[];
  loading: boolean;
}

interface Props {
  query: string;
}

export const useRepositoriesSearchQuery = ({ query }: Props): repositoriesSearchQueryResult => {

  if (!query.endsWith('/')) {
    query += '/';
  }

  const { loading, data } = useQuery<SearchResult>(SEARCH_REPOSITORIES, {
    variables: { query: query }
  });

  let res: repositoryData[] = [];
  if (!loading) {
    res = data.search.edges.map(e => ({
      name: e.node.name,
      stars: e.node.stargazerCount,
      url: e.node.url,
      author: {
        login: e.node.owner.login,
        url: e.node.owner.url
      },
      description: e.node.description,
      mainLanguage: e.node.languages[0]?.edges.node.name ?? ''
    }))
  }
  return { data: res, loading };
}


