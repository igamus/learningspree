// action types
const READ_CART = "learnfromme/courses/READ_CART";
const ADD_TO_CART = "learnfromme/courses/ADD_TO_CART";
const REMOVE_FROM_CART = "learnfromme/courses/REMOVE_FROM_CART";

// action creators
const readCartAction = courses => ({
    type: READ_CART,
    courses
});

const addToCartAction = course => ({
    type: ADD_TO_CART,
    course
});

const removeFromCartAction = courseId => ({
    type: REMOVE_FROM_CART,
    courseId
});

// thunk action creators
export const readCartThunk = () => async dispatch => {
    const res = await fetch("/api/cart/");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readCartAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const addToCartThunk = id => async dispatch => {
    const res = await fetch(`/api/cart/add/${id}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(addToCartAction(data.addedCourse));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const removeFromCartThunk = id => async dispatch => {
    const res = await fetch(`/api/cart/remove/${id}`);

    if (res.ok) {
        return dispatch(removeFromCartAction(id));
    } else {
        const errors = await res.json();
        return errors;
    }
};


// reducer
const initialState = {};

function cartReducer(state = initialState, action) {
    switch(action.type) {
        case READ_CART: {
            const newState = { ...state };
            action.courses.forEach(course => {
                newState[course.id] = course;
            });
            return newState;
        }
        case ADD_TO_CART: {
            const newState = { ...state };
            newState[action.course.id] = action.course;
            return newState;
        }
        case REMOVE_FROM_CART: {
            const newState = { ...state };
            delete newState[action.courseId];
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default cartReducer;
