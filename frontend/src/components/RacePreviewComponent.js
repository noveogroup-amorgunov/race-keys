import TimeAgo from 'timeago-react';
import PropTypes from 'prop-types';
import React from 'react';

import { gameStatuses } from '@/constants';
import locale from '@/locale';

export default class RacePreviewComponent extends React.Component {
    static propTypes = {
        players: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        /* user: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired,
        */
        createdAt: PropTypes.string.isRequired,
        onRouteChange: PropTypes.func.isRequired,
    };

    render() {
        const { id, status, players, createdAt } = this.props;
        const statusCode = Object.keys(gameStatuses).find(key => gameStatuses[key] === status);
        return (
            <div className={status === gameStatuses.IN_PROCESS ? 'race-preview race-preview-in-process' : 'race-preview' }>
                <div className='race-header'>
                    <div className='race-title race-preview-title'>
                        {id}
                    </div>
                    <div className='no-padding'>
                        <div className='race-meta race-preview-meta text-ellipsis'>
                            Players: <strong>{players.length}</strong><br />
                            Status: {locale.gameStatuses[statusCode]}
                        </div>
                        <div className='race-meta race-preview-meta'>
                            <TimeAgo datetime={createdAt} />
                        </div>
                    </div>
                </div>
                <button
                    className='button'
                    onClick={this.props.onRouteChange.bind(null, this.props.id)} >
                    {status === gameStatuses.IN_PROCESS ? 'Return to race' : 'Enter' }
                </button>
            </div>
        );
    }
}
