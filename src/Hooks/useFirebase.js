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
    getIdToken,
    updatePassword,
} from "firebase/auth";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logOutUser,
    setRole,
    setIdToken,
    updateUserImage,
    checkAdmin,

} from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { instance } from '../Api/ProductApi';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

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
                navigate(destination, { replace: true })
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
                navigate(destination, { replace: true });
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
                navigate(destination, { replace: true })
            })
            .catch((error) => {
                dispatch(loginFailure(error.message))
            });
    };

    // update firebase profile
    const updateFirebaseProfile = (form) => {
        console.log(form)
        updateProfile(auth.currentUser, {
            ...form
        }).then(() => {
            toast.success('Your profile has been updated successfully.')
        }).catch((error) => {

        });
    }
    // console.log(auth.currentUser)

    // update Password
    const handleUpdatePassword = (password) => {
        console.log(password)
        const user = auth.currentUser;
        // const newPassword = getASecureRandomPassword();

        updatePassword(user, password).then(() => {
            // Update successful.
            toast.success('Password has been changed successfully.')
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }


    // Handle Sign out===================================
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logOutUser())
            Cookies.remove("idToken")
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
            if (user?.email) {
                instance.get(`/users/find?email=${user?.email}`)
                    .then(res => {
                        if (res?.data?.photoURL) {
                            dispatch(updateUserImage(res?.data?.photoURL))
                        }
                    })

                getIdToken(user)
                    .then(idToken => {
                        // dispatch(setIdToken(idToken))
                        Cookies.set("idToken", idToken)
                    })
                setUser(user)

                dispatch(loginSuccess(user))
            }
        });
    }, [dispatch, auth])

    // update user to database=======================
    const updateUser = async (newUser, method) => {
        await instance({
            method: method,
            url: '/users',
            data: newUser
        }).then(res => {

        })
    };

    // check admin
    useEffect(() => {
        if (user?.email) {
            dispatch(checkAdmin(user?.email))
        }
    }, [user?.email, dispatch])

    return {
        user,
        handleGoogleSignIn,
        handleSignOut,
        handleRegistration,
        handleSignIn,
        handleUserDelete,
        updateFirebaseProfile,
        handleUpdatePassword,
    }
};

export default useFirebase;