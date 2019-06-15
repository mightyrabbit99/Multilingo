import * as React from 'react';

export type ControlBarLocation = 'Main' | 'CardList';

export type ControlBarProps = {
    location: ControlBarLocation;
    color: string;
}

export const defaultControlBarProps : ControlBarProps = {
    location: 'Main',
    color: 'blue'
}

const ControlBar: React.SFC<ControlBarProps> = props => {
    if(props.location === 'Main') {
        
    }
    return (
        <div className='controlbar'>
            
        </div>
    )
}

export default ControlBar;