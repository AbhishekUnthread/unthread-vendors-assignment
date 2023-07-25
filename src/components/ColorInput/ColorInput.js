import "./ColorInput.scss";

const ColorInput = () => {
  return (
    <div className="container">
      <input type="color" className="picker" />
      <p className="text-lightBlue text">red</p>
    </div>
  );
};

export default ColorInput;
