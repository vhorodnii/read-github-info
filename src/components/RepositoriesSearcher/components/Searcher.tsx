import * as React from "react";
import { useState } from "react";
import { RepositoriesList } from "../../../ui/searchResult/RepositoriesList";
import SearchBar, { NewValue } from "../../../ui/SearchBar";
import { useRepositoriesSearchQuery } from "../api/useGithubSearchQuery";
import { Grid } from "@mui/material";

export const Searcher = () => {
  
  const [login, setLogin] = useState("");
  const { data, loading, hasMore, loadMore } = useRepositoriesSearchQuery({ query: login });

  const loginEntered = (event: NewValue) => {
    if (event.value) {
      setLogin(event.value);
    }
  };

  return (
    <Grid container>
      <SearchBar valueEntered={loginEntered} />
      <RepositoriesList repos={data} loading={loading} showLoadingButton={hasMore} loadMorePressed={loadMore} />
    </Grid>
  );
}