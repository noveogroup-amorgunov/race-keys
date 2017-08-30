import React from 'react';
import PropTypes from 'prop-types';
import locale from '@/locale';
import { Errors } from '@/constants';

import RacePreviewComponent from './RacePreviewComponent';

function RacesComponent(props) {
    if (!props.races.length) {
        return (<div>{locale.errors[Errors.RACES_NOT_EXISTS]}</div>);
    }

    return (
        <div>
            {props.races.map(race =>
                (<RacePreviewComponent id={race.id} key={race.id} onRouteChange={props.onRouteChange} {...race} />)
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
