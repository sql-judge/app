import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import "./App.sass";
import Problems from "./pages/Problems/Problems";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Problem from "./pages/Problem/Problem";
import SubmissionsTable from "./pages/Submissions/SubmissionsTable";
import Submission from "./pages/Submission/Submission";

const link = createHttpLink({ uri: "http://0.0.0.0:8080/query?" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="app-content">
            <Switch>
              <Route exact path="/problems" component={Problems} />
              <Route exact path="/problems/:id" component={Problem} />
              <Route exact path="/courses">
                courses
              </Route>
              <Route exact path="/submissions" component={SubmissionsTable} />
              <Route exact path="/submissions/:id" component={Submission} />
              <Redirect from="/" to="/problems" />
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
