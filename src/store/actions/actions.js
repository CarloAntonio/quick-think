
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