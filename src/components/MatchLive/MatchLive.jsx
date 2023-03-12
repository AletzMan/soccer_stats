import './MatchLive.css';
import ballImage from '../../assets/ball.png';
import { useEffect, useState } from 'react';
import { countdown, statusEvent } from '../../services/utilities';
import { useStats } from '../../Hooks/UseData';

function MatchLive({ sportEvent, officials, team, eventActions }) {
    //const [resultsData, setResultsData] = useState(sportEvent);
    const [timeToStartEvent, setTimeStartEvent] = useState('');
    const HOME_TEAM = team[0]['team-metadata']['team-key'];
    const AWAY_TEAM = team[1]['team-metadata']['team-key'];
    let visitorsScoring = [];
    let awayScoring = [];
    
    if (eventActions) {
        if (eventActions['event-actions-soccer']['action-soccer-score']) {
            const SCORES = eventActions['event-actions-soccer']['action-soccer-score'];
            const scoresByTeam = SCORES.map((score) => {
                if (score['action-soccer-play-participant'][0]['team-idref'] === HOME_TEAM) {
                    return score = [0, score.minutesElapsed];
                } else if (score['action-soccer-play-participant'][0]['team-idref'] === AWAY_TEAM) {
                    return score = [1, score.minutesElapsed];
                }
            })
            const homePlayersScoring = team[0].player?.map((player) => { return [player.id, player['player-metadata'].name.first, player['player-metadata'].name.last] })
            const awayPlayersScoring = team[1].player?.map((player) => { return [player.id, player['player-metadata'].name.first, player['player-metadata'].name.last] })
            visitorsScoring = scoresByTeam.filter(teamSelect => teamSelect[0] === 0)?.map((teamSelect, index) => {
                return { id: index, minute: teamSelect[1], name: homePlayersScoring[index][1] + ' ' + homePlayersScoring[index][2] };
            })
            awayScoring = scoresByTeam.filter(teamSelect => teamSelect[0] === 1)?.map((teamSelect, index) => {
                return { id: index, minute: teamSelect[1], name: awayPlayersScoring[index][1] + ' ' + awayPlayersScoring[index][2] };
            })
        }

    }
    useEffect(() => {
        const dateEvent = sportEvent['start-date-time']
        if (sportEvent['event-metadata-soccer']['minutes-elapsed'] === undefined) {
            const interval = setInterval(() => {
                setTimeStartEvent(`Faltan: ${countdown(dateEvent)}`);                
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setTimeStartEvent(`${sportEvent['event-metadata-soccer']['minutes-elapsed']}'`)
        }
    }, []);
    //console.log(resultsData)
    const statusMatch = statusEvent(sportEvent).status;
    const statusClass = statusEvent(sportEvent).class;

    return (
        <>
            <div className="matchlive">
                <>
                    <img className='matchlive__img--home matchlive__img' src={team[0]['team-metadata']['sports-property'][0].value}></img>
                    <span className='matchlive__namehome' >{team[0]['team-metadata'].name.abbreviation}</span>
                    <span className='matchlive__resulthome matchlive__result' >{team[0]['team-stats'].score || '-'}</span>
                    <span className='matchlive__separator' >{'-'}</span>
                    <span className='matchlive__resultaway matchlive__result' >{team[1]['team-stats'].score || '-'}</span>
                    <span className='matchlive__nameaway' >{team[1]['team-metadata'].name.abbreviation}</span>
                    <img className='matchlive__img--away matchlive__img' src={team[1]['team-metadata']['sports-property'][0].value}></img>
                </>
                <ul className='matchlive__container container__home'>
                    {visitorsScoring?.map((player) => (
                        <li key={player.id} className='matchlive__minuteshome matchlive__scores' ><img className='matchlive__img--ball' src={ballImage} alt='image of ball' /> {player.minute + "'" + ' ' + player.name}</li>
                    ))}
                </ul>
                <ul className='matchlive__container container__away'>
                    {awayScoring?.map((player) => (
                        <li key={player.id} className='matchlive__minutesaway matchlive__scores' ><img className='matchlive__img--ball' src={ballImage} alt='image of ball' /> {player.minute + "'" + ' ' + player.name}</li>
                    ))}
                </ul>
                <span className={`matchlive__time matchlive__time--${statusClass}`}>{timeToStartEvent}</span>
                <span className={`matchlive__status matchlive__status--${statusClass}`}>{statusMatch}</span>
            </div>
        </>
    )
}

export { MatchLive };