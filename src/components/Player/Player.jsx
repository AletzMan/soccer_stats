import './Player.css';
import uuid from 'react-uuid';

function Player({name, results}) {
    return(
        <div  className="player">
            <span className='player__name'>{name}</span>
            {results.map((result, index) => (
                <span className={`player__result player__result--${index}`} key={uuid()}>{result}</span>
            ))}
        </div>
    )
}

export { Player };