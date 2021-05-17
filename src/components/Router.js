import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
            <Route exact path="/">
              <Home user={isLoggedIn} />
            </Route>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        <Route exact path="/profile">
          <Profile user={isLoggedIn} />
        </Route>
      </Switch>
    </Router>
  );
}
export default AppRouter;
