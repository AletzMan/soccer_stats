import './MatchLive.css';

function MatchLive({ score, sportEvent }) {
    // console.log(eventData)
    return (
        <div className="matchlive">
            <img className='matchlive__img--home matchlive__img' src={sportEvent.competitors.homeTeam.images.urlLogo[1]}></img>
            <span className='matchlive__namehome' >{sportEvent.competitors.homeTeam.fullName}</span>
            <span className='matchlive__resulthome' >{score.homeTeam.totalScore}</span>
            <span className='matchlive__resultaway' >{score.awayTeam.totalScore}</span>
            <span className='matchlive__nameaway' >{sportEvent.competitors.awayTeam.fullName}</span>
            <img className='matchlive__img--away matchlive__img'  src={sportEvent.competitors.awayTeam.images.urlLogo[1]}></img>
        </div>
    )
}

export { MatchLive };