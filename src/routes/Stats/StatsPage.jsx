import { useState } from 'react';
import { Fixtures } from '../../components/Fixtures/Fixtures';
import { Header } from "../../components/Header/Header";
import { Positions } from "../../components/Positions/Positions";
import { Results } from '../../components/Results/Results';

function StatsPage({calendar, results, positionsData}) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    const names = ['JORANDA', 'RESULTADOS', 'POSICIONES'];
    console.log(results)
    return(         
        <>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} calendar={calendar} names={names}/>
            {(classSelected[0] && calendar) && <Fixtures calendar={calendar} />}
            {classSelected[1] && <Results results={results} />}
            {classSelected[2] && <Positions positionsData={positionsData}/>}
        </>
    )
}

export { StatsPage };