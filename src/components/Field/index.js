import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange }) => {
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
      {type === FIELD_TYPES.INPUT_TEXT ? (
        <input type="text" {...inputProps} />
      ) : (
        <textarea {...inputProps} />
      )}
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
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  value: "",
  onChange: () => null,
};

export default Field;