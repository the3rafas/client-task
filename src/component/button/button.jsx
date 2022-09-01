const Button = (props) => {
  return (
    <button className={props.style} data-value={props.data?props.data :""} onClick={props.action? props.action:()=>{}}>
      {props.lable}{" "}
    </button>
  );
};

export default Button;
