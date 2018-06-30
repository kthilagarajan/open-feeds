import { ADD_FEED, GET_FEEDS, DO_LIKE, ADD_COMMENT } from "../constants"
/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
    switch (action.type) {
        case ADD_FEED:
            return action.payload;
            break;
        case GET_FEEDS:
            return action.payload;
            break;
        /* case DO_LIKE:
            return action.payload;
            break;
        case ADD_COMMENT:
            return action.payload;
            break; */
    }
    return state;
}
