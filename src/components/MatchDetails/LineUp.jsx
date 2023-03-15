import React from 'react';
import managerIcon from '../../assets/manager-icon.svg';
import './MatchDetails.css';
import { Starting } from './Starting';
import { Substitutes } from './Substitutes';

function LineUp({ eventStats }) {
    eventStats.homeTeam.substitutes.sort((a, b) => parseInt(a.jerseyNumber) - parseInt(b.jerseyNumber));
    eventStats.awayTeam.substitutes.sort((a, b) => parseInt(a.jerseyNumber) - parseInt(b.jerseyNumber));

    const optionPlayerHome = {
        team: 'home',
        statsPlayers: eventStats.homeTeam.statsPlayers,
        discipline: eventStats.homeTeam.discipline,
        color: eventStats.homeTeam.color,
        colorTwo: eventStats.homeTeam.colorTwo
    }
    const optionPlayerAway = {
        team: 'away',
        statsPlayers: eventStats.awayTeam.statsPlayers,
        discipline: eventStats.awayTeam.discipline,
        color: eventStats.awayTeam.color,
        colorTwo: eventStats.awayTeam.colorTwo
    }

    return (
        <div className='lineup'>
            <div className='lineup__subshome'>
                <span className='lineup__title'>Suplentes</span>
                {eventStats.homeTeam.substitutes.map(player => (
                    <Substitutes key={player.id} player={player} optionPlayer={optionPlayerHome} />
                ))}
            </div>
            <div className='lineup__field field'>
                <div className='field__manager manager manager__home'>
                    <img  className='manager__image manager__image--home' src={managerIcon} alt="image of manager" style={{ border: `2px solid ${eventStats.homeTeam.color}` }} />
                    <span className='manager__name'  style={{ borderBottom: `2px solid ${eventStats.homeTeam.color}` }}>{`DT ${eventStats.homeTeam.manager}`}</span>
                </div>
                <div className={`field__home field__home--${eventStats.homeTeam.formation}`}>
                    {eventStats.homeTeam.lineUp.map(player => (
                        <Starting key={player.id} player={player} optionPlayer={optionPlayerHome} />
                    ))}
                </div>
                <div className='field__manager manager manager__away'>
                    <img  className='manager__image manager__image--away' src={managerIcon} alt="image of manager"  style={{ border: `2px solid ${eventStats.awayTeam.color}` }}/>
                    <span className='manager__name'  style={{ borderBottom: `2px solid ${eventStats.awayTeam.color}` }}>{`DT ${eventStats.awayTeam.manager}`}</span>
                </div>
                <div className={`field__away field__away--${eventStats.awayTeam.formation}`}>
                    {eventStats.awayTeam.lineUp.map(player => (
                        <Starting key={player.id} player={player} optionPlayer={optionPlayerAway} />
                    ))}
                </div>
            </div>
            <div className='lineup__subsaway'>
                <span className='lineup__title'>Suplentes</span>
                {eventStats.awayTeam.substitutes.map(player => (
                    <Substitutes key={player.id} player={player} optionPlayer={optionPlayerAway} />
                ))}
            </div>
        </div>
    );
};

export { LineUp };