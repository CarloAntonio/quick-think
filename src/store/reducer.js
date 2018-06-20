
const initialState = {
    numPlayers: 2,
    maxScore: 10,
    teamOne: 'Awesome Possum!',
    teamTwo: 'Blue Lightning!'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state;
    }
};

export default reducer;