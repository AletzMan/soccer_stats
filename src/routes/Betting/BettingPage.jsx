import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MatchBetting } from "../../components/MatchBetting/MatchBetting";
import { MatchHeader } from "../../components/MatchHeader/MatchHeader";
import { Player } from "../../components/Player/Player";
import './BettingPage.css';
import loadingIcon from '../../assets/loading-icon.svg';
import uuid from "react-uuid";
import { insertNewBet } from "../../services/firebase";
import { getCalendar, getCalendarByDate } from "../../services/getData";
import { Loading } from "../../components/Loading/Loading";
import { getEventDetails, getNextWeekEnd } from "../../services/utilities";

function BettingPage({ calendar }) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [sending, setSending] = useState(null);
    const [resultsBets, setResults] = useState(['0', '0', '0', '0', '0', '0', '0', '0', '0']);
    const [currentBets, setCurrentBets] = useState();
    const [week, setWeek] = useState('')
    const userInfo = useLocation().state?.userInfo;
    const betsInfo = useLocation().state?.bets;
    const navigate = useNavigate();
    let playerResults = {};
    const names = ['QUINIELA', 'PARTICIPANTES', null];
    const resultDate = getNextWeekEnd();
    const { loading, results } = getCalendarByDate(resultDate);

    useEffect(() => {
        setCurrentUser(userInfo);
        setCurrentBets(betsInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [])

    const updateResults = (value, index) => {
        const result = [...resultsBets];
        result[index] = value;
        setResults(result);
    }

    
    const handleSend = async () => {
        setError('');
        if (username.length === 0) {
            setError('Elige nombre para tu quiniela');
        } else if (username.length < 3) {
            setError('El nombre debe tener al menos 3 caracteres');
        } else if (username.length > 13) {
            setError('El nombre debe tener máximo 12 caracteres');
        } else if (!username.match(/^[a-zA-Z0-9]+$/i)) {
            setError('El nombre solo puede tener numeros y letras');
        } else if (resultsBets.filter(result => result === '0').length !== 0 || resultsBets.length === 0) {
            setError('Debes completar todos los partidos');
        } else if (error === '') {
            setSending(true);
            playerResults = {
                id: uuid(),
                uid: currentUser.uid,
                name: username,
                results: resultsBets
            }

            const res = await insertNewBet(playerResults);
            if (res) {
                setSending(false);
                setClassSelected([false, false, false]);
                setTimeout(() => {
                    setSending(null);
                    setClassSelected([true, false, false]);
                    setResults(['0', '0', '0', '0', '0', '0', '0', '0', '0']);
                    setUsername('');
                }, 4000);
            } else {
                setError('Error al enviar, inténtelo más tarde');
            }
        }
    }
    const handleChangeInput = (e) => {
        setError('');
        setUsername(e.target.value);
    }

    return (
        <>
            {!loading &&
                <main className='bettingpage'>
                    <Header classSelected={classSelected} setClassSelected={setClassSelected} calendar={results} names={names} user={currentUser}  week={week}  />
                    {classSelected[0] &&
                        <section className="bettingpage__betting">
                            {results.map((result, index, { id }) => (
                                <MatchBetting key={id} eventData={result} updateResults={updateResults} index={index} value={resultsBets} setWeek={setWeek}/>
                            ))}
                            {currentUser &&
                                <div className="bettingpage__container">
                                    <input className="bettingpage__input" name="name" placeholder="Nombre" value={username} onChange={handleChangeInput}></input>
                                    <button className="bettingpage__send" onClick={handleSend}>Enviar</button>
                                    <span className="bettingpage__error">{error}</span>
                                    {sending && <img className="bettingpage__loading" src={loadingIcon} alt="icon loading"></img>}
                                    {sending === false && <span className="bettingpage__message">{'Enviado'}</span>}
                                </div>}
                            {!currentUser &&
                                <div className="bettingpage__modal modal">
                                    <div className="modal__message">Inicia sesión para rellenar y enviar tu quiniela</div>
                                </div>
                            }
                        </section>
                    }
                    {classSelected[1] &&
                        <section className="bettingpage__players players">
                            <div className="players__space"></div>
                            <div className="players__header">
                                {results.map((result, { id }) => (
                                    <MatchHeader key={id} eventData={result} />
                                ))}
                            </div>
                            {currentBets.map((player) => (
                                <Player key={player.id} name={player.name} results={player.results} idBet={player.uid} userID={currentUser.uid} calendar={results} />
                            ))}
                        </section>
                    }
                    {(!classSelected[0] && !classSelected[1] && !classSelected[2]) &&
                        <div className="bettingpage__goodlook goodlook">
                            <span className="goodlook__message">{`Quiniela enviada \n`}</span>
                            <span className="goodlook__good">¡Suerte!</span>
                        </div>
                    }
                </main>}
            {loading && <Loading/>}
        </>
    )
}

export { BettingPage };