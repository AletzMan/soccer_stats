import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { MatchBetting } from "../../components/MatchBetting/MatchBetting";

function BettingPage({ calendar }) {
    const [classSelected, setClassSelected] = useState([true, false, false]);
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
    const PLAYERS = [
        {
            name: 'Marijo',
            results: ['L', 'E', 'V', 'E', 'L', 'V', 'L', 'E', 'L']
        },
        {
            name: 'Evelyn',
            results: ['E', 'V', 'L', 'L', 'V', 'E', 'E', 'V', 'V']
        },
    ]

    return (
        <div className='fixtures'>
            <Header classSelected={classSelected} setClassSelected={setClassSelected} calendar={calendar} names={names} />
            {classSelected[0] &&
                <>
                    {MATCHES_OF_THE_DAY.map(({ "event-metadata": key, "event-metadata": eventData, team }) => (
                        <MatchBetting key={key['event-key']} team={team} eventData={eventData} />
                    ))}

                    <label className="fixtures__label" htmlFor="name">Nombre:</label>
                    <input className="fixtures__input" name="name" placeholder="Maria"></input>
                    <button className="fixtures__send">Enviar</button>
                </>
            }
            {classSelected[1] &&
                <div className="fixtures__players players">
                    {PLAYERS.map((player)=> (
                        <div>{player.name}</div>
                    ))}
                </div>
            }
        </div>
    )
}

export { BettingPage };