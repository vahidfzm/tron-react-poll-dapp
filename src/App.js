

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";


import Menu from './components/Menu';
import Home from './components/pages/Home';
import Poll from './components/pages/Poll';
import CreatePoll from './components/pages/CreatePoll';
import NotFound from './components/pages/NotFound';


function App() {
  return (
    <div>
      <BrowserRouter basename={'/tron-react-poll-dapp'}>

      <Menu />
      <Switch>
          <Route path="/create-poll">
            <CreatePoll />
          </Route>
          <Route path="/poll/:index" component={Poll} />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/" >
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
