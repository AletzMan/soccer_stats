import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fixtures } from '../../components/Fixtures/Fixtures';
import { Header } from "../../components/Header/Header";
import { Positions } from "../../components/Positions/Positions";
import { Results } from '../../components/Results/Results';
import { getResults } from '../../services/getData';


function StatsPage({ calendar }) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    const [currentUser, setCurrentUser] = useState(null);
    const userInfo = useLocation().state;
    const navigate = useNavigate();
    
    const names = ['JORANDA', 'RESULTADOS', 'POSICIONES'];

    useEffect(() => {
        setCurrentUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [])

    

    return (
        <>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} calendar={calendar} names={names} user={currentUser} />
            {(classSelected[0] && calendar) && <Fixtures calendar={calendar} />}
            {(classSelected[1]) && <Results />}
            {classSelected[2] && <Positions />}
        </>
    )
}

export { StatsPage };