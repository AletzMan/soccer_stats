import { MatchLive } from '../MatchLive/MatchLive';
import './Results.css';
import { useEffect, useState } from 'react';
import { getDateToday, getDateTodayString, getPrevOrNextDay } from '../../services/utilities';
import { getResults } from '../../services/getData';
import { async } from '@firebase/util';

function Results() {
    const [daySelected, setDaySelected] = useState(getDateTodayString());
    const [ dateFetch, setDateFecth ] = useState(daySelected);
    const { results, loading } = getResults(dateFetch);
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = getDateToday();
    const DATE = new Date(`${today.year}-${today.month}-${today.day}`).toLocaleDateString('es-MX', optionsDate);
    let dateFull = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    const [dayString, setDayString] = useState(dateFull);

    const nextDay = () => {
        const { day, dayString, dayFetch } = getPrevOrNextDay(daySelected, 'next');
        setDaySelected(day);
        setDayString(dayString);
        setDateFecth(dayFetch);
    }
    const prevDay = () => {
        const { day, dayString, dayFetch } = getPrevOrNextDay(daySelected, 'prev');
        setDaySelected(day);
        setDayString(dayString);
        setDateFecth(dayFetch);
    }
    return (
        <div className='results'>
            <button onClick={nextDay}>+</button>
            <button onClick={prevDay}>-</button>
            <h1 className='results__title'>{dayString}</h1>
            {(!loading && results) && results?.data.map(({ id, sportEvent }) => (
                <MatchLive key={id} sportEvent={sportEvent} idEvent={id} date={daySelected} />
            ))}
            {results?.length === 0 && <p>Hoy no hay partidos</p>}
        </div>
    )
}

export { Results };

