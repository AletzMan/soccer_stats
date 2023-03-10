import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth, getUserInfo, registerNewUser, userExists } from '../services/firebase';

function AuthProvider({ children, userLoggedIn, userNotLoggedIn, userNotRegistered }) {

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid);
                if (isRegistered) {
                    const userInfo = await getUserInfo(user.uid);
                    if (userInfo.processCompleted) {
                        userLoggedIn(userInfo);
                    } else {
                        userNotRegistered(userInfo);
                    }
                } else {
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: user.photoURL,
                        username: '',
                        processCompleted: true

                    })
                    userNotRegistered(user);
                }
            } else {
                userNotLoggedIn();
                console.log('Not authentification')
            }
        });
    }, [userLoggedIn, userNotLoggedIn, userNotRegistered])
    return (
        <div>{children}</div>
    )
}

export { AuthProvider };