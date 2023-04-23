import * as React from "react";
import { useState } from "react";
import { RepositoriesList } from "../../../ui/searchResult/RepositoriesList";
import SearchBar, { NewValue } from "../../../ui/SearchBar";
import { useGithubSearchQuery } from "../api/useGithubSearchQuery";

export const Searcher = () => {
  
  const [login, setLogin] = useState("");
  const { loading, data } = useGithubSearchQuery({ query: login });

  const loginEntered = (event: NewValue) => {
    if (event.value) {
      setLogin(event.value);
    }
  };

  return (
    <div>
      <SearchBar valueEntered={loginEntered} />
      {loading
        ? <>loading....</>
        : <RepositoriesList repos={data} />}
    </div>
  );
}