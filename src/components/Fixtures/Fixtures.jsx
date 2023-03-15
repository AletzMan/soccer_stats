import './Fixtures.css'
//import dataMatches from '../../services/dataMatches.json';
import { Match } from '../Match/Match';
import { getCalendarByDate } from '../../services/getData';
import { Loading } from "../../components/Loading/Loading";
import { getEventDetails, getNextWeekEnd } from '../../services/utilities';
import { useEffect, useState } from 'react';

function Fixtures({ setWeek }) {
    const resultDate = getNextWeekEnd();
    const { loading, results } = getCalendarByDate(resultDate);


    useEffect(() => {
        if (!loading) {
            const details = getEventDetails(results[0]);
            setWeek(details.week);
        }
    }, [loading])


    return (
        <section className='fixtures'>
            {!loading && <div className='fixtures__match'>
                {results.map((result, { id, }) => (
                    <Match key={id} eventData={result} />
                ))}
            </div>}
            {loading && <Loading />}
        </section>
    )
}

export { Fixtures };