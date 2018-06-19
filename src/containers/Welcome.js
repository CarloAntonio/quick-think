import React, { Component } from 'react';

import Aux from '../hoc/Aux';
import Modal from '../components/UI/Modal/Modal';

class Welcome extends Component {
    
    state = {
        start: true
    }

    startCancelHandler = () => {
        this.setState({ start: false });
    }

    render() {

        let intro = (
            <div>
                <h1>Hello, welcome to Quick Think!</h1>
                <h2>How To Play</h2>
                <p>Intructions: ipsum lorem</p>
                <button>START</button>
            </div>
        );

        return (
            <Aux>
                <Modal show={this.state.start} closeModalFx={this.startCancelHandler}>
                    <h1>Number of Teams</h1>
                </Modal>
                {intro}
            </Aux>
        );
    }
}

export default Welcome;