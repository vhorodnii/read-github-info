import * as React from "react";
import { Repository, RepositoryItem } from "./RepositoryItem";
import { Box, Button, Grid, LinearProgress } from "@mui/material";

interface Repositories {
  repos: Array<Repository>;
  loading: boolean;
  showLoadingButton: boolean;
  loadMorePressed: () => void;
}

export const RepositoriesList = (data: Repositories) => {
  const { repos, showLoadingButton, loading, loadMorePressed } = data;

  return (
    <Grid container>
      {
        repos.map(repo => (
          <Grid item xs={12} md={6} xl={4}>
            <RepositoryItem repository={repo} key={repo.url} />
          </Grid>
        ))
      }
      {loading ?
        <Grid item xs={12}>
          <Box height={36.5} width={'100%'}>
            <LinearProgress />
          </Box>
        </Grid>
        : <></>
      }
      {showLoadingButton && !loading ?
        <Grid item xs={12}>
          <Box display="flex"
            justifyContent="center">
            <Button variant="contained" onClick={loadMorePressed} >Load more</Button>
          </Box>
        </Grid>
        : <></>
      }
    </Grid >
  );
};
