import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const SEARCH_REPOSITORIES = gql`
  query searchRepositories($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 9, after: $after) {
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
        cursor
      }
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

interface SearchResult {
  search: {
    edges: Array<{
      cursor: string;
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
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    }
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
  loadMore: () => void;
  hasMore: boolean;
}

interface Props {
  query: string;
}

export const useRepositoriesSearchQuery = ({ query }: Props): repositoriesSearchQueryResult => {

  if (!query.endsWith('/')) {
    query += '/';
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [repos, setRepos] = useState<repositoryData[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const { fetchMore } = useQuery<SearchResult>(SEARCH_REPOSITORIES, {
    variables: { query: query },
    onCompleted: (data) => {
      setLoading(false);
      setRepos(convertToRepositories(data));
      setHasNextPage(data.search.pageInfo.hasNextPage);
      setEndCursor(data.search.pageInfo.endCursor);
    },
    onError: () => {
      setLoading(false);
    }
  });

  const loadMore = () => {
    if (hasNextPage) {
      setLoading(true);
      fetchMore({
        variables: {
          query,
          after: endCursor
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;

          return {
            search: {
              ...prevResult.search,
              edges: [
                ...prevResult.search.edges,
                ...fetchMoreResult.search.edges,
              ],
              pageInfo: fetchMoreResult.search.pageInfo,
            },
          };
        },
      });
    }
  };

  const convertToRepositories = (data: SearchResult): repositoryData[] => {
    return data.search.edges
      .map(e => ({
        name: e.node.name,
        stars: e.node.stargazerCount,
        url: e.node.url,
        author: {
          login: e.node.owner.login,
          url: e.node.owner.url
        },
        description: e.node.description,
        mainLanguage: e.node.languages[0]?.edges.node.name ?? ''
      }));
  }

  return { data: repos, loading, loadMore, hasMore: hasNextPage };
};
