import * as actionTypes from './actTypes';

import { axiosInstance } from '../../utility/utility';

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

export const skipUsed = () => {
    return {
        type: actionTypes.SKIPPED_USED
    }
}

export const newGame = () => {
    return {
        type: actionTypes.NEW_GAME
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

export const startGame = () => {
    return {
        type: actionTypes.START_GAME
    }
}

export const quickStart = () => {
    return {
        type: actionTypes.QUICK_START
    }
}

const submitQuestionFeedbackStart = () => {
    return {
        type: actionTypes.SUBMIT_QUESTION_FEEDBACK_START
    };
};

const submitQuestionFeedbackSuccess = () => {
    return {
        type: actionTypes.SUBMIT_QUESTION_FEEDBACK_SUCCESS,
    };
};

const submitQuestionFeedbackFail = (error) => {
    return {
        type: actionTypes.SUBMIT_QUESTION_FEEDBACK_FAIL,
        error: error
    };
};

export const handleFeedback = (token, bundle) => {
    return dispatch => {
        dispatch(submitQuestionFeedbackStart());
        axiosInstance.put('questions/' + bundle.questionId + '/' + bundle.type + '.json?auth=' + token, bundle.newValue)
            .then(res => {
                dispatch(submitQuestionFeedbackSuccess())
            })
            .catch(err => {
                dispatch(submitQuestionFeedbackFail(err))
            })
    }
}