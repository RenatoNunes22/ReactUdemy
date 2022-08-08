import "./style.css";
export const Button = (props) => (
  <button disabled={props.disabled} className="button" onClick={props.onclick}>
    {props.text}
  </button>
);
