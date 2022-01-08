import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import './App.css';
import SearchBar, { LoginEntered } from './forms/searchBar';
import UserForm from './forms/userForm';

function App() {
  const [login, setLogin] = React.useState("");

  const searchLogin = (request: LoginEntered) => {
    console.log(request.login)
    setLogin(request.login)
  };

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <SearchBar loginEntered={searchLogin} />
          <UserForm login={login} repositories={[]} />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
