import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backImage from '../../assets/backbutton.svg';
import './Header.css'

function Header({classSelected, setClassSelected, currentDay}) {
   
    
    const [title, setTitle] = useState(`JORNADA ${currentDay}`);
    return (
        <header className='header'>
            <NavLink to={'/'}>
                <img className='header__back' src={backImage}/>
            </NavLink>
            <nav className='header__nav nav'>
                <ul className="nav__menu menu">
                    <li className='menu__li'>
                        <button onClick={() => (setClassSelected([true, false, false]), setTitle(`JORNADA ${currentDay}`))} className={`menu__matchday menu__item menu__item--${classSelected[0]}`}>JORNADA</button>
                    </li>
                    <li className="menu__li">
                        <button onClick={() => (setClassSelected([false, true, false]), setTitle('RESULTADOS'))} className={`menu__allmatch menu__item menu__item--${classSelected[1]}`}>RESULTADOS</button>
                    </li>
                    <li className="menu__li">
                        <button onClick={() => (setClassSelected([false, false, true]), setTitle('POSICIONES'))} className={`menu__positions menu__item menu__item--${classSelected[2]}`}>POSICIONES</button>
                    </li>
                </ul>
            </nav>
            <h1 className='header__title'>{title}</h1>
        </header>
    )
}

export { Header }