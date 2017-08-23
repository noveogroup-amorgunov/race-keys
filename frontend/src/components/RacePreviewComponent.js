import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class RoomPreviewComponent extends React.Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        players: PropTypes.array.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        onRouteChange: PropTypes.func.isRequired,
    };

    static PREVIEW_CONTENT_LENGTH = 300;

    render() {
        return (
            <div className='race'>
                <div className='race-header'>
                    <div className='no-padding race-title race-preview-title text-ellipsis'>
                        {this.props.title}
                    </div>
                    <div className='no-padding'>
                        <div className='article-meta article-preview-meta text-ellipsis'>
                            {this.props.user.username}
                        </div>
                        <div className='article-meta article-preview-meta'>
                            {moment(this.props.created_at).format('DD-MM-YYYY')}
                        </div>
                    </div>
                </div>
                <div className='race-body'></div>
                <button
                    className='success'
                    onClick={this.props.onRouteChange.bind(null, this.props.title, this.props.id)} >
                    Read more
                </button>
            </div>
        );
    }
}
