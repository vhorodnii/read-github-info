import * as React from "react";
import { gql, useQuery } from '@apollo/client';

export interface User {
  login: string;
  repositories: Repository[];
}

export interface Repository {

}

export default function UserForm(props: User) {

  const GET_USER = gql`
    query {
      user(login:"${props.login}"){
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

  const { loading, error, data } = useQuery(GET_USER);


  return <div>
    <span>Login:</span><span>{props.login}</span>
    <br />

  </div>
}