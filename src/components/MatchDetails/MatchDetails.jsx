import React, { useState } from 'react';
import { getEventStats } from '../../services/utilities';
import './MatchDetails.css';
import { Commentary } from './Commentary';
import { Statistics } from './Statistics';
import { LineUp } from './LineUp';

function MatchDetails({ opened, matchData }) {
    console.log(matchData)
    const [section, setSection] = useState(0);
    const titles = ['Estadísticas', 'Alineación', 'Acciones'];
    if (section === 3) setSection(0);
    if (section === -1) setSection(2);
    const eventStats = getEventStats(matchData);
    return (
        <div className={`matchdetails matchdetails__${opened}`}>
            <div className='matchdetails__header headerdetails'>
                <button className='headerdetails__left headerdetails__button' onClick={() => setSection(prevState => prevState - 1)}></button>
                <h2 className='headerdetails__title'>{titles[section]}</h2>
                <button className='headerdetails__right headerdetails__button' onClick={() => setSection(prevState => prevState + 1)}></button>
            </div>
            {section === 0 &&
                <Statistics eventStats={eventStats} />
            }
            {section === 1 &&
                <LineUp  eventStats={eventStats} />
            }
            {section === 2 &&
                <ul className='matchdetails__list'>
                    {eventStats.narration.map(comment => (
                        <Commentary key={comment.id} comment={comment} />
                    ))}
                </ul>
            }
        </div>
    );
}

export { MatchDetails };