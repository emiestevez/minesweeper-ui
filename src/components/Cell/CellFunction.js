import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CellFunction(state, cellRevealHandler, flagPlantingHandler) {
    const { covered, flag, mine} = state.cell;

    if (covered) return (<button className='cell' onClick={cellRevealHandler} onContextMenu={flagPlantingHandler} />);

    if (flag) return (<button className='cell' onContextMenu={flagPlantingHandler}>
                        <FontAwesomeIcon icon={['far', 'flag']} />
                    </button>);

    if (mine) return (<button className='cell' onContextMenu={flagPlantingHandler}>
                            <FontAwesomeIcon icon={['fa', 'bomb']} />
                        </button>);

    return (<button className='cell cell__visible' />);
};

export default CellFunction;