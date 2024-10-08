import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EventCard from '../../components/EventCard';
import { useData } from "../../contexts/DataContext";

const FooterEventCard = () => {
    const { data, error } = useData();
    const [sortedEvents, setSortedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data && data.events) {
            const sorted = [...data.events].sort((a, b) => new Date(b.date) - new Date(a.date));
            setSortedEvents(sorted);
            setIsLoading(false);
        } else if (error) {
            setIsLoading(false);
        }
    }, [data, error]);

    if (isLoading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return <p>Une erreur s&aposest produite : {error.message}</p>;
    }

    const lastEvent = sortedEvents[0];

    if (!lastEvent) {
        return <p>Aucun événement disponible.</p>;
    }


    return (
        <div className="col presta" >
            <h3>Notre dernière prestation</h3>
            <EventCard
                imageSrc={lastEvent.cover}
                title={lastEvent.title}
                date={new Date(lastEvent.date)}
                small
                label={lastEvent.type}
                data-testid="small-event-card"
            />
        </div>
    );
};

FooterEventCard.propTypes = {
    event: PropTypes.shape({
        cover: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        type: PropTypes.string
    })
};

FooterEventCard.defaultProps = {
    event: null
};

export default FooterEventCard;
