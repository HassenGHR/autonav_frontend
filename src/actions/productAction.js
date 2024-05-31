import axios from 'axios'

import { PRODUCT_LIST_REQUEST ,
    PRODUCT_LIST_SUCCESS,
     PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_REQUEST ,
     PRODUCT_DETAILS_SUCCESS,
      PRODUCT_DETAILS_FAIL,
      PRODUCT_DELETE_REQUEST,
      PRODUCT_DELETE_SUCCESS,
      PRODUCT_DELETE_FAIL,
      PRODUCT_CREATE_REQUEST,
      PRODUCT_CREATE_SUCCESS,
      PRODUCT_CREATE_FAIL,
      PRODUCT_UPDATE_REQUEST,
      PRODUCT_UPDATE_SUCCESS,
      PRODUCT_UPDATE_FAIL,
      PRODUCT_CREATE_REVIEW_FAIL,
      PRODUCT_CREATE_REVIEW_SUCCESS,
      PRODUCT_CREATE_REVIEW_REQUEST,
      UPLOAD_IMAGES_REQUEST,
      UPLOAD_IMAGES_SUCCESS,
      UPLOAD_IMAGES_FAIL,
      PRODUCT_FETCH_REVIEWS_REQUEST,
      PRODUCT_FETCH_REVIEWS_SUCCESS,
      PRODUCT_FETCH_REVIEWS_FAIL

} from '../constants/productConstant'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`http://localhost:3001/api/products`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`process.env.REACT_APP_SERVER_URL/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
} 


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.delete(
            `process.env.REACT_APP_SERVER_URL/api/products/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `process.env.REACT_APP_SERVER_URL/api/products/create/`,
            {},
            config
        )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const uploadImages = (formData) => async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_IMAGES_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.post(
        'http://184.174.36.162:3007/api/upload/',
        formData,
        config
      );
  
      dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: response.data.images });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `process.env.REACT_APP_SERVER_URL/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createReviewProduct = (productId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `process.env.REACT_APP_SERVER_URL/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })


      

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const fetchProductReviews = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_FETCH_REVIEWS_REQUEST });
  
      const { data } = await axios.get(`process.env.REACT_APP_SERVER_URL/api/products/${productId}/reviews`);
  
      dispatch({
        type: PRODUCT_FETCH_REVIEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FETCH_REVIEWS_FAIL,
        payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
      });
    }
  };