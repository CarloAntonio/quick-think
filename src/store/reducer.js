
import * as actionTypes from './actions/actTypes';

const initialState = {
    numPlayers: 2,
    maxScore: 10,
    teamOne: 'Awesome Possum!',
    teamTwo: 'Blue Lightning!'
}

const onTeamOneChanged = (state, action) => {
    return {
        ...state,
        teamOne: action.teamOneName
    }
}

const onTeamTwoChanged = (state, action) => {
    return {
        ...state,
        teamTwo: action.teamTwoName
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.TEAM_ONE_NAME_CHANGE: return onTeamOneChanged(state, action);
        case actionTypes.TEAM_TWO_NAME_CHANGE: return onTeamTwoChanged(state, action);
        default: return state;
    }
    
};

export default reducer;