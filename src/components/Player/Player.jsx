import './Player.css';
import uuid from 'react-uuid';

function Player({name, results, idBet, userID}) {
    return(
        <div  className="player">
            <span className={`player__name player__name--${idBet === userID}`}>{name}</span>
            {results.map((result, index) => (
                <span className={`player__result player__result--${index} player__result--${idBet === userID}`} key={uuid()}>{result}</span>
            ))}
        </div>
    )
}

export { Player };