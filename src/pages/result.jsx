import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import useFetch from "../hooks/useFitch.tsx";

// Component
import Button from "../component/button/button";

// csss
import "../App.css";
import classes from "../component/button/button.module.css";

const Result = () => {
  const params = useParams().id.split(":")[1];

  const navigate = useNavigate();
  const [rank, setRank] = useState();
  const { FetchReqest } = useFetch();

  /* Try Again Fun  */
  const handelTryAgain = () => navigate(`/home`, { replace: true });

  /* Congrate Fun  */
  const handelCongrat = () => navigate(`/`, { replace: true });

  /*Custom Hook For Fetch Data*/
  const fitchContainer = () => {
    const dataHandeler = (value) => {
      if (value < localStorage.getItem("rank")) {
        localStorage.removeItem("rank");
        localStorage.setItem("rank", value);
      }
      setRank(value);
    };
    FetchReqest(
      {
        url: "http://localhost:5000/result",
        method: "POSt",
        body: { score: params },
      },
      dataHandeler
    );
  };

  /* Control of re-Fetch */
  useEffect(() => {
    fitchContainer();
  }, [FetchReqest]);

  return (
    <Fragment>
      {rank ? <div className="poster">Your Rank is {rank} %</div>:"waiting..."}

      {params !== "100" ? (
        <Button
          style={classes.btnAgain}
          action={handelTryAgain}
          lable="Try Again"
        />
      ) : (
        <>
          <div className="congratMassage">Congratulation</div>
          <Button
            style={classes.btnAgain}
            action={handelCongrat}
            lable="Home"
          />
        </>
      )}
    </Fragment>
  );
};

export default Result;
