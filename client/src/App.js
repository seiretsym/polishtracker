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
          </Switch>
        </StoreProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
