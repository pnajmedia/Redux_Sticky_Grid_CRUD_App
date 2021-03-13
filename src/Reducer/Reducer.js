const initialState = {"HCPs":[]}
const Reducer = (state = initialState, action) => {
    // console.log('In reducer, Action', action)
    switch (action.type) {
        case 'GET_HCP':
            return {
                ...state, "HCPs":action.payload
            }
        case 'CREATE_HCP':
            return {
                ...state,
                "HCPs": state.HCPs.concat(action.payload)
            }
        case 'EDIT_HCP':
            return {
                ...state,
                "HCPs": state.HCPs.map((newHCP, i) => newHCP.id === action.payload.id ?
                    {
                        ...newHCP, sample: action.payload.sample,
                        sapleSource: action.payload.sapleSource,
                        Qty: action.payload.Qty,
                        SignDate: action.payload.SignDate,
                        status: action.payload.status,
                        HCPName: action.payload.HCPName,
                        Owner: action.payload.Owner
                    }
                    : newHCP)
            }

        case 'DELETE_HCP':
            return {
                ...state,
                "HCPs": state.HCPs.filter(delItem => delItem.id !== action.payload.id)
            }

        default:
            return state;
    }
}

export default Reducer;