import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavBarComponent(props) {
    return (
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
    );
}

NavBarComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default NavBarComponent;
