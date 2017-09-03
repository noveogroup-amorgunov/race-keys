import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import locale from '../locale';
import CarComponent from '@/components/CarComponent';

export default class RegisterComponent extends React.Component {
    static propTypes = {
        register: PropTypes.func.isRequired,
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
                confirmPassword: '',
                car: null,
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errorMessage: nextProps.errorCode ? locale.errors[nextProps.errorCode] : null
        });
    }

    changeCar(event) {
        console.log(event.currentTarget.dataset.index);
        event.preventDefault();
        this.setState({
            form: {
                ...this.state.form,
                car: event.currentTarget.dataset.index,
            }
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

    _handleFormSubmit = (e) => {
        e.preventDefault();
        const { form } = this.state;

        for (const key in form) {
            if (form.hasOwnProperty(key) && !form[key]) {
                return this.setState({
                    errorMessage: locale.errors.EMPTY_FIELDS
                });
            }
        }
        if (form.password !== form.confirmPassword) {
            return this.setState({
                errorMessage: locale.errors.CONFIRM_PASSWORD_ERROR
            });
        }
        return this.props.register({
            login: form.username,
            password: form.password
        }, form.car);
    }

    render() {
        const { errorMessage, form } = this.state;
        if (this.props.isAuthenticated) {
            return <Redirect to='/'/>;
        }

        // TODO: load cars for backend
        const cars = [...Array(10).keys()].map(i => i + 1);
        const carClasses = 'car-list-item car-wrapper';
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
                <input
                    type='password'
                    placeholder='Confirm password'
                    value={form.confirmPassword}
                    onChange={this._handleInputChange.bind(this, 'confirmPassword')}
                />

                <div className="car-list">
                    Select car from list:
                    <br/><br/>
                    {cars.map(carModel => (
                        <div
                            onClick={::this.changeCar}
                            data-index={carModel}
                            key={carModel}
                            className={+carModel === +form.car ? `${carClasses} active` : carClasses}>
                            <CarComponent model={carModel} />
                        </div>
                    ))}
                </div>
                <hr className='light' />

                {errorMessage && <div className="danger">
                    {errorMessage}
                </div>}
                <button className='button' type='submit'>
                    Register
                </button>
                <div className='form-link-message'>
                    <Link to='/login'>Login</Link> if you already have an account
                </div>
            </form>
        );
    }
}
