import { useEffect } from "react";
import { getTablePositions, getResultsDay, getCalendar } from "../services/getData";

export async function useStats() {
    let getPositionsData;
    let getResultsData;
    let getCalendarData;

    let today = new Date();
    let day = today.getDate() < 9 ? '0' + (today.getDate() + 1) : today.getDate() + 1;
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
    console.log(dateToday);

    const getPositions = await getTablePositions();
    const getResults = await getResultsDay();

    getPositionsData = getPositions.data[0].rank;
    getResultsData = getResults['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['start-date-time'] < `${dateToday}T07:05:00Z`);
    getCalendarData = getResults['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['event-metadata-soccer'].week === '11');

    return ({
        positionsData: getPositionsData,
        resultData: getResultsData,
        calendarData: getCalendarData,
    })
}
