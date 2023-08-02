import "./ColorInput.scss";

const ColorInput = (props) => {
  const { inputProps } = props;
  return (
    <div className="container">
      <input {...inputProps} type="color" className="picker" />
      <p className="text-lightBlue text">{inputProps.value}</p>
    </div>
  );
};

export default ColorInput;
