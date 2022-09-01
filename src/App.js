import { Route, Routes, useNavigate } from "react-router-dom";
// Component
import Home from "./pages/home";
import Result from "./pages/result";
import Button from "./component/button/button";
import Rank from "./component/Rank/rank";

// Css
import classes from "./component/button/button.module.css";
import "./App.css";

function App() {
  const navigate = useNavigate();
  /* Best Rank  */
  const rank = localStorage.getItem("rank");

  /* Start Quiz Fun  */
  const handelStart = () => navigate(`/home`);
  return (
    <div className="App">
      <header className="App-header">
        {/* Best Rnk Component  */}
        {rank && <Rank word={rank} />}
        <Routes>
          {/* Buttom Start Quiz  */}
          <Route
            path={"/"}
            exact
            element={
              <Button
                style={classes.btnStart}
                action={handelStart}
                lable="Start"
              />
            }
          />

          {/*  Quiz Route */}
          <Route path={"/home"} element={<Home start={1} />} />

          {/* Score Route */}
          <Route path={"/result:id"} element={<Result />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
