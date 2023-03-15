import React from 'react';
import { Jersey } from '../../services/svgimages';
import changeIcon from '../../assets/change-icon.svg';
import goalIcon from '../../assets/ball.png';

const Starting = ({ player, optionPlayer }) => {
    const { statsPlayers, discipline, color, colorTwo, team } = optionPlayer;

    let yellowCard = false;
    let redCard = false;
    let isSubstitute = player.titular;
    let playerSocoredGoal = {
        socored: false,
        goals: 0
    };
    discipline.yellowCards.forEach(dis => {
        yellowCard = dis.playerId === player.id;
    })
    discipline.redCards.forEach(dis => {
        redCard = dis.playerId === player.id;
    })
    statsPlayers.forEach(play => {
        if (play.player.id === player.id) {
            playerSocoredGoal.socored = play.statsPlayer.goals > 0;
            playerSocoredGoal.goals = play.statsPlayer.goals;
        }
    })


    return (
        <div className={`starting  starting__${team}--${player.formationPlace}`} title={player.name + ' - ' + player.playerPosition.name.toUpperCase()}>
            <div className='starting__jersey' >
                <Jersey color={color} colorTwo={colorTwo} />
                <span className='starting__number'>{player.jerseyNumber}</span>
                {(yellowCard || redCard) && <div className={`starting__card card__yellow--${yellowCard} card__red--${redCard}`}></div>}
                {!isSubstitute && <img className='starting__change' src={changeIcon} alt='el jugador entro de cambio'></img>}
                {playerSocoredGoal.socored &&
                    <>
                        <img className='substitutes__goal' src={goalIcon} alt='el jugador marco gol' />
                        {playerSocoredGoal.goals > 1 && <span className='substitutes__goals'><span className='substitutes__goals--number'>{playerSocoredGoal.goals}</span></span>}
                    </>
                }
            </div>
                <span className={`starting__name starting__name--${team}`}>{player.name}</span>
        </div>
    );
};

export { Starting }; 