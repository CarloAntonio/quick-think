
import * as actionTypes from './actTypes';

export const teamOneNameChanged = (teamOneName) => {
    return {
        type: actionTypes.TEAM_ONE_NAME_CHANGE,
        teamOneName: teamOneName
    };
};

export const teamTwoNameChanged = (teamTwoName) => {
    return {
        type: actionTypes.TEAM_TWO_NAME_CHANGE,
        teamTwoName: teamTwoName
    };
};

const hideStartButton = () => {
    return {
        type: actionTypes.HIDE_START_BUTTON
    };
};

const countToFive = () => {
    return {
        type: actionTypes.COUNT_TO_FIVE
    };
};

export const startTimer = () => {
    return dispatch => {
        //first hide start button
        dispatch(hideStartButton());

        //then start count
        setTimeout(() => {
            dispatch(countToFive());
        }, 500);
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