import { API_BASE, REGISTER_USER } from "../constants";

async function doRegister(data) {
    try {
        let response = await fetch(API_BASE + '/register', {
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
export const registerUser = (user) => {
    return {
        type: REGISTER_USER,
        payload: doRegister(user)
    }
};
