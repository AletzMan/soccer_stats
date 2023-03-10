import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MatchBetting } from "../../components/MatchBetting/MatchBetting";
import { MatchHeader } from "../../components/MatchHeader/MatchHeader";
import { Player } from "../../components/Player/Player";
import './BettingPage.css';
import loadingIcon from  '../../assets/loading-icon.svg';

function BettingPage({ calendar }) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const initResult = new Array(['0', '0', '0', '0', '0', '0', '0', '0', '0']);
    const [results, setResults] = useState(['0', '0', '0', '0', '0', '0', '0', '0', '0']);
    const userInfo = useLocation().state;
    const navigate = useNavigate();
    let lastMatches = 0;
    let matches = [];
    let currentDay = 0;
    const SOURCE_MATCHES = parseInt(calendar[0]['event-metadata']['event-metadata-soccer'].week);
    const names = ['QUINIELA', 'PARTICIPANTES', null];

    useEffect(() => {
        console.log('entrando')
        setCurrentUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [])

    const updateResults = (value, index) => {
        const result = [...results];
        result[index] = value;
        setResults(result);
    }


    console.log(results);


    const FIND_MATCH = calendar.find((match, index) => {
        if (match['event-metadata']['event-metadata-soccer'].week === `${SOURCE_MATCHES}`) {
            lastMatches = index;
            currentDay = match['event-metadata']['event-metadata-soccer'].week;
            return match
        }
    })
    const MATCHES_OF_THE_DAY = calendar.filter(match => match['event-metadata']['event-metadata-soccer'].week === `${currentDay}`)

    for (let index = 0; index < lastMatches; index++) {
        matches.push(parseInt(calendar[index]['event-metadata']['event-metadata-soccer'].week))
    }
    const handleSend = () => {
        setError('');
        if (username.length === 0) {
            setError('Elige nombre para tu quiniela');
        } else if (username.length < 3) {
            setError('El nombre debe tener al menos 3 caracteres');
        } else if (username.length > 13) {
            setError('El nombre debe tener máximo 12 caracteres');
        } else if (!username.match(/^[a-zA-Z0-9]+$/i)) {
            setError('El nombre solo puede tener numeros y letras');
        } else if(results.filter(result => result === '0').length !== 0 || results.length === 0){
            setError('Debes completar todos los partidos');
        }
        
    }
    const handleChangeInput = (e) => {
        setError('');
        setUsername(e.target.value);
    }
    const PLAYERS = [
        {
            id: 0,
            name: 'Marijo',
            results: ['L', 'E', 'V', 'E', 'L', 'V', 'L', 'E', 'L']
        },
        {
            id: 1,
            name: 'Evelyn',
            results: ['E', 'V', 'L', 'L', 'V', 'E', 'E', 'V', 'V']
        },
        {
            id: 2,
            name: 'Elizabeth',
            results: ['V', 'L', 'E', 'V', 'E', 'L', 'V', 'L', 'E']
        },
        {
            id: 3,
            name: 'Mariana',
            results: ['V', 'L', 'E', 'V', 'E', 'L', 'V', 'L', 'E']
        },
    ]

    return (
        <div className='bettingpage'>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} calendar={calendar} names={names} user={currentUser} />
            {classSelected[0] &&
                <div className="bettingpage__betting">
                    {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }, index) => (
                        <MatchBetting key={key['event-key']} team={team} eventData={eventData} updateResults={updateResults} index={index} value={results} />
                    ))}
                    {currentUser && <div className="bettingpage__container">
                        <input className="bettingpage__input" name="name" placeholder="Nombre" value={username} onChange={handleChangeInput}></input>
                        <button className="bettingpage__send" onClick={handleSend}>Enviar</button>
                        <span className="bettingpage__error">{error}</span>
                        <img className="bettingpage__loading" src={loadingIcon} alt="icon loading"></img>
                        <span className="bettingpage__message">{'Enviado'}</span>
                    </div>}
                    {!currentUser &&
                        <div className="bettingpage__modal modal">
                            <div className="modal__message">Inicia sesión para rellenar y enviar tu quiniela</div>
                        </div>
                    }
                </div>
            }
            {classSelected[1] &&
                <div className="bettingpage__players players">
                    <div className="players__space"></div>
                    <div className="players__header">
                        {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }) => (
                            <MatchHeader key={key['event-key']} team={team} eventData={eventData} />
                        ))}
                    </div>
                    {PLAYERS.map((player) => (
                        <Player key={player.id} name={player.name} results={player.results} />
                    ))}
                </div>
            }
        </div>
    )
}

export { BettingPage };