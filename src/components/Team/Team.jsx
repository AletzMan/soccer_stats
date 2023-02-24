import './Team.css'

function Team({ props }) {
    const { name, standing, images } = props;
    //console.log(imageUrlSizes.S)
    return(
        <div className="team">
            <span className="team__position">{standing.position}</span>
            <img  className="team__image" src={images.urlLogo[2]}></img>
            <span className="team__name">{name}</span>
            <span className="team__played">{standing.played}</span>
            <span className="team__won">{standing.won}</span>
            <span className="team__drawn">{standing.drawn}</span>
            <span className="team__lost">{standing.lost}</span>
            <span className="team__for">{standing.for}</span>
            <span className="team__against">{standing.against}</span>
            <span className="team__dif">{standing.for - standing.against}</span>
            <span className="team__points">{standing.points}</span>
        </div>
    )
}

export { Team }