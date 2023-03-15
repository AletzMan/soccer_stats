import React from 'react';
import { Jersey } from '../../services/svgimages';
import changeIcon from '../../assets/change-icon.svg';
import goalIcon from '../../assets/ball.png';

const Substitutes = ({ player, optionPlayer }) => {
    const { color, colorTwo, statsPlayers, discipline } = optionPlayer;
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
        <div className='substitutes'>
            <div className='substitutes__jersey' style={{ backgroundColor: color + '55' }}>
                <Jersey color={color} colorTwo={colorTwo} />
                <span className='substitutes__number'>{player.jerseyNumber}</span>
            </div>
            <span className='substitutes__name'>{player.name}</span>
            <span className='substitutes__position'>{player.playerPosition.name.toUpperCase()}</span>
            {(yellowCard || redCard) && <div className={`substitutes__card card__yellow--${yellowCard} card__red--${redCard}`}></div>}
            {isSubstitute && <img className='substitutes__change' src={changeIcon} alt='el jugador entro de cambio' />}
            {playerSocoredGoal.socored &&
                <>
                    <img className='substitutes__goal' src={goalIcon} alt='el jugador marco gol' />
                    {playerSocoredGoal.goals > 1 && <span className='substitutes__goals'><span className='substitutes__goals--number'>{playerSocoredGoal.goals}</span></span>}
                </>
            }
        </div>
    );
};

export { Substitutes }; 