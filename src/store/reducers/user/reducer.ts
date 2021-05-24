
const initialState = {
    name: '',
    phone: '',
    email: ''
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { 
                ...state, ...action.payload
            };
        case 'CLEAR_USER':
            return { 
                ...state, ...initialState
            };
        default:
            return state;
    }
}
