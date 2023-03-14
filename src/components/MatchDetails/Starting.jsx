import React from 'react';
import { Jersey } from '../../services/svgimages';

const Starting = ({ player, color, colorTwo, team}) => {
    return (
        <div className={`starting  starting__${team}--${player.formationPlace}`}  title={player.name + ' - ' + player.playerPosition.name.toUpperCase()}>
            <div className='starting__jersey' >
                <Jersey color={color} colorTwo={colorTwo} />
                <span className='starting__number'>{player.jerseyNumber}</span>
            </div>
            <span className={`starting__name starting__name--${team}`}>{player.name}</span>
        </div>
    );
};

export { Starting }; 