import './Player.css';
import uuid from 'react-uuid';

function Player({name, results}) {
    return(
        <div  className="player">
            <span className='player__name'>{name}</span>
            {results.map(result => (
                <span className='player__result' key={uuid()}>{result}</span>
            ))}
        </div>
    )
}

export { Player };