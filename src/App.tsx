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
        authorization: `Bearer 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`,
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
