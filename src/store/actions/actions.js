
import * as actionTypes from './actTypes';

export const teamNameChanged = (newTeamName, index) => {
    return {
        type: actionTypes.TEAM_NAME_CHANGE,
        newTeamName: newTeamName,
        index: index
    };
};

export const hideStartButton = () => {
    return {
        type: actionTypes.HIDE_START_BUTTON
    };
};

export const clockFinished = () => {
    return {
        type: actionTypes.CLOCK_FINISHED
    };
};

export const addPoint = (turn) => {
    return {
        type: actionTypes.ADD_POINT,
        turn: turn
    };
};

export const noAddPoint = (turn) => {
    return {
        type: actionTypes.NO_ADD_POINT,
        turn: turn
    }
}

export const playAgain = () => {
    return {
        type: actionTypes.PLAY_AGAIN
    }
}

export const startOver = () => {
    return {
        type: actionTypes.START_OVER
    }
}

export const maxScoreChanged = (maxScore) => {
    return {
        type: actionTypes.MAX_SCORE_CHANGED,
        maxScore: maxScore
    }
}