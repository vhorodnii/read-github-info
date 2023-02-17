import * as React from "react";
import { useState } from "react";
import { RepositoriesList } from "../../../ui/RepositoriesList";
import SearchBar, { NewValue } from "../../../ui/SearchBar";
import { useGithubSearchQuery } from "../api/useGithubSearchQuery";

export const Searcher = () => {
  
  const [login, setLogin] = useState("");
  const { loading, data } = useGithubSearchQuery({ query: login });

  const seach = (event: NewValue) => {
    if (event.value) {
      setLogin(event.value);
    }
  };

  return (
    <div>
      <SearchBar valueEntered={seach} />
      {loading
        ? <>loading....</>
        : <RepositoriesList repos={data} />}
    </div>
  );
}