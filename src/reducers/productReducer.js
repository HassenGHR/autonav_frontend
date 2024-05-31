import { PRODUCT_LIST_REQUEST ,
     PRODUCT_LIST_SUCCESS,
      PRODUCT_LIST_FAIL ,
      PRODUCT_DETAILS_REQUEST ,
     PRODUCT_DETAILS_SUCCESS,
      PRODUCT_DETAILS_FAIL,
      PRODUCT_CREATE_REQUEST,
      PRODUCT_CREATE_SUCCESS,
      PRODUCT_CREATE_FAIL,
      PRODUCT_CREATE_RESET,
      PRODUCT_DELETE_REQUEST,
      PRODUCT_DELETE_SUCCESS,
      PRODUCT_DELETE_FAIL,
      PRODUCT_UPDATE_REQUEST,
      PRODUCT_UPDATE_SUCCESS,
      PRODUCT_UPDATE_FAIL,
      PRODUCT_UPDATE_RESET,
      PRODUCT_CREATE_REVIEW_RESET,
      PRODUCT_CREATE_REVIEW_FAIL,
      PRODUCT_CREATE_REVIEW_SUCCESS,
      PRODUCT_CREATE_REVIEW_REQUEST,
      UPLOAD_IMAGES_REQUEST,
      UPLOAD_IMAGES_SUCCESS,
      UPLOAD_IMAGES_FAIL,
      UPLOAD_IMAGES_RESET,
      PRODUCT_FETCH_REVIEWS_REQUEST,
      PRODUCT_FETCH_REVIEWS_SUCCESS,
      PRODUCT_FETCH_REVIEWS_FAIL
  
} from '../constants/productConstant'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
 
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const uploadImagesReducer = (state = [], action) => {
    switch (action.type) {
      case UPLOAD_IMAGES_REQUEST:
        return { loading: true, images: [], ...state };
  
      case UPLOAD_IMAGES_SUCCESS:
        return {
          loading: false,
          images: action.payload,
        };
  
      case UPLOAD_IMAGES_FAIL:
        return { loading: false, error: action.payload };
      case UPLOAD_IMAGES_RESET:
            return { images: [] }; // Reset images state
  
      default:
        return state;
    }
  };
  
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_UPDATE_RESET:
            return { product: {} }

        default:
            return state
    }
}


export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {} 

        default:
            return state
    }
}
export const productReviewFetchReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case PRODUCT_FETCH_REVIEWS_REQUEST:
        return { loading: true, reviews: [] };
  
      case PRODUCT_FETCH_REVIEWS_SUCCESS:
        return { loading: false, reviews: action.payload };
  
      case PRODUCT_FETCH_REVIEWS_FAIL:
        return { loading: false, error: action.payload, reviews: [] };
  
      default:
        return state;
    }
  };




