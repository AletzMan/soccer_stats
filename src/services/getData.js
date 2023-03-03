const API_URL = 'https://api.unidadeditorial.es/sports/v1/classifications/current/?site=2&type=10&tournament=0168';
//const API_URL_MATCHES = 'https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=2023-03-03';
const API_URL_RESULTS = 'https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&sort=start-date-time-asc&limit=50&startDate=2023-02-25T06%3A00%3A00.000Z';
const API_URL_CALENDAR = 'https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&sort=start-date-time-asc&limit=50&startDate=2023-02-28T06%3A00%3A00.000Z';
      //  'https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&sort=start-date-time-asc&limit=80&startDate=2023-02-27T06%3A00%3A00.000Z'

export const getTablePositions = async () => {
    try {
        const response = await fetch(`${API_URL}`)
        const data = await response.json();
        //console.log(data)
        return data;
    } catch (err) {
        return console.error(err);
    }
}

export const getResultsDay = async () => {
    try {
        const response = await fetch(`${API_URL_RESULTS}`)
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        return console.error(err);
    }
}
export const getCalendar = async () => {
    try {
        const response = await fetch(`${API_URL_CALENDAR}`)
        const data = await response.json();
        //console.log(data)
        return data;
    } catch (err) {
        return console.error(err);
    }
}
