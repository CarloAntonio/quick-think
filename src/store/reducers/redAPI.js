
import * as actionTypes from '../actions/actTypes';

const initialState = {
    questions: [],
    questionsLoading: false,
    questionForm: {
        question: {
            label: 'Question:',
            value: 'Name 3 '
        },
        author: {
            label: 'Author:',
            value: 'Anonymous'
        },
    },
    submitting: false,
    submitted: false
}
//Submit Questions
const questionInputChangedHandler = (state, action) => {
    const updatedForm = {
        ...state.questionForm,
        [action.controlName]: {
            ...state.questionForm[action.controlName],
            value: action.value
        }
    };

    return {
        ...state,
        questionForm: updatedForm
    }
}

// Fetch Questions
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
        questionForm: {
            question: {
                label: 'Question:',
                value: 'Name 3 '
            },
            author: {
                label: 'Author:',
                value: 'Anonymous'
            },
        },
    }
}

// Fetch Questions
const onSubmitQuestionsSuccess = (state, action) => {
    return {
        ...state,
        submitting: false,
        submitted: true,
        questionForm: {
            question: {
                label: 'Question:',
                value: 'Name 3 '
            },
            author: {
                label: 'Author:',
                value: 'Anonymous'
            },
        },
    }
}

const onSubmitQuestionsStart = (state, action) => {
    return {
        ...state,
        submitting: true,
    }
}

const onSubmitQuestionsFail = (state, action) => {
    return {
        ...state,
        submitted: true,
        submitting: false
    }
}

const onSubmitAnotherQuestion = (state, action) => {
    return {
        ...state,
        submitted: false
    }
}

const redAPI = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.QUESTION_INPUT_CHANGE_HANDLER: return questionInputChangedHandler(state, action);
        case actionTypes.FETCH_QUESTIONS_START: return onFetchQuestionsStart(state, action);
        case actionTypes.FETCH_QUESTIONS_FAIL: return onFetchQuestionsFail(state, action);
        case actionTypes.FETCH_QUESTIONS_SUCCESS: return onFetchQuestionsSuccess(state, action);
        case actionTypes.SUBMIT_QUESTION_START: return onSubmitQuestionsStart(state, action);
        case actionTypes.SUBMIT_QUESTION_FAIL: return onSubmitQuestionsFail(state, action);
        case actionTypes.SUBMIT_QUESTION_SUCCESS: return onSubmitQuestionsSuccess(state, action);
        case actionTypes.SUBMIT_ANOTHER_QUESTION: return onSubmitAnotherQuestion(state, action);
        default: return state;
    }
    
};

export default redAPI