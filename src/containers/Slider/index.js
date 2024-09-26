import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // Récupération des données
  const [index, setIndex] = useState(0); // Initialisation du compteur
  const [byDateDesc, setByDateDesc] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("sliderData"); // Vérifie si les données sont déjà dans le local storage
    if (storedData) {
      setByDateDesc(JSON.parse(storedData));
    } else if (data?.focus) {
      const sortedData = data.focus.sort((evtA, evtB) => // Trie les données et les stocke dans le local storage
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
      );
      localStorage.setItem("sliderData", JSON.stringify(sortedData));
      setByDateDesc(sortedData);
    }
  }, [data]);

  useEffect(() => { // Change l'image toutes les 5 secondes
    const nextCard = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
    return () => clearTimeout(nextCard);
  }, [byDateDesc, index]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={event.id}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}-${event.title}`}
                  type="radio"
                  name="radio-button"
                  onClick={() => setIndex(radioIdx)}
                  defaultChecked={index === radioIdx} // l'ajout de default avant checked permet que le bouton se coche quand on le clique
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
