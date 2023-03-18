import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = 'https://api.unidadeditorial.es/sports/v1/classifications/current/?site=2&type=10&tournament=0168';
//const API_URL_MATCHES = 'https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=2023-03-03';
const API_URL_RESULTS = 'https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=';
const API_URL_CALENDAR = 'https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&offset=0&sort=start-date-time-asc&limit=50&startDate=';
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
    let day = today.getDate() < 9 ? '0' + (today.getDate()) : today.getDate();
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                //console.log(`${API_URL_CALENDAR}${dateToday}T06%3A00%3A00.000Z`)
                const { data: response } = await axios.get(`${API_URL_CALENDAR}${dateToday}T06%3A00%3A00.000Z`);
                //console.log(response)
                setResults(response['sports-content'].schedule[0]['sports-event']);setLoading(false);
            } catch (error) {
                console.error(error)
            }
            
        }
        fetchData();
    }, [])
    return {
        results,
        loading
    }
}

export const getCalendarByDate =  (dateArray) => {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    let today = new Date();
    let day = today.getDate() < 9 ? '0' + (today.getDate()) : today.getDate();
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                //console.log(`${API_URL_CALENDAR}${dateToday}T06%3A00%3A00.000Z`)
                const { data: friday } = await axios.get(`${API_URL_RESULTS}${dateArray.friday}`);
                const { data: saturday } = await axios.get(`${API_URL_RESULTS}${dateArray.saturday}`);
                const { data: sunday } = await axios.get(`${API_URL_RESULTS}${dateArray.sunday}`);
                const { data: monday } = await axios.get(`${API_URL_RESULTS}${dateArray.monday}`);
                //console.log(response)
                const arrayResult = friday.data.concat(saturday.data, sunday.data, monday.data);
                const arrayFinal = arrayResult.filter(result => result !== undefined)
                setResults(arrayFinal);
            } catch (error) {
                console.error(error.response.data)
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




export const getResults =  (date) => {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`${API_URL_RESULTS}${date}`);
                setResults(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        }
        fetchData();
    }, [date])

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
