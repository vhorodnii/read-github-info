// endpint -  https://api.github.com/graphql

import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
  query {
    user(login:"vhorodnii"){
        login
      name
      repositories(first:10){
        totalCount
        edges{
          node{
            name
            descriptionHTML
          }
        }
      }
      }
  }
`;

useQuery(GET_USER)