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

      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
