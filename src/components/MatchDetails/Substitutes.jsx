import React from 'react';
import { Jersey } from '../../services/svgimages';

const Substitutes = ({ player, color, colorTwo }) => {
    return (
        <div className='substitutes'>
            <div className='substitutes__jersey' style={{ backgroundColor: color + '55' }}>
                <Jersey color={color} colorTwo={colorTwo} />
                <span className='substitutes__number'>{player.jerseyNumber}</span>
            </div>
            <span className='substitutes__name'>{player.name}</span>
            <span className='substitutes__position'>{player.playerPosition.name.toUpperCase()}</span>
        </div>
    );
};

export { Substitutes }; 