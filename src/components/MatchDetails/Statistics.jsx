import React from 'react';
import uuid from 'react-uuid';
import { NAME_STATISTICS } from '../../services/constants';
import { getValuesOfStatistics } from '../../services/utilities';
uuid
const Statistics = ({ eventStats }) => {
    const HOME_STATISTICS = getValuesOfStatistics(eventStats.homeTeam.statsTeam);
    const AWAY_STATISTICS = getValuesOfStatistics(eventStats.awayTeam.statsTeam);
    return (
        <div className='matchdetails__stats matchstats'>
            <span className='matchstats__homename matchstats__name' style={{ color: eventStats.homeTeam.color, borderBottom: `1px solid ${eventStats.homeTeam.color}`  }}>{eventStats.homeTeam.name}</span>
            <span className='matchstats__awayname matchstats__name' style={{ color: eventStats.awayTeam.color, borderBottom: `1px solid ${eventStats.awayTeam.color}` }}>{eventStats.awayTeam.name}</span>
            <div className='matchstats__statistichome'>
                {HOME_STATISTICS.map((statistics, index) => (
                    <span className='matchstats__homevalue' key={uuid()}>{index === 3 ? statistics + '%' : statistics  }</span>
                ))}
            </div>
            <div className='matchstats__statisticname'>
                {NAME_STATISTICS.map(statistics => (
                    <span className='matchstats__namestat' key={uuid()}>{statistics}</span>
                ))}
            </div><div className='matchstats__statisticaway'>
                {AWAY_STATISTICS.map((statistics, index) => (
                    <span className='matchstats__awayvalue' key={uuid()}>{index === 3 ? statistics + '%' : statistics  }</span>
                ))}
            </div>
        </div>
    );
};

export { Statistics };