import './Match.css'
import { getEventDetails } from '../../services/utilities';

function Match({ eventData }) {
    /*
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const DATE = new Date(eventData['start-date-time']).toLocaleDateString('es-MX', optionsDate);
    const HOUR = new Date(eventData['start-date-time']).getHours();
    const MINUTES = new Date(eventData['start-date-time']).getMinutes() < 10 ? '0' + new Date(eventData['start-date-time']).getMinutes():new Date(eventData['start-date-time']).getMinutes();
    const TIME = HOUR + ':' + MINUTES;
    const DATE_FULL = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    */

    const details = getEventDetails(eventData);

    return (
        <div className='match'>
            {<div className='match__teams'>
                <img className='match__teams--home team__logo' src={details.logo.home} />
                <span className='match__teams--name' >{details.event}</span>
                <img className='match__teams--away team__logo' src={details.logo.away} />
                <span className='match__date'>{details.date}</span>
                <span className='match__hour'> {details.time}  </span>
                <span className='match__city'> {details.location.city} </span>
                <span className='match__site'>{`${details.location.stadium}`}</span>
            </div>}
        </div>
    )
}

export { Match };