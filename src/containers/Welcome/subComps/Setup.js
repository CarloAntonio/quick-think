import React from 'react';

const setup = (props) => {
    return (
        <div>
            <h1>Teams</h1>
            <input type="text" placeholder="Team One Name"/>
            <hr/>
            <input type="text" placeholder="Team Two Name"/>
            <hr/>
            <button onClick={props.startGameHandler}>PLAY</button>
        </div>
    );
}

export default setup;