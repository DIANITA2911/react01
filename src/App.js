import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import BarraRutasPublic from "./ruteo/BarraRutasPublic";
import BarraRutasProtected from "./ruteo/BarraRutasProtected";
import { useAuth } from "./ruteo/AuthContext";
import "bootswatch/dist/quartz/bootstrap.min.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="">
      <Router>{user ? <BarraRutasProtected /> : <BarraRutasPublic />}</Router>
    </div>
  );
}

export default App;
