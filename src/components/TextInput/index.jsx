import "./style.css";
export const TextInput = (props) => {
  return (
    <input
      className="text-input"
      onChange={props.handleChange}
      value={props.searchValue}
      type="search"
      placeholder="Type your search"
    />
  );
};
