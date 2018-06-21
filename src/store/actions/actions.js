
import * as actionTypes from './actTypes';

export const teamOneNameChanged = (teamOneName) => {
    return {
        type: actionTypes.TEAM_ONE_NAME_CHANGE,
        teamOneName: teamOneName
    }
}

export const teamTwoNameChanged = (teamTwoName) => {
    return {
        type: actionTypes.TEAM_TWO_NAME_CHANGE,
        teamTwoName: teamTwoName
    }
}

const countToFive = () => {
    return {
        type: actionTypes.COUNT_TO_FIVE
    }
}

export const startTimer = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(countToFive);
        }, 5000);
    };
}

export const addPoint = () => {
    return {
        type: actionTypes.ADD_POINT
    }
}