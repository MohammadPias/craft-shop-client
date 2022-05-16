import { useEffect } from 'react';
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
} from "firebase/auth";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logOutUser,
    makeAdmin,

} from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { instance } from '../Api/ProductApi';
import { toast } from 'react-toastify';

initializeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    // Google Sign in===============================
    const handleGoogleSignIn = (navigate, destination) => {
        dispatch(loginRequest())
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const getUser = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
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
                const getUser = {
                    displayName: name,
                    email: user.email,
                    photoURL: user.photoURL
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
                dispatch(loginSuccess(user))
                navigate(destination)
            })
            .catch((error) => {
                dispatch(loginFailure(error.message))
            });
    }


    // Handle Sign out===================================
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logOutUser())
        }).catch((error) => {
        })
    }


    // Handle On Auth State change==========================
    useEffect(() => {
        onAuthStateChanged(auth, user => {

        });
    }, [])

    // update user to database=======================
    const updateUser = async (newUser, method) => {
        await instance({
            method: method,
            url: '/users',
            data: newUser
        })
    };

    return {
        handleGoogleSignIn,
        handleSignOut,
        handleRegistration,
        handleSignIn,
    }
};

export default useFirebase;