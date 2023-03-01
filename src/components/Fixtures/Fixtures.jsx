import './Fixtures.css'
import dataMatches from '../../services/dataMatches.json';
function Fixtures() {
    let MATCHES_OF_THE_DAY = dataMatches['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['event-metadata-soccer'].week === "10")
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const DATE = new Date(MATCHES_OF_THE_DAY[0]['event-metadata']['start-date-time']).toLocaleDateString('es-MX', options);
    const DATE_FULL = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    console.log(MATCHES_OF_THE_DAY)
    return(
        <div className='fixtures'>

        </div>
    )
}

export { Fixtures };