import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

// Constants
// données de test pour le formulaire
const TEST_USER = {
  nom: "Baptiste",
  prenom: "Jean",
  email: "Jean.Baptiste@724events.com",
  message: "Test"
};

const FORM_FIELDS = ["Email", "Nom", "Prénom", "Personel / Entreprise", "Message"];

// Helper functions
// Remplissage fictif du formulaire :
const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText("Votre nom"), { target: { value: TEST_USER.nom } });
  fireEvent.change(screen.getByPlaceholderText("Votre prénom"), { target: { value: TEST_USER.prenom } });
  fireEvent.change(screen.getByPlaceholderText("Votre email"), { target: { value: TEST_USER.email } });
  fireEvent.change(screen.getByPlaceholderText("Votre message"), { target: { value: TEST_USER.message } });
};

const submitForm = async () => {
  // simulation du "clic" sur le bouton envoyer
  fireEvent.click(screen.getByTestId("button-test-id"));
};

// Tests
describe("Form Component", () => {
  it("displays all required fields", () => {
    // vérifie que les champs sont bien créés
    render(<Form />);
    FORM_FIELDS.forEach(field => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
  });

  describe("Form submission", () => {
    let onSuccess;

    beforeEach(() => {
      // regroupe les opérations répétitives
      onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fillForm();
    });

    it("calls onSuccess after submission", async () => {
      // vérifie que la fonction onSuccess est bien exécutée
      await submitForm();
      await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    });

    it("shows 'En cours' during submission and 'Envoyer' after", async () => {
      // Vérifie le changement sur le bouton "envoyer" au fil de l'exécution de "onSuccess" (ajout du retour à "envoyer")
      await submitForm();
      expect(await screen.findByText("En cours")).toBeInTheDocument();
      expect(await screen.findByText("Envoyer")).toBeInTheDocument();
    });

    it("clears form fields after submission", async () => {
      // vérifie que les champs soient correctement vidés après l'envoi du formulaire (test ajouté)
      await submitForm();
      await waitFor(() => {
        expect(screen.getByPlaceholderText("Votre nom")).toHaveValue('');
        expect(screen.getByPlaceholderText("Votre prénom")).toHaveValue('');
        expect(screen.getByPlaceholderText("Votre email")).toHaveValue('');
        expect(screen.getByPlaceholderText("Votre message")).toHaveValue('');
      });
    });
  });
});