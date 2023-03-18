import './MatchLive.css';
import ballImage from '../../assets/ball.png';
import { useEffect, useState } from 'react';
import { countdown, getEventStats, statusEvent } from '../../services/utilities';
import { getMatchData, getResults } from '../../services/getData';
import { MatchDetails } from '../MatchDetails/MatchDetails';
import arrowDownIcon from '../../assets/arrowdown-icon.svg';

function MatchLive({ sportEvent, idEvent }) {
    const { loading, matchData } = getMatchData(idEvent);
    const eventStats = !loading ? getEventStats(matchData?.data) : null;
    const [timeToStartEvent, setTimeStartEvent] = useState(eventStats?.narration[0]?.momentAction);
    const [opened, setOpened] = useState(false);

    const statusMatch = sportEvent.status.name;
    const statusClass = statusEvent(sportEvent, eventStats).class;

    console.log(matchData)
    console.log(eventStats)
    useEffect(() => {
        const dateEvent = matchData?.data?.event.startDate;
        if (sportEvent.status.name === 'Sin comenzar') {
            const interval = setInterval(() => {
                setTimeStartEvent(`Faltan: ${countdown(dateEvent)}`);s
            }, 1000);
            return () => clearInterval(interval);
        } if (sportEvent.status.name === 'Finalizado') {
            setTimeStartEvent(``);
        }
        else {
            setTimeStartEvent(`${eventStats?.narration[0]?.momentAction}'`);
        }
    }, [eventStats]);

    const opendDetailStatus = (e) => {
        setOpened(e.target.checked);
    }


    return (
        <>
            {(!loading && eventStats) &&
                <div className="matchlive">
                    <>
                        <img className='matchlive__img--home matchlive__img' src={sportEvent?.competitors.homeTeam.images.urlLogo[0]}></img>
                        <span className='matchlive__namehome' >{sportEvent?.competitors.homeTeam.abbName}</span>
                        <span className='matchlive__resulthome matchlive__result' >{matchData?.data.event.score.homeTeam.totalScore || '-'}</span>
                        <span className='matchlive__separator' >{'-'}</span>
                        <span className='matchlive__resultaway matchlive__result' >{matchData?.data.event.score.awayTeam.totalScore || '-'}</span>
                        <span className='matchlive__nameaway' >{sportEvent?.competitors.awayTeam.abbName}</span>
                        <img className='matchlive__img--away matchlive__img' src={sportEvent?.competitors.awayTeam.images.urlLogo[0]}></img>
                    </>
                    <ul className='matchlive__container container__home'>
                        {matchData?.data.event.scoreDetails.goals?.homeTeam?.map((goal) => (
                            <li key={goal._id} className='matchlive__minuteshome matchlive__scores' ><img className='matchlive__img--ball' src={ballImage} alt='image of ball' /> {goal.matchTime + "'" + ' ' + goal.playerFullName}</li>
                        ))}

                    </ul>
                    <ul className='matchalive__redcards redcards redcards__home'>
                        {eventStats?.homeTeam.discipline.redCards?.map((player) => (
                            <li key={player._id} className='redcards__list'><div className='redcards__card'></div> {player.matchTime + "'" + ' ' + player.playerFullName}</li>
                        ))}
                    </ul>
                    <ul className='matchlive__container container__away'>
                        {matchData?.data.event.scoreDetails.goals?.awayTeam?.map((goal) => (
                            <li key={goal._id} className='matchlive__minutesaway matchlive__scores' ><img className='matchlive__img--ball' src={ballImage} alt='image of ball' /> {goal.matchTime + "'" + ' ' + goal.playerFullName}</li>
                        ))}

                    </ul>
                    <ul className='matchalive__redcards redcards redcards__away' >
                        {eventStats?.awayTeam.discipline.redCards?.map((player) => (
                            <li key={player._id} className='redcards__list'><div className='redcards__card'></div> {player.matchTime + "'" + ' ' + player.playerFullName}</li>
                        ))}
                    </ul>
                    <span className={`matchlive__time matchlive__time--${statusClass}`}>{timeToStartEvent}</span>
                    <span className={`matchlive__status matchlive__status--${statusClass}`}>{statusMatch}</span>
                    <div className='matchlive__details buttondetails'>
                        <input type='checkbox' onChange={opendDetailStatus} className='buttondetails__checkbox'></input>
                        <img className='buttondetails__img' src={arrowDownIcon} alt="icon arrow down" />
                        <span className='buttondetails__name'>Details</span>
                    </div>
                    <MatchDetails opened={opened} matchData={matchData.data}></MatchDetails>
                </div>}


        </>
    )
}

export { MatchLive };