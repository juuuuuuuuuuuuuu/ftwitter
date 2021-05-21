import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user && setIsLoggedIn(user);
      setInit(true);
    })
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : <div>loading...</div>}
    </>
  );
}

export default App;
