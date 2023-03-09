import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { MatchBetting } from "../../components/MatchBetting/MatchBetting";
import { MatchHeader } from "../../components/MatchHeader/MatchHeader";
import { Player } from "../../components/Player/Player";
import './BettingPage.css';

function BettingPage({ calendar }) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
    const [username, setUsername] = useState('');
    let lastMatches = 0;
    let matches = [];
    let currentDay = 0;
    const SOURCE_MATCHES = parseInt(calendar[0]['event-metadata']['event-metadata-soccer'].week);
    const names = ['QUINIELA', 'PARTICIPANTES', null];

    const FIND_MATCH = calendar.find((match, index) => {
        if (match['event-metadata']['event-metadata-soccer'].week === `${SOURCE_MATCHES}`) {
            lastMatches = index;
            currentDay = match['event-metadata']['event-metadata-soccer'].week;
            return match
        }
    })
    const MATCHES_OF_THE_DAY = calendar.filter(match => match['event-metadata']['event-metadata-soccer'].week === `${currentDay}`)

    for (let index = 0; index < lastMatches; index++) {
        matches.push(parseInt(calendar[index]['event-metadata']['event-metadata-soccer'].week))
    }
    const handleSend = () => {

    }
    const handleChangeInput = (e) => {
        setUsername(e.target.value);
    }
    const PLAYERS = [
        {
            id: 0,
            name: 'Marijo',
            results: ['L', 'E', 'V', 'E', 'L', 'V', 'L', 'E', 'L']
        },
        {
            id: 1,
            name: 'Evelyn',
            results: ['E', 'V', 'L', 'L', 'V', 'E', 'E', 'V', 'V']
        },
        {
            id: 2,
            name: 'Elizabeth',
            results: ['V', 'L', 'E', 'V', 'E', 'L', 'V', 'L', 'E']
        },
        {
            id: 3,
            name: 'Mariana',
            results: ['V', 'L', 'E', 'V', 'E', 'L', 'V', 'L', 'E']
        },
    ]

    return (
        <div className='bettingpage'>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} calendar={calendar} names={names} />
            {classSelected[0] &&
                <>
                    {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }) => (
                        <MatchBetting key={key['event-key']} team={team} eventData={eventData} />
                    ))}

                    <label className="bettingpage__label" htmlFor="name">Nombre:</label>
                    <input className="bettingpage__input" name="name" placeholder="Maria" value={username} onChange={handleChangeInput}></input>
                    <button className="bettingpage__send" onClick={handleSend}>Enviar</button>
                </>
            }
            {classSelected[1] &&
                <div className="bettingpage__players players">
                    <div className="players__space"></div>
                    <div className="players__header">
                        {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }) => (
                            <MatchHeader key={key['event-key']} team={team} eventData={eventData} />
                        ))}
                    </div>
                    {PLAYERS.map((player) => (
                        <Player key={player.id} name={player.name} results= {player.results}/>
                    ))}
                </div>
            }
        </div>
    )
}

export { BettingPage };