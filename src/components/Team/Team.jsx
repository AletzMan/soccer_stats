import './Team.css'

function Team({ props }) {
    const { name, standing, images } = props;
    const team = name.split(' ');

    let nameTeam = '';
    if (team.length === 3) {
        nameTeam = team[1] + ' ' + team[2];
    } else if (team.length === 2 && team[0].startsWith('C')) {
        nameTeam = team[0] + ' ' + team[1];
    } else {
        nameTeam = team[0];
    }

    return (
        <div className="team">
            <span className="team__position team__unit">{standing.position}</span>
            <img className="team__image team__unit" src={images.urlLogo[2]}></img>
            <span className="team__name team__unit team__unit">{nameTeam}</span>
        </div>
    )
}

export { Team }