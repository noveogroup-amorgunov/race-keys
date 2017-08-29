import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import locale from '@/locale';

export default class LoginComponent extends React.Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        errorCode: PropTypes.string,
        isAuthenticated: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: props.errorCode ? locale.errors[props.errorCode] : null,
            form: {
                username: '',
                password: '',
            }
        };
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errorMessage: nextProps.errorCode ? locale.errors[nextProps.errorCode] : null
        });
    }

    _handleInputChange(type, e) {
        this.setState({
            error: null,
            form: {
                ...this.state.form,
                [type]: e.target.value.trim()
            }
        });
    }
    _handleFormSubmit(e) {
        e.preventDefault();
        const { form } = this.state;
        for (const key in form) {
            if (form.hasOwnProperty(key) && !form[key]) {
                return this.setState({
                    errorMessage: locale.errors.EMPTY_FIELDS
                });
            }
        }

        return this.props.login({
            login: form.username,
            password: form.password
        });
    }
    render() {
        const { errorMessage, form } = this.state;
        if (this.props.isAuthenticated) {
            return <Redirect to='/'/>;
        }
        return (
            <form
                onSubmit={this._handleFormSubmit} >
                <input
                    type='text'
                    placeholder='Enter username'
                    value={form.username}
                    onChange={this._handleInputChange.bind(this, 'username')}
                />
                <input
                    type='password'
                    placeholder='Enter password'
                    value={form.password}
                    onChange={this._handleInputChange.bind(this, 'password')}
                />
                {errorMessage && <div className="danger">
                    {errorMessage}
                </div>}
                <button className='button' type='submit'>
                    Login
                </button>
                <div className='form-link-message'>
                    <Link to='/signup'>Register</Link> if you don't have an account yet
                </div>
            </form>
        );
    }
}
