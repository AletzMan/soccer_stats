import './MatchBetting.css'

function MatchBetting({ team, eventData }) {
    console.log(team)
    return (
        <div className='betting'>
            <div className='betting__container bettingmatch'>
                <img className='bettingmatch__image--home bettingmatch__image' src={team[0]['team-metadata']['sports-property'][0].value} />
                <span className='bettingmatch__name--home bettingmatch__name' >{team[0]['team-metadata'].name.abbreviation}</span>
                <div className='bettingmatch__check bettingcheck'>
                    <div className='bettingcheck__container'>
                        <input className='bettingcheck__check' name={`event${eventData['event-key']}`} type='radio' />
                        <div className='bettingcheck__mark'>L</div>
                    </div>
                    <div className='bettingcheck__container'>
                        <input className='bettingcheck__check' name={`event${eventData['event-key']}`} type='radio' />
                        <div className='bettingcheck__mark'>E</div>
                    </div>
                    <div className='bettingcheck__container'>
                        <input className='bettingcheck__check' name={`event${eventData['event-key']}`} type='radio' />
                        <div className='bettingcheck__mark'>V</div>
                    </div>
                </div>
                <span className='bettingmatch__name--away bettingmatch__name' >{team[1]['team-metadata'].name.abbreviation}</span>
                <img className='bettingmatch__image--away bettingmatch__image' src={team[1]['team-metadata']['sports-property'][0].value} />
            </div>
        </div>
    )
}

export { MatchBetting };