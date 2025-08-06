import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return <>{!user ? <Auth setUser={setUser} /> : <Dashboard user={user} />}</>;
}

export default App;
