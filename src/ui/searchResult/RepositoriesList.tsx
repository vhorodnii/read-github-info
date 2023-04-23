import * as React from "react";
import { Repository, RepositoryItem } from "./RepositoryItem";
import { Grid, List } from "@mui/material";

interface Repositories {
  repos: Array<Repository>;
}

export const RepositoriesList = (data: Repositories) => {

  return (
    <Grid
      container>
      {
        data.repos.map(repo => (
          <Grid item xs={12} md={6} xl={4}>
            <RepositoryItem repository={repo} key={repo.url} />
          </Grid>
        ))
      }
    </Grid>
  );
};
