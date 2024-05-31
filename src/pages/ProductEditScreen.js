import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import OpenAI from "openai";
import {
  listProductsDetails,
  updateProduct,
  uploadImages,
} from "../actions/productAction";
import {
  PRODUCT_UPDATE_RESET,
  UPLOAD_IMAGES_RESET,
} from "../constants/productConstant";
import CategoryDropdown from "../components/UI/CategoryDropdown";
import "./productDetails.css";

const initialProductState = {
  name: "",
  price: 0,
  oldPrice: 0,
  thumbnail: ["", "", "", ""],
  brand: "",
  category: "",
  countInStock: 0,
  description: "",
};

const ProductEditScreen = () => {
  const { id } = useParams();
  const [productState, setProductState] = useState(initialProductState);
  const [images, setImages] = useState([]);
  const [addedImages, setAddedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [html, setHtml] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const imageUploadedUrls = useSelector((state) => state.uploadImagesToDb);
  const { error: uploadError, loading: uploadloading, images: imageUploaded } = imageUploadedUrls;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: UPLOAD_IMAGES_RESET });
      navigate("/admin/productlist");
    }
  }, [navigate, successUpdate, dispatch]);

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(listProductsDetails(id));
    } else {
      setHtml(product.description);

      setProductState({
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        thumbnail: product.thumbnail,
        brand: product.brand,
        category: product.category,
        countInStock: product.quantity,
        description: product.description,
      });

    }
  }, [dispatch, product, id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (images.length) {
        const formData = new FormData();
        formData.append("productId", id);
        images.forEach((image) => {
          formData.append("photo", image);
        });

        dispatch(uploadImages(formData));
      } else {
        dispatch(updateProduct({ ...productState, _id: id }));
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    if (Array.isArray(imageUploaded) && imageUploaded.length > 0) {
      let updatedThumbnail = [...imageUploaded, ...addedImages];
      if (updatedThumbnail.length > 4) {
        updatedThumbnail = updatedThumbnail.slice(0, 4); // Take only the first 4 images
      }
      dispatch(updateProduct({ ...productState, _id: id, thumbnail: updatedThumbnail }));
      setAddedImages(updatedThumbnail);
    }
  }, [dispatch, id, imageUploaded, addedImages, productState]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const convertTextToHtml = async () => {
    const apiKey =  process.env.REACT_APP_OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
   
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `give me a detail description in arabic  about  ${productState.name}, the output should be inside two html div  with styling the text and make text direction from right to left `,
          },
        ],
      });
      
      const desc = response.choices[0].message.content;
      setHtml(desc);
      setProductState((prevState) => ({ ...prevState, description: desc }));

   
  };
  useEffect(() => {
    convertTextToHtml();
  }, [productState.name]);

  return (
    <div>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={productState.name}
                onChange={(e) => setProductState({ ...productState, name: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={productState.price}
                onChange={(e) => setProductState({ ...productState, price: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="oldPrice">
              <Form.Label>Old Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter old price"
                value={productState.oldPrice}
                onChange={(e) => setProductState({ ...productState, oldPrice: e.target.value })}
              ></Form.Control>
            </Form.Group>

            {productState.thumbnail.map((img, index) => (
              <Form.Group controlId={`image${index}`} key={index}>
                <Form.Label>{`Image${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image"
                  value={img}
                  onChange={(e) =>
                    setProductState({
                      ...productState,
                      thumbnail: productState.thumbnail.map((thumb, i) =>
                        i === index ? e.target.value : thumb
                      ),
                    })
                  }
                ></Form.Control>
                <Form.Control
                  type="file"
                  label="Choose File"
                  onChange={handleImageChange}
                ></Form.Control>
                {uploading && <Loader />}
              </Form.Group>
            ))}

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={productState.brand}
                onChange={(e) => setProductState({ ...productState, brand: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={productState.countInStock}
                onChange={(e) => setProductState({ ...productState, countInStock: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <CategoryDropdown category={productState.category} setCategory={(category) => setProductState({ ...productState, category })} />

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={productState.description}
                onChange={(e) => setProductState({ ...productState, description: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
