
import * as actionTypes from './actions/actTypes';

const initialState = {
    numPlayers: 2,
    maxScore: 5,
    teamOne: 'Awesome Possum!',
    teamTwo: 'Blue Lightning!',
    teamOneScore: 0,
    teamTwoScore: 0,
    promptAddScore: false
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

const countToFive = (state, action) => {
    return {
        ...state,
        promptAddScore: true 
    }
}

const addPoint = (state = initialState, action) => {
    const newScore = state.teamOneScore + 1;

    return {
        ...state,
        teamOneScore: newScore,
        promptAddScore: false
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.TEAM_ONE_NAME_CHANGE: return onTeamOneChanged(state, action);
        case actionTypes.TEAM_TWO_NAME_CHANGE: return onTeamTwoChanged(state, action);
        case actionTypes.COUNT_TO_FIVE: return countToFive(state, action);
        case actionTypes.ADD_POINT: return addPoint(state, action);
        default: return state;
    }
    
};

export default reducer;