import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function NavBarComponent(props) {
    return (
        <header className="header">
            <div className="header__content">
                <Link to='/' className="header__logo" alt="Race keys"></Link>
                {props.isAuthenticated
                    ?
                    <div className="header__buttons">
                        <span>Hello, {props.user.login}!</span>
                        <NavLink className="button" onClick={props.onLogout} to='#'>Logout</NavLink>
                        <NavLink className="button" to='/race/new'>Create race</NavLink>
                    </div>
                    :
                    <div className="header__buttons">
                        <NavLink className="button" to='/login'>Login</NavLink>
                        <NavLink className="button" to='/signup'>Register</NavLink>
                    </div>}
            </div>
        </header>
    );
}

NavBarComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default NavBarComponent;

/*

<a href="#menu">
    <div id="b-menu" className="b-head__menu toggle-button" style={{ float: 'left' }}>
        <i></i>
    </div>
</a>


<header>
    <Link to='/'>Race keys</Link>

    {props.isAuthenticated &&
        <Link to='/race/new'>
            Create race
        </Link>}

    {props.isAuthenticated
        ?
        <span>
            Hello, {props.user.login}!
            <a href="#" onClick={props.onLogout}>
                Logout
            </a>
        </span>
        :
        <span>
            <Link to='/login'>
                Login
            </Link>
            <Link to='/signup'>
                Register
            </Link>
        </span>}
</header>
*/
