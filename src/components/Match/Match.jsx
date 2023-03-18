import './Match.css'
import { getEventDetails } from '../../services/utilities';

function Match({ eventData }) {
    

    const details = getEventDetails(eventData);

    return (
        <div className='match'>
            {<div className='match__teams'>
                <img className='match__teams--home team__logo' src={details.logo.home} />
                <span className='match__teams--name' >{details.event}</span>
                <img className='match__teams--away team__logo' src={details.logo.away} />
                <span className='match__date'>{details.date}</span>
                <span className='match__hour'> {details.time} hrs</span>
                <span className='match__city'> {details.location.city} </span>
                <span className='match__site'>{`${details.location.stadium}`}</span>
            </div>}
        </div>
    )
}

export { Match };