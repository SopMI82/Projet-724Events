import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { DataProvider, useData } from "../../contexts/DataContext";

jest.mock("../../contexts/DataContext", () => ({ // mockage des données pour le 2eme groupe de tests
  ...jest.requireActual("../../contexts/DataContext"),
  useData: jest.fn(),
}));

describe("When Form is created", () => {
  beforeEach(() => { // permet d'ignorer les données mockées pour cet ensemble de tests car cela créait un conflit
    useData.mockReturnValue({
      data: null,
      error: null,
    });
  });
  // cette fonctionalité est déjà testée dans le composant Form, pourquoi un deuxième test ?
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
      await screen.findByText("En cours"); // dejà testé dans form
      await screen.findByText("Message envoyé !"); // a tester ici car la modale est gérée par le composant Home
    });
  });

});

describe("When a page is created", () => {
  beforeEach(() => {
    useData.mockReturnValue({
      data: {
        events: [
          {
            cover: "/images/event1.png",
            title: "Event 1",
            date: "2023-10-01T00:00:00Z",
            type: "Conference",
          },
          {
            cover: "/images/event2.png",
            title: "Event 2",
            date: "2023-09-01T00:00:00Z",
            type: "Workshop",
          },
        ],
      },
      error: null,
    });
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
  });

  it("a list of events is displayed", () => {
    const eventList = screen.getByTestId(`event-list`);
    expect(eventList).toBeInTheDocument();
  })
  it("a list a people is displayed", () => {
    const peopleCard = screen.getAllByTestId(`people-card-testid`);
    expect(peopleCard.length).toBeGreaterThan(0);
  })
  it("a footer is displayed", () => {
    const footer = screen.getByTestId(`footer-testid`);
    expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    const dernierePrestation = await screen.findByTestId(`small-event-card`);
    expect(dernierePrestation).toBeInTheDocument();
  });
});
