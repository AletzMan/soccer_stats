import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backImage from '../../assets/backbutton.svg';
import './Header.css'

function Header({ classSelected, setClassSelected, calendar, names, user }) {
    let currentDay = 0;
    const SOURCE_MATCHES = parseInt(calendar[0]['event-metadata']['event-metadata-soccer'].week);

    const FIND_MATCH = calendar?.find(match => {
        if (match['event-metadata']['event-metadata-soccer'].week === `${SOURCE_MATCHES}`) {
            currentDay = match['event-metadata']['event-metadata-soccer'].week;
            return match
        }
    })

    console.log(user?.profilePicture);
    const [title, setTitle] = useState(`JORNADA ${currentDay}`);
    return (
        <header className='header'>
            <NavLink className='header__navlink' to={'/'}>
                <img className='header__back' src={backImage} />
            </NavLink>
            {user && <div className='header__userinfo userinfo'>
                <span className='userinfo__name'>{user?.displayName}</span>
                <img className='userinfo__photo' src={user?.profilePicture} alt={`profile photo of ${user?.displayName}`} />
            </div>}
            <nav className='header__nav nav'>
                <ul className="nav__menu menu">
                    {names[0] && <li className='menu__li'>
                        <button onClick={() => (setClassSelected([true, false, false]), setTitle(`JORNADA ${currentDay}`))} className={`menu__matchday menu__item menu__item--${classSelected[0]}`}>{names[0]}</button>
                    </li>}
                    {names[1] && <li className="menu__li">
                        <button onClick={() => (setClassSelected([false, true, false]), setTitle(names[1]))} className={`menu__allmatch menu__item menu__item--${classSelected[1]}`}>{names[1]}</button>
                    </li>}
                    {names[2] && <li className="menu__li">
                        <button onClick={() => (setClassSelected([false, false, true]), setTitle(names[2]))} className={`menu__positions menu__item menu__item--${classSelected[2]}`}>{names[2]}</button>
                    </li>}
                </ul>
            </nav>
            <h1 className='header__title'>{title}</h1>
        </header>
    )
}

export { Header }