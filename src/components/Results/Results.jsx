import { MatchLive } from '../MatchLive/MatchLive';
import './Results.css';

function Results({ results }) {
    console.log(results)
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const DATE = new Date(results[results.length - 1]['event-metadata']['start-date-time']).toLocaleDateString('es-MX', optionsDate);
    const DATE_FULL = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    return (
        <div className='results'>
            <h1 className='results__title'>{DATE_FULL}</h1>
            {results.map(({ ['event-metadata']:id,  ['event-metadata']:sportEvent, officials, team, 'event-actions':eventActions }) => (
                <MatchLive key={id['event-key']} sportEvent={sportEvent} officials={officials} team={team} eventActions={eventActions}/>
            ))}
        </div>
    )
}

export { Results };

