import { MatchLive } from '../MatchLive/MatchLive';
import './Results.css';

function Results({ results }) {
    console.log(results)
    return (
        <div className='results'>
            {results.map(({ id, score, sportEvent }) => (
                <MatchLive key={id} score={score} sportEvent={sportEvent} />
            ))}
        </div>
    )
}

export { Results };

