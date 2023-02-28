import './Stats.css'

function Stats({ props }) {
    const { standing } = props;
   

    return (
            <div className="stats">
                <span className="stats__played team__unit">{standing.played}</span>
                <span className="stats__won team__unit">{standing.won}</span>
                <span className="stats__drawn team__unit">{standing.drawn}</span>
                <span className="stats__lost team__unit">{standing.lost}</span>
                <span className="stats__points team__unit">{standing.points}</span>
                <span className="stats__for team__unit">{standing.for}</span>
                <span className="stats__against team__unit">{standing.against}</span>
                <span className="stats__dif team__unit">{standing.for - standing.against}</span>
            </div>
    )
}

export { Stats }