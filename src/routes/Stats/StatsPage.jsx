import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fixtures } from '../../components/Fixtures/Fixtures';
import { Header } from "../../components/Header/Header";
import { Positions } from "../../components/Positions/Positions";
import { Results } from '../../components/Results/Results';
import { getResults } from '../../services/getData';


function StatsPage() {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    const [currentUser, setCurrentUser] = useState(null);
    const userInfo = useLocation().state;
    const navigate = useNavigate();
    const [week, setWeek] = useState('')
    const names = ['JORNADA', 'RESULTADOS', 'POSICIONES'];

    useEffect(() => {
        setCurrentUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [])
    

    return (
        <>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} names={names} user={currentUser} week={week} />
            {classSelected[0]  && <Fixtures setWeek={setWeek}/>}
            {classSelected[1] && <Results />}
            {classSelected[2] && <Positions />}
        </>
    )
}

export { StatsPage };