import * as React from "react";
import { useState } from "react";
import { RepositoriesList } from "../../../ui/RepositoriesList";
import SearchBar, { LoginEntered } from "../../../ui/SearchBar";
import { useGithubSearchQuery } from "../api/useGithubSearchQuery";

export const Searcher = () => {
  const [login, setLogin] = useState("");
  const repos = useGithubSearchQuery({ searchTerm: login });

  const seach = (event: LoginEntered) => {
    if(event.login){
      setLogin(event.login);
      
    }
  };

  return (
    <div>
      <SearchBar loginEntered={seach} />
      <RepositoriesList repos={repos.search.edges} />
    </div>
  );
}