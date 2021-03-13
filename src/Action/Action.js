import axios from 'axios';

const apiUrl = 'http://localhost:3002/HCPs';


export const createHCP = (data) => {
    let config = {
        headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }};
    return (dispatch) => {
        return axios.post(apiUrl,data, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: 'CREATE_HCP',
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};


export const editHCP =  (data) => {
    let config = {
        headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }};
    return (dispatch) => {
        return axios.put(`http://localhost:3002/HCPs/${data.id}`,data,config)
            .then(response => {
                 dispatch({
                    type: 'EDIT_HCP',
                    payload: response
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};


export const deleteHCP = (id) => {
    return (dispatch) => {
         axios.delete(`http://localhost:3002/HCPs/${id}`)
            .then(response => {
                return dispatch({
                            type: 'DELETE_HCP',
                            payload: response.data
                        })

            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getHCP = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: 'GET_HCP',
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};