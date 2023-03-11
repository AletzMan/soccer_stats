import { MatchLive } from '../MatchLive/MatchLive';
import { useStats } from '../../Hooks/UseData';
import './Results.css';
import { useEffect, useState } from 'react';

function Results({ results }) {
    const { statsData } = useStats();
    const [resultsData, setResultsData] = useState(results);



    useEffect(() => {
        getData();
        async function getData() {
            const result = await useStats();
            if (result) {
                setResultsData(result.resultData);
            }
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getData();
            async function getData() {
                const result = await useStats();
                if (result) {
                    setResultsData(result.resultData);
                }
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [resultsData]);

    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.getDate() < 9 ? '0' + (today.getDate() + 1) : today.getDate() + 1;
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
    const DATE = new Date(dateToday).toLocaleDateString('es-MX', optionsDate);
    let dateFull = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    console.log(results)
    console.log(resultsData)
    return (
        <div className='results'>
            <h1 className='results__title'>{dateFull}</h1>
            {resultsData && resultsData.map(({ ['event-metadata']: id, ['event-metadata']: sportEvent, officials, team, 'event-actions': eventActions }) => (
                <MatchLive key={id['event-key']} sportEvent={sportEvent} officials={officials} team={team} eventActions={eventActions} />
            ))}
            {resultsData.length === 0 && <p>Hoy no hay partidos</p>}
        </div>
    )
}

export { Results };

