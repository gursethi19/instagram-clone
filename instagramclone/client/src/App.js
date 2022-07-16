import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { useEffect, useReducer, createContext, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";
import { BrowserRouter } from "react-router-dom";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" exact="true" element={<Home />} />
      <Route path="/login" exact="true" element={<Login />} />
      <Route path="/profile" exact="true" element={<Profile />} />
      <Route path="/signup" exact="true" element={<Signup />} />
      <Route path="/create" exact="true" element={<CreatePost />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
