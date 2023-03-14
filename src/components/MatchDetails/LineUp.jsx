import React from 'react';
import field from '../../assets/field-image.svg';
import './MatchDetails.css';
import { Starting } from './Starting';
import { Substitutes } from './Substitutes';

function LineUp({ eventStats }) {
    console.log(eventStats.homeTeam.discipline)
    return (
        <div className='lineup'>
            <div className='lineup__subshome'>
                <span className='lineup__title'>Substitutos</span>
                {eventStats.homeTeam.substitutes.map(player => (
                    <Substitutes key={player.id} player={player} color={eventStats.homeTeam.color} colorTwo={eventStats.homeTeam.colorTwo} />
                ))}
            </div>
            <div className='lineup__field field'>
                <div className={`field__home field__home--${eventStats.homeTeam.formation}`}>
                    {eventStats.homeTeam.lineUp.map(player => (
                        <Starting key={player.id} player={player} color={eventStats.homeTeam.color} colorTwo={eventStats.homeTeam.colorTwo} team={'home'} />
                    ))}
                </div>
                <div className={`field__away field__away--${eventStats.awayTeam.formation}`}>
                    {eventStats.awayTeam.lineUp.map(player => (
                        <Starting key={player.id} player={player} color={eventStats.awayTeam.color} colorTwo={eventStats.awayTeam.colorTwo}  team={'away'}/>
                    ))}
                </div>
            </div>
            <div className='lineup__subsaway'>
                <span className='lineup__title'>Substitutos</span>
                {eventStats.awayTeam.substitutes.map(player => (
                    <Substitutes key={player.id} player={player} color={eventStats.awayTeam.color} colorTwo={eventStats.awayTeam.colorTwo} />
                ))}
            </div>
        </div>
    );
};

export { LineUp };