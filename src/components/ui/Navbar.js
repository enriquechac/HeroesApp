import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);

    const history = useHistory();
    // console.log(history);

    const handleLogout = () => {
        // console.log('Click!');
        history.replace('/login');
        dispatch({
            type: types.logout,
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                Asociaciones
            </Link>

            <div className="navbar-collapse collapse">
                <div className="navbar-nav">
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>

                <div className="ms-auto">
                    <ul className="navbar-nav">
                        <span className="nav-item nav-link text-info">
                            {user.name}
                        </span>
                        <button
                            className="btn nav-item nav-link"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
