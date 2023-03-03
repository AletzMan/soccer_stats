import './HomePage.css';
import logo from '../../assets/liga-mx-logo.png';
import backImage from '../../assets/back.webp';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return(
        <section className='home'>
            <img className='home__logo' src={logo} alt='logo liga mx'/>
            <NavLink className='home__button home__button--stats' to={'/stats'}>Estadísticas</NavLink>
            <NavLink className='home__button home__button--betting' to={'/stats'}>Quiniela</NavLink>
        </section>
    )
}

export { HomePage };