import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';

class Game extends Component {

    state = {
        gameOver: true
    }

    render() {

        let game = (
            <h1>Game...</h1>
        );

        return (
            <Aux>
                <Modal show={this.state.gameOver} closeModalFx={null}>
                    <h1>You Win!</h1>
                </Modal>
                {game}
            </Aux>
        );
    }
}

export default Game;