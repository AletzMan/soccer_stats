import { useReducer, useEffect } from "react";
import { getTablePositions, getMatchesDay, getCalendar } from "../services/getData";

function useStats() {
    const initState = {
        positionsData: '',
        matchesData: '',
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
                matchesData: action.payload[1],
                calendarData: action.payload[2],
            }
        } else {
            state;
        }
    }
    const [statsData, dispatch] = useReducer(reducer, initState);
    
    useEffect(() => {
        Promise.all([
            getTablePositions(),
            getMatchesDay(),
            getCalendar()
        ]).then(value => {
            
            dispatch({
                type: ACTIONS_TYPES.ALL_UPDATE,
                payload:
                    [value[0].data[0].rank,
                    value[1].data,
                    value[2]['sports-content'].schedule[0]['sports-event'].filter(match => match['event-metadata']['event-metadata-soccer'].week)],
            })            
        })
    }, [])



    return ({
        statsData
    })
}


export { useStats };