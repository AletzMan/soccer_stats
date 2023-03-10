import './MatchHeader.css'

function MatchHeader({ team, eventData }) {
    console.log(team)
    return (
        <div className=' matchheader'>
            <div className='matchheader__container'>
                <img className='matchheader__image--home matchheader__image' src={team[0]['team-metadata']['sports-property'][0].value} />
                <span className='matchheader__name--home matchheader__name' >{team[0]['team-metadata'].name.full}</span>
            </div>
            <span className='matchheader__vs'>VS</span>
            <div className='matchheader__container'>
                <span className='matchheader__name--away matchheader__name' >{team[1]['team-metadata'].name.full}</span>
                <img className='matchheader__image--away matchheader__image' src={team[1]['team-metadata']['sports-property'][0].value} />
            </div>
        </div>
    )
}

export { MatchHeader };