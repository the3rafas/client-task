import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFitch.tsx";
// Component
import Quiz from "../component/quiz/Quix";
import Button from "../component/button/button";
// Css
import "../App.css";
import classes from "../component/button/button.module.css";

// Butoon Component Name
const dummtNames = ["noun", "adverb", "verb", "adjective"];

const Home = (props) => {
  const [data, setData] = useState([]);
  const [score, setScore] = useState([]);
  const [index, setIndex] = useState(0);
  const [closeEvent, setCloseEvent] = useState(true);
  const { FetchReqest    } = useFetch();
  const navigate = useNavigate();

  
  /*Custom Hook For Fetch Data*/
  const fitchContainer = () => {
    const dataHandeler = (exData) => {
      const dataList = [];
      exData.map((e) => {
        if (dataList.length === 11) {
          return;
        } else {
          dataList.push(e);
        }
      });
      setData(dataList);
    };

    FetchReqest({ url: "http://localhost:5000/" }, dataHandeler);
  };

  /* Control of re-Fetch */
  useEffect(() => {
    fitchContainer();
  }, [props.start]);

  /*  Delete Classes From Choosen Button */
  useEffect(() => {
    setTimeout(() => {
      let el = document.getElementsByClassName(classes.btnanswer);
      const arr = Object.entries(el);
      arr.map((e) => e[1].classList.remove(classes.wrong, classes.true));

      /* Prevent Button From doing Action */
      setCloseEvent(true);
    }, 0);
  }, [index]);
  /* Choose Fun */
  const increseAnswer = (e) => {
    /* Prevent Button From doing Action */
    setCloseEvent(false);
    /* Check Result  */
    if (index <= data.length) {
      const value = e.target.dataset.value;
      if (value === data[index].pos) {
        setScore((prev) => [...prev, index]);

        e.target.classList.add(classes.true);
      } else {
        e.target.classList.add(classes.wrong);
      }
    }

    /* Change Question */
    const questionQuqye = setTimeout(() => {
      if (index > data.length) {
        clearTimeout(questionQuqye);
      }
      setIndex((prev) => prev + 1);
    }, 1500);
  };

  /* Navigate To Result Page */
  if (index === 10) {
    if (index === 0) {
      return;
    } else {
      navigate(`/result:${(score.length / data.length) * 100}`);
    }
  }
  return (
    <Fragment>
      {/* Check if the Data Exist */}
      {data.length !== 0 ? (
        <>
          {data[index] && <Quiz word={data[index].word} />}
          <div className="d-flex">
            <div
              className="progresBar"
              style={{
                width: `${(index / data.length) * 100}%`,
              }}
            ></div>
            <div className="container">
              {dummtNames.map((e) => (
                <Button
                  key={e}
                  style={classes.btnanswer}
                  action={closeEvent && increseAnswer}
                  lable={e}
                  data={e}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Error in fetching data</div>
          <Button
            style={classes.btnAgain}
            action={fitchContainer}
            lable="Try Again"
          />
        </>
      )}
    </Fragment>
  );
};

export default Home;
