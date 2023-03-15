import './Player.css';
import uuid from 'react-uuid';
import { getMatchWinner } from '../../services/utilities';

function Player({name, results, idBet, userID, calendar}) {

    //const details = getEventDetails(calendar);
    const data = getMatchWinner(calendar);
    return(
        <div  className="player">
            <span className={`player__name player__name--${idBet === userID}`}>{name}</span>
             {results?.map((result, index) => (
                <span className={`player__result result__${data && data[index] === result} player__result--${index} player__result--${idBet === userID}`} key={uuid()}>{result}</span>
            ))}
        </div>
    )
}

export { Player };