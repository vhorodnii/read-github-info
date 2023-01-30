import * as React from "react";
import SearchBar, { LoginEntered } from "../forms/searchBar";
import UserForm from "../forms/userForm";

export default function Home() {

  const [login, setLogin] = React.useState("");
  const searchLogin = (request: LoginEntered) => {
    console.log(request.login)
    setLogin(request.login)
  }

  return <div className="App">
    <header className="App-header">
      <SearchBar loginEntered={searchLogin} />
      <UserForm login={login} repositories={[]} />
    </header>
  </div>
}