import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from 'react';
import './App.css';
import Home from './pages/home';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} >
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
