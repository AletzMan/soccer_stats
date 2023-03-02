import { useState } from 'react';
import { Fixtures } from '../../components/Fixtures/Fixtures';
import { Header } from "../../components/Header/Header";
import { Positions } from "../../components/Positions/Positions";
import { Results } from '../../components/Results/Results';
//import dataMatches from '../../services/dataMatches.json';
//https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=2023-02-27
//https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&sort=start-date-time-asc&limit=80&startDate=2023-02-27T06%3A00%3A00.000Z

function StatsPage({calendar, results, positionsData}) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    //const SOURCE_MATCHES = dataMatches['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['event-metadata-soccer'].week);
    //const MATCHES = [parseInt(SOURCE_MATCHES[0]['event-metadata']['event-metadata-soccer'].week), parseInt(SOURCE_MATCHES[1]['event-metadata']['event-metadata-soccer'].week)];
    //const CURRENT_DAY = Math.max(...MATCHES); 
    //console.log(positionsData)
    return(         
        <>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} currentDay={10}/>
            {/*classSelected[0] && <Fixtures calendar={calendar} />*/}
            {classSelected[1] && <Results results={results} />}
            {classSelected[2] && <Positions positionsData={positionsData}/>}
        </>
    )
}

export { StatsPage };