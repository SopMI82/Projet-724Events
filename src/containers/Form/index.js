import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: ""
  });

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      type: "",
      email: "",
      message: ""
    });
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        resetForm();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={(e) => handleInputChange("nom", e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={(e) => handleInputChange("prenom", e.target.value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => handleInputChange("type", value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
            isFormSelect
          />
          <Field
            placeholder=""
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;