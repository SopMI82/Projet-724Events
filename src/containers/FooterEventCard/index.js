import React from 'react';
import PropTypes from 'prop-types';
import EventCard from '../../components/EventCard';

const FooterEventCard = ({ event, loading }) => {
    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (!event) {
        return <p>Aucun événement disponible.</p>;
    }

    return (
        <EventCard
            imageSrc={event.cover}
            title={event.title}
            date={new Date(event.date)}
            small
            label={event.type}
        />
    );
};

FooterEventCard.propTypes = {
    event: PropTypes.shape({
        cover: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        type: PropTypes.string
    }),
    loading: PropTypes.bool
};

FooterEventCard.defaultProps = {
    event: null,
    loading: false
};

export default FooterEventCard;