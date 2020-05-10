import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/scores" component={Scores} />
          </Switch>
        </StoreProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
