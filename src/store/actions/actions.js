export {
    teamNameChanged,
    hideStartButton,
    clockFinished,
    addPoint,
    noAddPoint,
    newGame,
    startOver,
    maxScoreChanged,
    startGame,
    quickStart
} from './actGame';

export {
    questionInputChangedHandler,
    fetchQuestions,
    submitQuestion,
    submitAnotherQuestion
} from './actAPI';

export {
    auth,
    register,
    onLoginPage,
    leavingLoginPage,
    userLogout,
    setAuthRedirectPath,
    authCheckState,
} from './actAuth'