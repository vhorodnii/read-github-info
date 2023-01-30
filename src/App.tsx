import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from 'react';
import { createContext, useReducer } from 'react';
import './App.css';
import Home from './pages/home';

function App() {

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache()
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
