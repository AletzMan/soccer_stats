import './MatchLive.css';
import ballImage from '../../assets/ball.png';
import { useEffect, useState } from 'react';
import { countdown, getEventStats, statusEvent } from '../../services/utilities';
import { getMatchData } from '../../services/getData';
import { MatchDetails } from '../MatchDetails/MatchDetails';
import arrowDownIcon from '../../assets/arrowdown-icon.svg';

function MatchLive({ sportEvent, idEvent }) {
    const [timeToStartEvent, setTimeStartEvent] = useState('');
    const [opened, setOpened] = useState(false);

    const { loading, matchData } = getMatchData(idEvent);
    const matchDataIsVisible = matchData?.data?.event.scoreDetails;


    const statusMatch = sportEvent.status.name;
    const statusClass = statusEvent(sportEvent).class;


    useEffect(() => {
        if (sportEvent.startDate || matchData?.data?.event.startDate && sportEvent?.status?.name !== 'Finalizado') {
            const interval = setInterval(() => {
                if (matchData?.data?.event.score.period.startTime) {
                    const dateEvent = matchData?.data?.event.score.period.startTime;
                    setTimeStartEvent(`${countdown(dateEvent, matchData.data.event.score.period.name)}`);
                    console.log('o aqui')
                    console.log(matchData)
                } else {
                    const dateEvent = sportEvent.startDate || matchData?.data?.event.startDate
                    setTimeStartEvent(`Faltan: ${countdown(dateEvent)}`);
                }
                //console.log(dateEvent)
            }, 1000);
            return () => clearInterval(interval);
        } if (sportEvent.status.name === 'Finalizado') {
            setTimeStartEvent(''); console.log(timeToStartEvent)
        }
    }, [matchData]);

    const opendDetailStatus = (e) => {
        setOpened(e.target.checked);
        const newScroll = 550;
        if (e.target.checked) {
            console.log(screenY)
            setTimeout(() => {

                window.scroll(0, 400)
            }, 100);
        }
    }


    const eventStats = getEventStats(matchData?.data);

    return (
        <>
            {(!loading) &&
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
                    {eventStats &&
                        <>
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
                        </>
                    }
                    <span className={`matchlive__time matchlive__time--${statusClass}`}>{timeToStartEvent}</span>
                    <span className={`matchlive__status matchlive__status--${statusClass}`}>{statusMatch}</span>
                    <div className='matchlive__details buttondetails'>
                        <input type='checkbox' onChange={opendDetailStatus} className='buttondetails__checkbox'></input>
                        <img className='buttondetails__img' src={arrowDownIcon} alt="icon arrow down" />
                        <span className='buttondetails__name'>Details</span>
                    </div>
                    {eventStats && <MatchDetails opened={opened} matchData={matchData.data}></MatchDetails>}


                </div>}


        </>
    )
}

export { MatchLive };