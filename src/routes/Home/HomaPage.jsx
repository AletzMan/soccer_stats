import './HomePage.css';
import logo from '../../assets/liga-mx-logo.png';
import logoAG from '../../assets/logo-large.svg';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return(
        <section className='home'>
            <img className='home__logo' src={logo} alt='logo liga mx'/>
            <NavLink className='home__button home__button--stats' to={'/stats'}>Estadísticas</NavLink>
            <NavLink className='home__button home__button--betting' to={'/betting'}>Quiniela</NavLink>
            <img className='home__logoag' src={logoAG} alt='logo alejandro garcia'/>
        </section>
    )
}

export { HomePage };