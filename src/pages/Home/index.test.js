import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      // Remplir les champs requis pour ne pas être bloqué par la fonction validateForm
      fireEvent.change(screen.getByPlaceholderText("Votre nom"), { target: { value: "Baptiste" } });
      fireEvent.change(screen.getByPlaceholderText("Votre prénom"), { target: { value: "Jean" } });
      fireEvent.change(screen.getByPlaceholderText("Votre email"), { target: { value: "Jean.Baptiste@724events.com" } });
      fireEvent.change(screen.getByPlaceholderText("Votre message"), { target: { value: "Test" } });

      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
