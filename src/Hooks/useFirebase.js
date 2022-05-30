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
    deleteUser,
} from "firebase/auth";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logOutUser,

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
                console.log(user)
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
                dispatch(loginSuccess(user))
                navigate(destination)
            })
            .catch((error) => {
                dispatch(loginFailure(error.message))
            });
    };

    // update Profile

    const updateUserProfile = () => {
        updateProfile(auth.currentUser, {
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
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

    return {
        handleGoogleSignIn,
        handleSignOut,
        handleRegistration,
        handleSignIn,
        handleUserDelete,
        updateUserProfile,
    }
};

export default useFirebase;