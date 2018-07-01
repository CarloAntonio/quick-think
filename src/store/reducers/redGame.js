import * as actionTypes from '../actions/actTypes';
import { updateObjectInArray, addOneToObjectInArray, resetWithSameNames } from '../../utility/utility';

const initialState = {
    numPlayers: 2,
    maxScore: 5,
    teams: [
        {
            name: 'Average Joes',
            score: 0,
        },
        {
            name: 'Globo Gym',
            score: 0,
        },
    ],
    promptAddScore: false,
    hideQuestion: true,
    hideStartButton: false,
    questionNumber: 0,
    turn: 0,
    playing: false
}

const onTeamNameChanged = (state, action) => {
    return {
        ...state,
        teams: updateObjectInArray(
            state.teams, 
            action, 
            { name: action.newTeamName }
        )
    }
}

const addPoint = (state, action) => {

    let nextTurn = state.turn + 1;
    if(nextTurn >= state.teams.length) {
        nextTurn = 0;
    }

    return {
        ...state,
        teams: addOneToObjectInArray(
            state.teams, 
            action
        ),
        hideQuestion: true,
        promptAddScore: false,
        questionNumber: state.questionNumber + 1,
        hideStartButton: false,
        turn: nextTurn
    };
}

const noAddPoint = (state, action) => {

    //update to next team on the list
    let nextTurn = state.turn + 1;
    if (nextTurn === state.teams.length) {
        nextTurn = 0;
    }

    return {
        ...state,
        hideQuestion: true,
        promptAddScore: false,
        questionNumber: state.questionNumber + 1,
        hideStartButton: false,
        turn: nextTurn
    };
}

const hideStartButton = (state, action) => {
    return {
        ...state,
        hideStartButton: true,
        hideQuestion: false
    }
}

const promptScore = (state, action) => {
    return {
        ...state,
        promptAddScore: true,
    }
}

const newGame = (state, action) => {
    
    let oldNames = [];
    
    state.teams.map(team => {
        oldNames.push(team.name);
        return null;
    });

    return {
        ...state,
        teams: resetWithSameNames(
            state.teams, 
            action, 
            oldNames
        ),
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
        teams: [
            {
                name: 'Average Joes',
                score: 0,
            },
            {
                name: 'Globo Gym',
                score: 0,
            },
        ],
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

const startGame = (state, action) => {
    return {
        ...state,
        playing: true
    }
}

const quickStart = (state, action) => {
    return {
        ...state,
        maxScore: 10,
    }
}

const redGame = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.TEAM_NAME_CHANGE: return onTeamNameChanged(state, action);
        case actionTypes.HIDE_START_BUTTON: return hideStartButton(state, action);
        case actionTypes.CLOCK_FINISHED: return promptScore(state, action);
        case actionTypes.ADD_POINT: return addPoint(state, action);
        case actionTypes.NO_ADD_POINT: return noAddPoint(state, action);
        case actionTypes.NEW_GAME: return newGame(state, action);
        case actionTypes.START_OVER: return startOver(state, action);
        case actionTypes.MAX_SCORE_CHANGED: return maxScoreChanged(state, action);
        case actionTypes.START_GAME: return startGame(state, action);
        case actionTypes.QUICK_START: return quickStart(state, action);
        default: return state;
    }
    
};

export default redGame;