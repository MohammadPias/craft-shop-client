import { useEffect, useState } from 'react';
import initializeAuthentication from '../components/Login/firebase/firebase.init';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    deleteUser,
} from "firebase/auth";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logOutUser,
    setRole,

} from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { instance } from '../Api/ProductApi';
import { toast } from 'react-toastify';

initializeAuthentication();

const useFirebase = () => {
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    // Google Sign in===============================
    const handleGoogleSignIn = (navigate, destination) => {
        dispatch(loginRequest())
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                const getUser = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                }
                updateUser(getUser, 'PUT')
                dispatch(loginSuccess(getUser))
                navigate(destination)
            }).catch((error) => {
                dispatch(loginFailure(error.message))
            });
    };

    // Handle Email Password Registration========================
    const handleRegistration = (email, password, name, navigate, destination) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                const getUser = {
                    displayName: name,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                }
                // update profile==========
                const auth = getAuth();
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {

                }).catch((error) => {

                });
                updateUser(getUser, "POST");
                dispatch(loginSuccess(getUser))
                navigate(destination);
                console.log(navigate(destination))
                toast.success('Registration Successful')
            })
            .catch((error) => {
                dispatch(loginFailure(error.message))
            });
    };

    // handle Email Password Sign in==========

    const handleSignIn = (email, password, navigate, destination) => {
        dispatch(loginRequest())
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                dispatch(loginSuccess(user))
                navigate(destination)
            })
            .catch((error) => {
                dispatch(loginFailure(error.message))
            });
    };

    // update firebase profile
    const updateFirebaseProfile = (role) => {
        console.log(role)
        updateProfile(auth.currentUser, {
            role: role,
        }).then(() => {

        }).catch((error) => {

        });
    }


    // Handle Sign out===================================
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logOutUser())
        }).catch((error) => {
        })
    }

    // Delete user
    const handleUserDelete = () => {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }


    // Handle On Auth State change==========================
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user)
        });
    }, [])

    // update user to database=======================
    const updateUser = async (newUser, method) => {
        await instance({
            method: method,
            url: '/users',
            data: newUser
        }).then(res => console.log(res))
    };

    // check admin
    useEffect(() => {
        if (user?.email) {
            instance.get(`/checkAmin/${user.email}`)
                .then(res => {
                    console.log(res.data)
                    setAdmin(res.data?.admin)
                    if (res?.data?.admin) {
                        dispatch(setRole('admin'))
                    }
                    else {
                        dispatch(setRole('user'))
                    }
                })
        }
    }, [user?.email, dispatch])

    return {
        handleGoogleSignIn,
        handleSignOut,
        handleRegistration,
        handleSignIn,
        handleUserDelete,
        updateFirebaseProfile
    }
};

export default useFirebase;