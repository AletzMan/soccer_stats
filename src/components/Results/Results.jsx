import { MatchLive } from '../MatchLive/MatchLive';
import './Results.css';

function Results({ results }) {
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.getDate() < 9? '0' + (today.getDate() + 1):today.getDate() + 1;
    let month = today.getMonth() < 9? '0' + (today.getMonth() + 1):today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
    const DATE = new Date(dateToday).toLocaleDateString('es-MX', optionsDate);
    let dateFull = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    
    return (
        <div className='results'>
            <h1 className='results__title'>{dateFull}</h1>
            {results && results.map(({ ['event-metadata']: id, ['event-metadata']: sportEvent, officials, team, 'event-actions': eventActions }) => (
                <MatchLive key={id['event-key']} sportEvent={sportEvent} officials={officials} team={team} eventActions={eventActions} />
            ))}
            {results.length === 0  &&  <p>Hoy no hay partidos</p>}
        </div>
    )
}

export { Results };

