import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewRun from './pages/NewRun';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import Client from './pages/Client';
import Donate from './pages/Donate';
import Success from './pages/Success';
import EmpoyeeProfile from './pages/EmpoyeeProfile';
import NewEmployee from './pages/NewEmployee';
import StartRun from './pages/StartRun';
import Header from './components/Header';
import Footer from './components/Footer';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/donate" 
                element={<Donate />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/admin" 
                element={<Admin />}
              />
              <Route 
                path="/employee" 
                element={<Employee />} 
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/client" 
                element={<Client />} 
              />
              <Route 
                path="/employee/:employeeId" 
                element={<EmpoyeeProfile />}
              />
              <Route 
                path="/run/:runId/:employeeId" 
                element={<NewRun />}
              />
              <Route 
                path="/employeerun/:runId" 
                element={<StartRun />}
              />
              <Route 
                path="/newemployee" 
                element={<NewEmployee />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
