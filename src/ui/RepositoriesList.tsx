import * as React from "react";
import { Repository, RepositoryItem } from "./RepositoryItem";

interface Repositories {
  repos: Array<Repository>;
}

export const RepositoriesList = (data: Repositories) => {

  return (
    <ul>
      {
        data.repos.map(repo => (
          <RepositoryItem repository={repo} />
        ))
      }
    </ul>
  );
};
