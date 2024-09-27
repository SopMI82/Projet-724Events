import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";


describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      // Remplir les champs requis pour ne pas être bloqué par la fonction validateForm
      fireEvent.change(screen.getByPlaceholderText("Votre nom"), { target: { value: "Baptiste" } });
      fireEvent.change(screen.getByPlaceholderText("Votre prénom"), { target: { value: "Jean" } });
      fireEvent.change(screen.getByPlaceholderText("Votre email"), { target: { value: "Jean.Baptiste@724events.com" } });
      fireEvent.change(screen.getByPlaceholderText("Votre message"), { target: { value: "Test" } });
// simuler l'envoi du formulaire
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // afficher "en cours" pendant l'envoi du formulaire
      await screen.findByText("En cours");
      // afficher "envoyé" une fois le formulaire envoyé
      await screen.findByText("Envoyer");
      // vérifier que la fonction onSuccess a bien été appelée
      expect(onSuccess).toHaveBeenCalled();
      // Vérifier que tous les champs sont vides une fois le formulaire soumis
      expect(screen.getByPlaceholderText("Votre nom")).toHaveValue('');
      expect(screen.getByPlaceholderText("Votre prénom")).toHaveValue('');
      expect(screen.getByPlaceholderText("Votre email")).toHaveValue('');
      expect(screen.getByPlaceholderText("Votre message")).toHaveValue('');
    });
  });
});
