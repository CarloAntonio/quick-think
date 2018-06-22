
import * as actionTypes from './actions/actTypes';

const initialState = {
    numPlayers: 2,
    maxScore: 5,
    teamOne: 'Awesome Possum!',
    teamTwo: 'Blue Lightning!',
    teamOneScore: 0,
    teamTwoScore: 0,
    promptAddScore: false,
    hideQuestion: true,
    hideStartButton: false
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

const hideStartButton = (state, action) => {
    return {
        ...state,
        hideStartButton: true
    }
}

const count = (state, action) => {
    return {
        ...state,
        promptAddScore: true,
        hideQuestion: false
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
        case actionTypes.HIDE_START_BUTTON: return hideStartButton(action, state);
        case actionTypes.COUNT_TO_FIVE: return count(state, action);
        case actionTypes.ADD_POINT: return addPoint(state, action);
        default: return state;
    }
    
};

export default reducer;