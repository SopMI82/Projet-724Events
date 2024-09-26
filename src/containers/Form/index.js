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
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      type: "",
      email: "",
      message: ""
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Ce champ est requis";
    if (!formData.prenom) newErrors.prenom = "Ce champ est requis";
    if (!formData.email) {
      newErrors.email = "Ce champ est requis";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Adresse email invalide";
      }
    }
    if (!formData.message) newErrors.message = "Ce champ est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (!validateForm()) return;

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
    [onSuccess, onError, formData]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder="Votre nom"
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={(e) => handleInputChange("nom", e.target.value)}
            error={errors.nom}
          />
          <Field
            placeholder="Votre prénom"
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={(e) => handleInputChange("prenom", e.target.value)}
            error={errors.prenom}
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
            placeholder="Votre email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Votre message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            error={errors.message}
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