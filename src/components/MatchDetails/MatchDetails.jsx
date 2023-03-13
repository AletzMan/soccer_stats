import React, { useState } from 'react';
import { getEventStats } from '../../services/utilities';
import './MatchDetails.css';

function MatchDetails({ opened, matchData }) {
    const [section, setSection] = useState(0);
    const titles = ['Estadísticas', 'Alineación', 'Resumen'];
    if (section === 3) setSection(0);
    if (section === -1) setSection(2);
    console.log(matchData)
    const eventStats = getEventStats(matchData);
    console.log(eventStats.narration)
    return (
        <div className={`matchdetails matchdetails__${opened}`}>
            <div className='matchdetails__header headerdetails'>
                <button className='headerdetails__left headerdetails__button' onClick={() => setSection(prevState => prevState - 1)}></button>
                <h2 className='headerdetails__title'>{titles[section]}</h2>
                <button className='headerdetails__right headerdetails__button' onClick={() => setSection(prevState => prevState + 1)}></button>
            </div>
            {section === 0 &&
                <div>OKZ</div>
            }
            <ul>
                {section === 2 && eventStats.narration.map(comment => (
                    <li className='matchdetails__narration' key={comment.id}><span>{comment.momentAction} - </span>{comment.commentary}</li>
                ))}
            </ul>
        </div>
    );
}

export { MatchDetails };