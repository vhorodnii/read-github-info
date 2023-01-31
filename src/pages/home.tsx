import * as React from "react";
import { Searcher } from "../components/RepositoriesSearcher";

export default function Home() {

  return <div className="App">
    <header className="App-header">
      <Searcher />
    </header>
  </div>
}