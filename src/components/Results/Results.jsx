import { MatchLive } from '../MatchLive/MatchLive';
import './Results.css';
import loadingIcon from '../../assets/loading-icon.svg';
import { useState } from 'react';
import { getDateToday, getDateTodayString, getPrevOrNextDay } from '../../services/utilities';
import { getResults } from '../../services/getData';
import { Loading } from '../Loading/Loading';
import { FaceSad } from '../Globals/faceSad';

function Results() {
    const [daySelected, setDaySelected] = useState(getDateTodayString());
    const [dateFetch, setDateFetch] = useState(daySelected);
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
        setDateFetch(dayFetch);
    }
    const prevDay = () => {
        const { day, dayString, dayFetch } = getPrevOrNextDay(daySelected, 'prev');
        setDaySelected(day);
        setDayString(dayString);
        setDateFetch(dayFetch);
    }
    const isLastDay = dateFull === dayString;
    return (
        <section className='results'>
            <header className='results__header'>
                <button className={`results__button results__prev results__prev--false`} onClick={prevDay}></button>
                <h1 className='results__title'>{dayString}</h1>
                <button className={`results__button results__next results__next--${isLastDay}`} disabled={isLastDay} onClick={nextDay}></button>
            </header>
            {(!loading && results?.data?.length > 0) && results?.data.map(({ id, sportEvent }) => (
                <MatchLive key={id} sportEvent={sportEvent} idEvent={id} daySelected0={daySelected} />
            ))}
            {loading && <Loading />}
            {!results &&
                <>
                    <span className='results__empty'>Hoy no hay partidos</span>
                   <FaceSad />
                </>
            }
        </section>
    )
}

export { Results };

