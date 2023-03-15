import './HomePage.css';
import logo from '../../assets/liga-mx-logo.png';
import logoAG from '../../assets/logo-large.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthProvider } from '../../components/authProvider';
import { auth, getAllBets, logout } from '../../services/firebase';
import { Loading } from '../../components/Loading/Loading';

function HomePage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);
    const [bets, setBets] = useState([]);


    useEffect(()=> {
        getDataBets();

        async function getDataBets(){
            const groupBets = await getAllBets();
            if(groupBets?.length > 0) {
                setBets(groupBets);
            }
            console.log(bets);
        }
    },[])

    /*
   0: Inicializando
   1: loading
   2: login completo
   3: login sin registro
   4: no login
   5: username exists
   */
    const handleLogin = () => {
        setLoginState(1);
        const googleProvider = new GoogleAuthProvider;
        signWithGoogle(googleProvider);
    }
    const signWithGoogle = async (googleProvider) => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error)
        }
    }
    const handleLogOut = async () => {
        await logout();
        setLoginState(4);
    }

    const handleUserLoggedIn = (user) => {
        setCurrentUser(user);
        setLoginState(2);
        navigate('/');
    }
    const handleNotLoggedIn = (user) => {
        setLoginState(4);
    }
    const handleNotRegistered = () => {
        setLoginState(3);
        navigate('/');
    }
    const goToStats = () => {
        navigate('stats', { state: currentUser });
    }
    const goToBetting = () => {
        navigate('betting', { state: {userInfo: currentUser, bets: bets }});
    }


    if (stateLogin > 1) {
        return (
            <section className='home'>
                <img className='home__logo' src={logo} alt='logo liga mx' />
                <span className='home__greetings'>Bienvenido <span className='home__name'>{currentUser?.displayName}</span></span>
                {stateLogin === 2 &&
                    <>
                        <button className='home__button home__button--stats' onClick={goToStats}> Ver Estadísticas</button>
                        <button className='home__button home__button--betting' onClick={goToBetting}>Llenar Quiniela</button>
                        <button className='home__button home__logout' onClick={handleLogOut}>Cerrar sesión</button>
                    </>
                }
                {stateLogin === 4 &&
                    <>
                        <span className='home__labellogin'>Inicia sesión para rellenar y enviar tu quiniela</span>
                        <button className='home__button home__login' onClick={handleLogin}>Iniciar sesión con google</button>
                    </>
                }
                <img className='home__logoag' src={logoAG} alt='logo alejandro garcia' />
            </section>
        );
    }
    return (
        <AuthProvider
            userLoggedIn={handleUserLoggedIn}
            userNotLoggedIn={handleNotLoggedIn}
            userNotRegistered={handleNotRegistered}
        >
            {<Loading/>}
        </AuthProvider>

    );
}

export { HomePage };