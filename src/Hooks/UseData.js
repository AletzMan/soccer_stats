import { useReducer, useEffect } from "react";
import { getTablePositions, getResultsDay, getCalendar } from "../services/getData";

function useStats() {
    const initState = {
        positionsData: '',
        resultData: '',
        calendarData: '',
    }

    const ACTIONS_TYPES = {
        ALL_UPDATE: 'ALL_UPDATE',
        TYPE: 'TYPE'
    }

    const reducer = (state, action) => {
        if (action.type === ACTIONS_TYPES.ALL_UPDATE) {
            return {
                ...state,
                positionsData: action.payload[0],
                resultData: action.payload[1],
                calendarData: action.payload[2],
            }
        } else {
            state;
        }
    }
    const [statsData, dispatch] = useReducer(reducer, initState);
    let today = new Date();
    let day = today.getDate() < 9? '0' + (today.getDate() + 2):today.getDate() + 2;
    let month = today.getMonth() < 9? '0' + (today.getMonth() + 1):today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToday = `${year}-${month}-${day}`;
   //console.log(dateToday)
    
    useEffect(() => {
        Promise.all([
            getTablePositions(),
            getResultsDay(),
            //getCalendar()
        ]).then(value => {
            
            dispatch({
                type: ACTIONS_TYPES.ALL_UPDATE,
                payload:
                    [value[0].data[0].rank,
                    value[1]['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['start-date-time']  === `${dateToday}T07:05:00Z`),
                    value[1]['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['event-metadata-soccer'].week === '11')],
            })            
        })
    }, [])



    return ({
        statsData
    })
}


export { useStats };