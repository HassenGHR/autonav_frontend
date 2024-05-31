import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import { Carousel, Image } from "react-bootstrap";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  createReviewProduct,
  fetchProductReviews,
  listProducts,
  listProductsDetails,
} from "../actions/productAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import "./productDetails.css";
import CommentsList from "../components/UI/CommentList";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviews = useSelector((state) => state.productReviews);
  const {

    reviews,
  } = productReviews;

  const productlist = useSelector((state) => state.productList);

  const { products } = productlist;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productCreateReview;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(id));
    dispatch(fetchProductReviews(id));
  }, [dispatch, id, successProductReview]);

  useEffect(() => {
    if (product.thumbnail && product.thumbnail.length > 0) {
      setMainImg(product.thumbnail[0]);
    }
  }, [product.thumbnail]);
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        if (product) {
          const similar = products
            .filter(
              (p) => p.category === product.category && p._id !== product._id
            )
            .filter(
              (p) => p.name.trim().substring(0, 3) === product.name.trim().substring(0, 3)
            );
          setSimilarProducts(similar);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [id, product]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReviewProduct(id, {
        userId: userInfo.userId,
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };
  const prevImage = () => {
    setCurrentImage(
      currentImage === 0 ? product.thumbnail.length - 1 : currentImage - 1
    );
  };

  const nextImage = () => {
    setCurrentImage(
      currentImage === product.thumbnail.length - 1 ? 0 : currentImage + 1
    );
  };
  const discountPercentage =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.price - product.oldPrice) / product.oldPrice) * 100
        )
      : 0;

  return (
    <div className="mt-4 mb-4">
      {/* <Link to={`/`} className="btn btn-light my-3">
        Go Back
      </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <div className=" mt-20">
          <Row>
            <Col md={6}>
              <article className=" mt-10">
                <div className="slider-container">
                  <div className="slider-arrow-left" onClick={prevImage}>
                    <IoIosArrowBack />
                  </div>
                  {product.thumbnail &&
                    product.thumbnail.map((image, index) => {
                      return (
                        <div
                          className={
                            index === currentImage
                              ? "slider-img-container slider-img-container-active"
                              : "slider-img-container"
                          }
                          key={index}
                        >
                          {index === currentImage && (
                            <img
                              src={image}
                              alt="product"
                              className="slider-img"
                            />
                          )}
                        </div>
                      );
                    })}
                  <div className="slider-arrow-right" onClick={nextImage}>
                    <IoIosArrowForward />
                  </div>
                </div>
                <section className="gallery-big-screen-images-container">
                  <img
                    src={mainImg}
                    alt="product"
                    className="big-screen-main-img"
                  />
                  <div className="gallery-small-images">
                    {product.thumbnail &&
                      product.thumbnail.map((image, index) => {
                        return (
                          <div
                            className={
                              image === mainImg
                                ? "active-small-img-container small-img-container"
                                : "small-img-container"
                            }
                            key={index}
                            onClick={() => setMainImg(product.thumbnail[index])}
                          >
                            <img
                              src={image}
                              alt="small-product"
                              className="small-image"
                            />
                          </div>
                        );
                      })}
                  </div>
                </section>
              </article>
            </Col>
            <Col className="text-right items-end">
              <div className="mt-5">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup variant="flush">


                  <Card>
                  <ListGroup variant="flush">
      <ListGroup.Item>
        <div className="flex flex-col items-end sm:flex-row justify-between">
          <Rating
            value={product.rating}
            size={product.numReviews}
            color={"#f8e825"}
          />
          <div className="flex items-center justify-end gap-3 mt-3 sm:mt-0">
            <div className="flex items-center space-x-2">
              <span className="inline-block px-2 py-1 text-xs font-bold text-green-600 bg-green-100 rounded">
                {discountPercentage}%
              </span>
              <span className="text-gray-500">دج</span>
              <span className="text-gray-500 line-through">{product.oldPrice}</span>
              <span className="text-gray-900 dark:text-white font-bold">دج</span>
              <span className="text-gray-900 dark:text-white font-bold">{product.price}</span>
            </div>
          </div>
        </div>
      </ListGroup.Item>

      <ListGroup.Item>
        <div className="flex items-center justify-end gap-3">
          <span>{product.quantity > 0 ? "متوفر" : "غير متوفر حاليا"}</span>
          <span className="font-bold text-right">:وضعية المنتج</span>
        </div>
      </ListGroup.Item>

      {product.quantity > 0 && (
        <ListGroup.Item>
          <div className="flex items-center justify-end gap-3">
            <Col xs="auto" className="my-1">
              <Form.Control
                as="select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(product.quantity).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <span className="font-bold text-right">:الكمية</span>
          </div>
        </ListGroup.Item>
      )}
    </ListGroup>
                  </Card>
                </ListGroup>
              </div>

              <div className="mt-3">
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  disabled={product.quantity === 0}
                  type="button"
                >
                  أضف إلى سلة المشتريات
                </Button>
              </div>
            </Col>
           
          </Row>

          <Row>
            <div className="flex  justify-between mt-5">
              <Col md={5}>
              <ListGroup.Item>
                    {/* <h3 className="text-right">:خصائص المنتج</h3> */}
                  </ListGroup.Item>
                {/* <div>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                    <div className="flex ">
                    <span className="block">
                       
                       【قطع المحرك عن بعد】  </span>
                       <span>
                       يتضمن جهاز تتبع نظام تحديد المواقع
                       4G مرحل، عندما تجد سيارتك مسروقة، يمكنك التحكم في سيارتك
                       عن بعد على هاتفك، وقطع المحرك عن طريق إرسال أمر SMS،
                       وستتوقف السيارة عن الحركة حتى تتلقى أمر SMS الخاص بك
                       "930000"، ومنع سرقة سيارتك في موقف السيارات. (السيارة
                       التي تعمل أقل من 20 كم/ساعة ستتوقف في غضون 10-20 ثانية
                       عندما تحصل على أمر الرسائل القصيرة)
                   
                       </span>
                    </div>
         
                    </li>
                    <li>

                      <span className="block">
                        【الوظيفة الرئيسية وشبكة الجيل الرابع 4G】جهاز تتبع GPS
                        صغير للسيارة من سينو تراك للدراجات النارية، هوائيات
                        مزدوجة مدمجة دبليو سي دي ام ايه وجي اس ام ايه وجي بي اس
                        مع ايه سي سي للكشف عن الاشتعال. (لا تشمل شريحة الاتصال).
                        جهاز تتبع جي بي اس ST-901L 4G (2G+4G) للمركبات، بسيط
                        للغاية وسهل الاستخدام للدراجات النارية والشاحنات وسيارات
                        الأجرة وما إلى ذلك. تنبيهات الرسائل النصية للحركة
                        والسرعة والمغادرة أو الدخول إلى المناطق، البطارية
                        المنخفضة، الصدمات، تقارير القيادة البيانات التاريخية
                        المحفوظة أثناء الخدمة. بطارية احتياطية مدمجة لتتبع
                        المركبات بنظام تحديد المواقع في الوقت الفعلي
                      </span>
                    </li>
                    <li>
                      <span className="block">
                        【يدعم منصة التتبع مدى الحياة】جهاز تتبع المواقع مقاوم
                        للماء للسيارات مع اشتراك خدمة التتبع عبر الإنترنت. اشترِ
                        شريحة اتصال للجهاز (لا يتضمن محدد موقع جي بي اس هذا
                        شريحة اتصال، تحتاج إلى شراء واحدة أخرى)، ابحث عن تسجيل
                        الدخول إلى سينوتراك برو أو قم بتنزيل تطبيق سينوتراك برو
                        جي بي اس من التابلت أو الكمبيوتر أو الهاتف. يتوفر التتبع
                        في الوقت الفعلي دون أي تكلفة إضافية
                      </span>
                    </li>
                    <li>
                      <span>【تتبع في الوقت الحقيقي】</span>
                      <span className="block">
                        جهاز تتبع نظام تحديد المواقع في الوقت الحقيقي ST-901L 4G
                        للمركبات المخفية يعتمد على شبكة LTE وGSM وجي بي ار اس
                        والأقمار الصناعية لتحديد مواقع الأهداف عن بعد ومراقبتها
                        باستخدام تطبيق تتبع نظام تحديد المواقع أو الويب الخاص
                        بنا، والذي يعرض معلومات الموقع بدقة (دقة تحديد المواقع
                        تصل إلى 10 أمتار)
                      </span>
                    </li>
                    <li>
                      <span className="block">
                        【ذاكرة التاريخ】يمكن لمتتبع نظام تحديد المواقع سينوتراك
                        4 جي للدراجات النارية والسيارات والشاحنات وسيارات الأجرة
                        توفير عامين من تاريخ التتبع. جهاز تتبع نظام تحديد
                        المواقع من سينوتراك بدون رسوم شهرية مع فاصل زمني، يمكنك
                        عرض تاريخ التتبع اليومي وتشغيله، وعندما تذهب السيارة إلى
                        مكان ما، يمكنك إصدار حكم أوضح. يرجى الانتباه: نوصي
                        باستخدام شريحة اتصال سبيد توك، لا تستخدم تي موبايل
                      </span>
                    </li>
                  </ul>
                </div> */}
                <div
        className=" m-4 border border-gray-300 rounded text-right"
        dangerouslySetInnerHTML={{ __html: product.description }}
      >
    </div>
              </Col>
             
            </div>
          </Row>
          {/* <Row> */}
          {similarProducts.length ?  <div className="similar-products-carousel bg-dark py-3 mt-5">
            <h3 className="text-center text-white text-xl font-bold mb-2">
            المنتجات ذات الصلة
            </h3>
            <Carousel pause="hover" className="bg-dark">
              {similarProducts.map((product) => (
                <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.thumbnail[0]}
                      alt={product.name}
                      fluid
                      className="rounded-lg shadow-md max-h-60 object-cover mx-auto"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h4 className="text-white text-sm font-semibold">
                        {product.name.length > 60
                          ? product.name.slice(0, 60) + "..."
                          : product.name}{" "}
                        (دج {product.price})
                      </h4>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>: null}
         

          <div className=" mx-auto mt-5 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            {/* <h4 className="mt-4 mb-4 text-right">ردود الأفعال</h4> */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <CommentsList reviews={reviews} />

                {loadingProductReview && <Loader />}
                {successProductReview && (
                  <Message variant="success">Review Submitted</Message>
                )}
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <div>
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <h6 className="mt-4 mb-4 text-right text-gray-600">
                          إضافة تقييم
                        </h6>
                        {/* <Form.Label className="mt-4 mb-4 text-right">التقييم</Form.Label> */}
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="text-right"
                        >
                          <option value=""> ... إختر</option>
                          <option value="1" className="text-right">
                            سيء جداً
                          </option>
                          <option value="2"> مقبول</option>
                          <option value="3"> جيد</option>
                          <option value="4"> جيد جداً</option>
                          <option value="5"> ممتاز</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <h6 className="mt-4 mb-4 text-right text-gray-600">
                          تعليق
                        </h6>

                        {/* <Form.Label className="mt-4 mb-4 text-right">المراجعة</Form.Label> */}
                        <Form.Control
                          as="textarea"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="text-right"
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        className="mt-4 mb-4"
                        disabled={loadingProductReview}
                        type="submit"
                        variant="success"
                      >
                        موافق
                      </Button>
                    </Form>
                  </div>
                ) : (
                  <Message variant="info">
                    الرجاء <Link to="/login">تسجيل الدخول</Link> لإضافة تقييم
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </div>

          {/* </Row> */}
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
