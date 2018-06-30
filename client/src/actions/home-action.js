import { API_BASE, GET_FEEDS, ADD_FEED, DO_LIKE, ADD_COMMENT } from "../constants";

async function getAllFeeds() {
    try {
        let response = await fetch(API_BASE + '/getAllFeeds', {
            method: 'GET',
            headers: {
                'Accept':  'application/json',
                'Content-Type': 'application/json',
             },
             credentials: "same-origin"
        });
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.error(error);
    }
}
export const getFeeds = () => {
    return {
        type: GET_FEEDS,
        payload: getAllFeeds()
    }
};

async function addFeed(data) {
    try {
        let response = await fetch(API_BASE + '/addFeed', {
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
export const addOneFeed = (feed) => {
    return {
        type: ADD_FEED,
        payload: addFeed(feed)
    }
};
 async function hitLike(data) {
    try {
        let response = await fetch(API_BASE + '/likeFeed', {
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
export const likeFeed = (feed) => {
    return {
        type: DO_LIKE,
        payload: hitLike(feed)
    }
};

async function addComment(data) {
    try {
        let response = await fetch(API_BASE + '/commentOnFeed', {
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
export const addOneComment = (feed) => {
    return {
        type: ADD_COMMENT,
        payload: addComment(feed)
    }
};