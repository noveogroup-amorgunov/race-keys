import React from 'react';
import PropTypes from 'prop-types';
import RacePreviewComponent from './RacePreviewComponent';

function RacesComponent(props) {
    // const { pageCount, offset, limit, rowCount } = props.pagination;
    return (
        <div>
            {props.races.map(races =>
                (<RacePreviewComponent key={races.id} onRouteChange={props.onRouteChange} {...races} />)
            )}

            {/* rowCount > limit &&
                <Pagination
                    bsSize="small"
                    items={pageCount}
                    activePage={(offset / limit) + 1}
                    onSelect={props.onPageChange}/>
            */}
        </div>
    );
}

RacesComponent.propTypes = {
    races: PropTypes.array.isRequired,
    // pagination: PropTypes.object.isRequired,
    onRouteChange: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default RacesComponent;
