import * as React from "react";

export interface Repository {
  name: string;
  stargazers: {
    totalCount: number;
  };
}

export const RepositoryItem = ({ repository }: { repository: Repository }): JSX.Element => {
  return (
    <li key={repository.name}>
      {repository.name} - {repository.stargazers.totalCount} stars
    </li>
  );
}