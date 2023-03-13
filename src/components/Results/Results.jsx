import { MatchLive } from '../MatchLive/MatchLive';
import './Results.css';
import { useEffect, useState } from 'react';
import { getDateToday } from '../../services/utilities';
import { getResults } from '../../services/getData';

function Results() {
    const [resultsData, setResultsData] = useState(null);
    const { results, loading } = getResults({});
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsDate2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let today = getDateToday();
    const DATE = new Date(`${today.year}-${today.month}-${today.day}`).toLocaleDateString('es-MX', optionsDate);
    let dateFull = DATE.charAt(0).toUpperCase() + DATE.slice(1);

    console.log(results.data)
    const date  = new Date('2023-03-13T04:30:36Z')
    const date2  = new Date('2023-03-13T03:15:00Z')
    console.log(date.toLocaleDateString('es-MX', optionsDate2))
    console.log(date2.toLocaleDateString('es-MX', optionsDate2))

    useEffect(() => {
        
    }, [loading])
    
    //console.log(results?.data[0].id)
/*
    useEffect(() => {

        const interval = setInterval(() => {
            const { results, loading } = getResults({});
            getData();
            async function getData() {
                const result = await useStats();
                if (result) {
                    const week = (result.resultData.find(result => result['event-metadata']['start-date-time'] < '2023-03-13T06%3A00%3A00.000Z'))['event-metadata']['event-metadata-soccer'].week;
                    const resultFilter = result.resultData.filter(result => result['event-metadata']['event-metadata-soccer'].week === week)
                    setResultsData(resultFilter);
                } else {
                    setResultsData(null);
                }
            }
        }, 30000);
        return () => clearInterval(interval);
    }, []);
*/
   
    return (
        <div className='results'>
            <h1 className='results__title'>{dateFull}</h1>
            {!loading && results?.data.map(({ id, sportEvent }) => (
                <MatchLive key={id} sportEvent={sportEvent} idEvent={id} />
            ))}
            {results?.length === 0 && <p>Hoy no hay partidos</p>}
        </div>
    )
}

export { Results };

