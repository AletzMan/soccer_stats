import { getEventDetails } from '../../services/utilities';
import './MatchHeader.css';

function MatchHeader({eventData }) {
    
    const details = getEventDetails(eventData);

    const eventStatus = details.status === 'Finalizado'?true:false;
    const eventStatusLive = details.status === 'En juego'?true:false;
    return (
        <div className=' matchheader'>
            <div className='matchheader__container'>
                <img className='matchheader__image--home matchheader__image' src={details.logo.home} />
                <span className='matchheader__name--home matchheader__name' >{details.name.home.full}</span>
            </div>
            <span className='matchheader__vs'>VS</span>
            <div className='matchheader__container'>
                <span className='matchheader__name--away matchheader__name' >{details.name.away.full}</span>
                <img className='matchheader__image--away matchheader__image' src={details.logo.away} />
            </div>
            <div className={`matchheader__finished--${eventStatus} matchheader__live--${eventStatusLive}`}></div>
        </div>
    )
}

export { MatchHeader };