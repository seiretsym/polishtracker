import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/globalState";
import Main from "./pages/main";
import Brand from "./components/Brand";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <Brand />
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </StoreProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
