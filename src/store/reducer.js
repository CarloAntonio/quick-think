
import * as actionTypes from './actions/actTypes';

const initialState = {
    numPlayers: 2,
    maxScore: 2,
    teamOneName: 'Awesome Possum!',
    teamTwoName: 'Blue Lightning!',
    teamOneScore: 0,
    teamTwoScore: 0,
    promptAddScore: false,
    hideQuestion: true,
    hideStartButton: false,
    questionNumber: 0,
    turn: 0
}

const onTeamOneChanged = (state, action) => {
    return {
        ...state,
        teamOneName: action.teamOneName
    }
}

const onTeamTwoChanged = (state, action) => {
    return {
        ...state,
        teamTwoName: action.teamTwoName
    }
}

const hideStartButton = (state, action) => {
    return {
        ...state,
        hideStartButton: true,
        hideQuestion: false
    }
}

const count = (state, action) => {
    return {
        ...state,
        promptAddScore: true,
    }
}

const addPoint = (state, action) => {
    let returnObject = {};

    if(action.turn === 0) {
        returnObject = {
            ...state,
            hideQuestion: true,
            teamOneScore: state.teamOneScore + 1,
            promptAddScore: false,
            questionNumber: state.questionNumber + 1,
            hideStartButton: false,
            turn: 1
        }
    } else {
        returnObject = {
            ...state,
            hideQuestion: true,
            teamTwoScore: state.teamTwoScore + 1,
            promptAddScore: false,
            questionNumber: state.questionNumber + 1,
            hideStartButton: false,
            turn: 0
        }
    }

    return returnObject;
}

const noAddPoint = (state, action) => {
    let returnObject = {};

    if(action.turn === 0) {
        returnObject = {
            ...state,
            hideQuestion: true,
            promptAddScore: false,
            questionNumber: state.questionNumber + 1,
            hideStartButton: false,
            turn: 1
        }
    } else {
        returnObject = {
            ...state,
            hideQuestion: true,
            promptAddScore: false,
            questionNumber: state.questionNumber + 1,
            hideStartButton: false,
            turn: 0
        }
    }

    return returnObject;
}

const playAgain = (state, action) => {
    return {
        ...state,
        teamOneScore: 0,
        teamTwoScore: 0,
        promptAddScore: false,
        hideQuestion: true,
        hideStartButton: false,
        questionNumber: 0,
        turn: 0
    }
}

const startOver = (state, action) => {
    return {
        numPlayers: 2,
        maxScore: 5,
        teamOneName: 'Awesome Possum!',
        teamTwoName: 'Blue Lightning!',
        teamOneScore: 0,
        teamTwoScore: 0,
        promptAddScore: false,
        hideQuestion: true,
        hideStartButton: false,
        questionNumber: 0,
        turn: 0
    }
}

const maxScoreChanged = (state, action) => {
    return {
        ...state,
        maxScore: action.maxScore
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.TEAM_ONE_NAME_CHANGE: return onTeamOneChanged(state, action);
        case actionTypes.TEAM_TWO_NAME_CHANGE: return onTeamTwoChanged(state, action);
        case actionTypes.HIDE_START_BUTTON: return hideStartButton(state, action);
        case actionTypes.COUNT_TO_FIVE: return count(state, action);
        case actionTypes.ADD_POINT: return addPoint(state, action);
        case actionTypes.NO_ADD_POINT: return noAddPoint(state, action);
        case actionTypes.PLAY_AGAIN: return playAgain(state, action);
        case actionTypes.START_OVER: return startOver(state, action);
        case actionTypes.MAX_SCORE_CHANGED: return maxScoreChanged(state, action);
        default: return state;
    }
    
};

export default reducer;