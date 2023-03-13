import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = 'https://api.unidadeditorial.es/sports/v1/classifications/current/?site=2&type=10&tournament=0168';
//const API_URL_MATCHES = 'https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=2023-03-03';
const API_URL_RESULTS = 'https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=2023-03-12';
const API_URL_CALENDAR = 'https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&offset=0&sort=start-date-time-desc&limit=50&endDate=2023-03-13T06%3A00%3A00.000Z';
const API_URL_MATCH_DATA = 'https://api.unidadeditorial.es/sports/v1/events/';
//const API_URL_CALENDAR = 'https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&sort=start-date-time-asc&limit=50&startDate=2023-03-09T06%3A00%3A00.000Z';


export const getTablePositions = () => {
    const [positions, setPositions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(API_URL);
                setPositions(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        }
        fetchData();
    }, [])

    return {
        positions,
        loading
    }
}

export const getCalendar =  () => {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    let today = new Date();
    let day = today.getDate() < 9 ? '0' + (today.getDate() + 1) : today.getDate() + 1;
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(API_URL_CALENDAR);
                setResults(response['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['start-date-time'] < `${dateToday}T07:05:00Z`));
                console.log(response)
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        }
        fetchData();
    }, [])
    return {
        results,
        loading
    }
}
export const getResults =  () => {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(API_URL_RESULTS);
                setResults(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        }
        fetchData();
    }, [])

    return {
        results,
        loading
    }
}
export const getMatchData =  (id) => {
    const [matchData, setMatchData] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`${API_URL_MATCH_DATA}${id}/full?site=19`);
                console.log(id)
                setMatchData(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        }
        fetchData();
    }, [])

    return {
        matchData,
        loading
    }
}
