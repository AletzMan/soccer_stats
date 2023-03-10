import { useRef, useState } from 'react'
import './MatchBetting.css'

function MatchBetting({ team, eventData, updateResults, index, value }) {
    const handleRadioCheck = (e) => {
        updateResults(e.target.id, index)

    }
    return (
        <div className='betting'>
            <div className='betting__container bettingmatch'>
                <div className='bettingmatch__container'>
                    <img className='bettingmatch__image--home bettingmatch__image' src={team[0]['team-metadata']['sports-property'][0].value} />
                </div>
                <span className='bettingmatch__name--home bettingmatch__name' >{team[0]['team-metadata'].name.abbreviation}</span>
                <div className='bettingmatch__check bettingcheck'>
                    <div className='bettingcheck__container'>
                        <input className='bettingcheck__check' defaultChecked={value[index]=== 'L'} onChange={handleRadioCheck} id={`L`} name={`event${eventData['event-key']}`} type='radio' />
                        <div className='bettingcheck__mark'>L</div>
                    </div>
                    <div className='bettingcheck__container'>
                        <input className='bettingcheck__check' defaultChecked={value[index]=== 'E'} onChange={handleRadioCheck} id={`E`} name={`event${eventData['event-key']}`} type='radio' />
                        <div className='bettingcheck__mark'>E</div>
                    </div>
                    <div className='bettingcheck__container'>
                        <input className='bettingcheck__check' defaultChecked={value[index]=== 'V'} onChange={handleRadioCheck} id={`V`} name={`event${eventData['event-key']}`} type='radio' />
                        <div className='bettingcheck__mark'>V</div>
                    </div>
                </div>
                <span className='bettingmatch__name--away bettingmatch__name' >{team[1]['team-metadata'].name.abbreviation}</span>
                <div className='bettingmatch__container'>
                    <img className='bettingmatch__image--away bettingmatch__image' src={team[1]['team-metadata']['sports-property'][0].value} />
                </div>
            </div>
        </div>
    )
}

export { MatchBetting };