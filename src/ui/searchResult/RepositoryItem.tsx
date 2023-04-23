import * as React from "react";

export interface Repository {
  name: string;
  stars: number;
}

export const RepositoryItem = ({ repository }: { repository: Repository }): JSX.Element => {
  return (
    <li key={repository.name}>
      {repository.name} - {repository.stars} stars
    </li>
  );
}