import * as actionTypes from './actTypes';
import { shuffle } from '../../utility/utility';
import { axiosInstance } from '../../utility/utility';

// Firebase API Calls
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