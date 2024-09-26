import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: "text",
  TEXTAREA: "textarea",
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange, error }) => {
  const inputProps = {
    name,
    placeholder,
    value,
    onChange,
    "data-testid": "field-testid"
  };

  return (
    <div className="inputField">
      <span>{label}</span>
      {type === FIELD_TYPES.TEXTAREA ? (
        <textarea {...inputProps} />
      ) : (
        <input type="text" {...inputProps} />
      )}
      {error && <p className="error-message">{error}</p>}
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