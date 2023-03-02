import './Fixtures.css'
//import dataMatches from '../../services/dataMatches.json';
import { Match } from '../Match/Match';

function Fixtures({calendar}) {
    console.log(calendar)
    const SOURCE_MATCHES = calendar;
    const MATCHES = [parseInt(SOURCE_MATCHES[0]['event-metadata']['event-metadata-soccer'].week), parseInt(SOURCE_MATCHES[1]['event-metadata']['event-metadata-soccer'].week)];
    const CURRENT_DAY = Math.max(...MATCHES);
    const MATCHES_OF_THE_DAY = calendar.filter(match => match['event-metadata']['event-metadata-soccer'].week === `${CURRENT_DAY}`)
   
    

    return (
        <div className='fixtures'>
            {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }) => (
                <Match key={key['event-key']} team={team} eventData={eventData} />
            ))}
        </div>
    )
}

export { Fixtures };