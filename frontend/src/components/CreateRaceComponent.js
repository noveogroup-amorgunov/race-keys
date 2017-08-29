import PropTypes from 'prop-types';
import React from 'react';

export default class CreateRaceComponent extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            form: {
                id: props.id || '',
            }
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({});
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit} >
                <button className='button' type='submit'>
                    Add new race
                </button>
            </form>
        );
    }
}
