import * as ActionType from './ActionTypes';
import { DISHES } from '../shared/dishes';
import  { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionType.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
newComment.date = new Date().toISOString;
return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    heades: {
        'Content-type': 'application /JSON'
    },
    credentials: 'same-origin'
})
.then(response => {
    if (response.ok) {
        return response;
    }
    else {
        var error = new Error('Error' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }
},
error => {
    var errmess = new Error(error.message);
    throw errmess;
})
.then(response => response.json())
.then(response => dispatch(addComment(response)))

};

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

   return fetch(baseUrl + 'dishes')
   .then(response => {
       if (response.ok) {
           return response;
       }
       else {
           var error = new Error('Error' + response.status + ': ' + response.statusText);
           error.response = response;
           throw error;
       }
   },
   error => {
       var errmess = new Error(error.message);
       throw errmess;
   }
   )
   .then(response => response.json())
   .then(dishes => dispatch(addDishes(dishes)))
   .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionType.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionType.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionType.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    dispatch(dishesLoading(true));

   return fetch(baseUrl + 'comments')
   .then(response => {
    if (response.ok) {
        return response;
    }
    else {
        var error = new Error('Error' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }
},
error => {
    var errmess = new Error(error.message);
    throw errmess;
}
)
   .then(response => response.json())
   .then(comments => dispatch(addComents(comments)))
   .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const commentsFailed = (errmess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errmess
});

export const addComents = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

   return fetch(baseUrl + 'promotions')
   .then(response => {
    if (response.ok) {
        return response;
    }
    else {
        var error = new Error('Error' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }
},
error => {
    var errmess = new Error(error.message);
    throw errmess;
}
)
   .then(response => response.json())
   .then(promos => dispatch(addPromos(promos)))
   .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionType.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionType.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionType.ADD_PROMOS,
    payload: promos
});

