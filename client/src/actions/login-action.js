import { API_BASE, LOGIN_USER } from "../constants";

async function doLogin(data) {
    try {
        let response = await fetch(API_BASE + '/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let responseJson = await response.json();
        return responseJson
    } catch (error) {
        console.error(error);
    }
}
export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: doLogin(user)
    }
};
