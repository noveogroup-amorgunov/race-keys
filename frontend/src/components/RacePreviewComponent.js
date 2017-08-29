import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

export default class RacePreviewComponent extends React.Component {
    static propTypes = {
        // type: PropTypes.string.isRequired,
        players: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        /* user: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired,
        */
        // createdAt: PropTypes.string.isRequired,
        onRouteChange: PropTypes.func.isRequired,
    };

    static PREVIEW_CONTENT_LENGTH = 300;

    render() {
        return (
            <div className='race'>
                <div className='race-header'>
                    <div className='race-title race-preview-title'>
                        {this.props.id}
                    </div>
                    <div className='no-padding'>
                        <div className='article-meta article-preview-meta text-ellipsis'>
                            {this.props.players.length}
                        </div>
                        <div className='article-meta article-preview-meta'>
                            {moment(this.props.createdAt).format('DD-MM-YYYY')}
                        </div>
                    </div>
                </div>
                <button
                    className='success'
                    onClick={this.props.onRouteChange.bind(null, this.props.id)} >
                    Enter
                </button>
            </div>
        );
    }
}
