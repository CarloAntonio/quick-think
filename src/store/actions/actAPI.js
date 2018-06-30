import * as actionTypes from './actTypes';
import { shuffle } from '../../utility/utility';
import { axiosInstance } from '../../utility/utility';

// Firebase API Calls
export const questionInputChangedHandler = (event, id) => {
    return {
        type: actionTypes.QUESTION_INPUT_CHANGE_HANDLER,
        controlName: id,
        value: event.target.value
    };
};

const fetchQuestionsSuccess = (questions) => {
    return {
        type: actionTypes.FETCH_QUESTIONS_SUCCESS,
        questions: questions
    };
};

const fetchQuestionsFail = (error) => {
    return {
        type: actionTypes.FETCH_QUESTIONS_FAIL,
        error: error
    };
};

const fetchQuestionsStart = () => {
    return {
        type: actionTypes.FETCH_QUESTIONS_START
    };
};

export const fetchQuestions = () => {
    return dispatch => {
        //start loading ui
        dispatch(fetchQuestionsStart());

        axiosInstance.get('questions.json')
        .then(res => {
            //initialize an array
            let fetchedQuestions = [];
    
            //push each question object into array
            for(let key in res.data) {
                fetchedQuestions.push({
                    ...res.data[key],
                    id: key
                });
            }

            //shuffle questions
            fetchedQuestions = shuffle(fetchedQuestions);

            //handle successful fetch
            dispatch(fetchQuestionsSuccess(fetchedQuestions));
        })
        .catch(err => {
            //handle errors
            dispatch(fetchQuestionsFail(err));
        })
    }
}

const submitQuestionSuccess = () => {
    return {
        type: actionTypes.SUBMIT_QUESTION_SUCCESS,
    };
};

const submitQuestionFail = (error) => {
    return {
        type: actionTypes.SUBMIT_QUESTION_FAIL,
        error: error
    };
};

const submitQuestionStart = () => {
    return {
        type: actionTypes.SUBMIT_QUESTION_START
    };
};

export const submitQuestion = (token, qObject) => {
    return dispatch => {
        dispatch(submitQuestionStart());
        axiosInstance.post('questions.json?auth=' + token, qObject)
            .then(res => {
                dispatch(submitQuestionSuccess())
            })
            .catch(err => {
                dispatch(submitQuestionFail(err))
            })
    }
}

export const submitAnotherQuestion = () => {
    return {
        type: actionTypes.SUBMIT_ANOTHER_QUESTION
    }
}