import { useState } from 'react';
import { Fixtures } from '../../components/Fixtures/Fixtures';
import { Header } from "../../components/Header/Header";
import { Positions } from "../../components/Positions/Positions";
//https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=2023-02-27
//https://www.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer?seasonKey=2022&competitionKey=385&sort=start-date-time-asc&limit=80&startDate=2023-02-27T06%3A00%3A00.000Z

function StatsPage() {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    return(
        <>
            <Header classSelected={classSelected} setClassSelected={setClassSelected}/>
            {classSelected[0] && <Fixtures />}
            {classSelected[2] && <Positions />}
        </>
    )
}

export { StatsPage };