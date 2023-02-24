//https://api.unidadeditorial.es/sports/v1/classifications/current/?site=2&type=10&tournament=0168
import dataStats from '../../services/data.json';
import { Team } from '../Team/Team';

function StatsTable() {
    const TEAMS = dataStats.data[0].rank;
    console.log(TEAMS.length)
    return (
        <div className='stats'>
            {TEAMS.map(({ _id, name, standing, images }) => (
                //<p key={_id} className='stats__title'>{name}</p>
                <Team key={_id} props={{ name, standing, images }}/>
            ))}
        </div>
    )
}

export { StatsTable };