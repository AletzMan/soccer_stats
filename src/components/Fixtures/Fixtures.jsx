import './Fixtures.css'
//import dataMatches from '../../services/dataMatches.json';
import { Match } from '../Match/Match';

function Fixtures({ calendar }) {
    let lastMatches = 0;
    let matches = [];
    let currentDay = 0;
    const SOURCE_MATCHES = parseInt(calendar[0]['event-metadata']['event-metadata-soccer'].week);
    console.log(SOURCE_MATCHES)
    console.log('jola')
    

    const FIND_MATCH = calendar.find((match, index) => {
        if (match['event-metadata']['event-metadata-soccer'].week === `${SOURCE_MATCHES}`) {
            lastMatches = index;
            currentDay = match['event-metadata']['event-metadata-soccer'].week;
            return match
        }        
    })
    const MATCHES_OF_THE_DAY = calendar.filter(match => match['event-metadata']['event-metadata-soccer'].week === `${currentDay}`)
    
    for (let index = 0; index < lastMatches; index++) {
        matches.push(parseInt(calendar[index]['event-metadata']['event-metadata-soccer'].week))        
    }

    return (
        <div className='fixtures'>
            {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }) => (
                <Match key={key['event-key']} team={team} eventData={eventData} />
            ))}
        </div>
    )
}

export { Fixtures };