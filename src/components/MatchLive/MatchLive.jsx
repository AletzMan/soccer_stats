import './MatchLive.css';
import ballImage from '../../assets/ball.png';

function MatchLive({ sportEvent, officials, team, eventActions }) {
    const HOME_TEAM = team[0]['team-metadata']['team-key'];
    const AWAY_TEAM = team[1]['team-metadata']['team-key'];
    let SCORES_HOME;
    let SCORES_AWAY;

    if (eventActions) {
        const SCORES = eventActions['event-actions-soccer']['action-soccer-score'];
        const SCORES_BY_TEAM = SCORES.map((score) => {
            if (score['action-soccer-play-participant'][0]['team-idref'] === HOME_TEAM) {
                return score = [0, score.minutesElapsed];
            } else if (score['action-soccer-play-participant'][0]['team-idref'] === AWAY_TEAM) {
                return score = [1, score.minutesElapsed];
            }
        })
        const PLAYERS_SCORE_HOME = team[0].player?.map((player) => { return [player.id, player['player-metadata'].name.first, player['player-metadata'].name.last] })

        const PLAYERS_SCORE_AWAY = team[1].player?.map((player) => { return [player.id, player['player-metadata'].name.first, player['player-metadata'].name.last] })

        SCORES_HOME = SCORES_BY_TEAM.filter(teamSelect => teamSelect[0] === 0)?.map((teamSelect, index) => {
            return { minute: teamSelect[1], name: PLAYERS_SCORE_HOME[index][1] + ' ' + PLAYERS_SCORE_HOME[index][2] };
        })
        SCORES_AWAY = SCORES_BY_TEAM.filter(teamSelect => teamSelect[0] === 1)?.map((teamSelect, index) => {
            return { minute: teamSelect[1], name: PLAYERS_SCORE_AWAY[index][1] + ' ' + PLAYERS_SCORE_AWAY[index][2] };
        })
    }

    const STATUS_MATCH = sportEvent['event-status'] === 'post-event' ? 'Finalizado' : 'Previa';
    const CLASS_STATUS = sportEvent['event-status'] === 'post-event' ? 'finished' : 'uninitiated';
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
                    {SCORES_HOME?.map((player) => (
                        <li className='matchlive__minuteshome matchlive__scores' ><img className='matchlive__img--ball' src={ballImage} alt='image of ball' /> {player.minute + "'" + ' ' + player.name}</li>
                    ))}
                </ul>
                <ul className='matchlive__container container__away'>
                    {SCORES_AWAY?.map((player) => (
                        <li className='matchlive__minutesaway matchlive__scores' ><img className='matchlive__img--ball' src={ballImage} alt='image of ball' /> {player.minute + "'" + ' ' + player.name}</li>
                    ))}
                </ul>
                <span className={`matchlive__status matchlive__status--${CLASS_STATUS}`}>{STATUS_MATCH}</span>
            </div>
        </>
    )
}

export { MatchLive };