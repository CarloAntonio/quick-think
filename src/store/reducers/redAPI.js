
import * as actionTypes from '../actions/actTypes';

const initialState = {
    questions: [],
    questionsLoading: false
}

// Firebase API Calls
const onFetchQuestionsSuccess = (state, action) => {
    return {
        ...state,
        questions: action.questions,
        questionsLoading: false,
    }
}

const onFetchQuestionsStart = (state, action) => {
    return {
        ...state,
        questionsLoading: true,
    }
}

const onFetchQuestionsFail = (state, action) => {
    return {
        ...state,
        questionsLoading: false,
    }
}

const redAPI = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.FETCH_QUESTIONS_START: return onFetchQuestionsStart(state, action);
        case actionTypes.FETCH_QUESTIONS_FAIL: return onFetchQuestionsFail(state, action);
        case actionTypes.FETCH_QUESTIONS_SUCCESS: return onFetchQuestionsSuccess(state, action);
        default: return state;
    }
    
};

export default redAPI