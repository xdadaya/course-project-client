import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAdmin, checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";

const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const isAdmin = useSelector(checkIsAdmin)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const activeStyles = {
        color: 'black'
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Logged out')
        navigate('/')
    }

    return (
        <div className="flex py-4 justify-between items-center px-3">

            {isAdmin &&
                <NavLink to={'/admin-panel'}>
                    <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
                        A
                    </span>
                </NavLink>
            }
            {!isAdmin &&
                <span
                    className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'> U </span>
            }

            {isAuth &&
                <ul className="flex gap-20">
                    <li>
                        <NavLink to={'/'} href='/' className='text-s text-gray-400 hover:text-red-300'
                                 style={({isActive}) => isActive ? activeStyles : undefined}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/create-collection'} href='/' className='text-s text-gray-400 hover:text-red-300'
                                 style={({isActive}) => isActive ? activeStyles : undefined}>
                            Create collection
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/users-collections'} href='/' className='text-s text-gray-400 hover:text-red-300'
                                 style={({isActive}) => isActive ? activeStyles : undefined}>
                            My collections
                        </NavLink>
                    </li>
                </ul>
            }

            <div className="flex justify-center items-center bg-gray-600 text-s text-white rounded-sm px-4 py-2">
                {isAuth ? (
                    <button onClick={logoutHandler}>Log out</button>
                ) : (
                    <Link to={'/login'}>Log in</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;