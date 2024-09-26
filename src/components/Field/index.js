import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: "text",
  TEXTAREA: "textarea",
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange, error }) => {
  const inputProps = {
    name,
    placeholder: error || placeholder,
    value,
    onChange,
    "data-testid": "field-testid",
    className: error ? "error" : ""
  };

  return (
    <div className="inputField">
      <span>{label}</span>
      <div className="input-container">
        {type === FIELD_TYPES.TEXTAREA ? (
          <textarea {...inputProps} />
        ) : (
          <input type="text" {...inputProps} />
        )}
      </div>
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  value: "",
  onChange: () => null,
  error: "",
};

export default Field;