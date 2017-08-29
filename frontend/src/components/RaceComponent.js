import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

export default class RaceComponent extends React.Component {
    static propTypes = {
        race: PropTypes.object.isRequired,
        readyToPlay: PropTypes.func.isRequired
    };

    render() {
        console.log(this.props.race);
        return (
            <div className='race'>
                GAME
            </div>
        );
    }
}
