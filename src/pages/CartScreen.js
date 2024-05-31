import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/CartAction";
import OrderForm from "../components/Cart/orderForm";

function CartScreen() {
  const { id } = useParams();
  const { n = 1 } = useParams();
  const location = useLocation();
  const [total, setTotal] = useState(0);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
     
    }
  }, [dispatch, id, qty]);

  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    );
  }, [cartItems]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="mt-20 mb-20">
      <Row>
        <Col md={6}>
          {cartItems.length === 0 ? (
            <Message variant="info">
             سلة مشترياتك فارغة <Link to={`/`}>الرجوع</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}/${n}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                    <div className="flex items-center gap-2">
            <p>دج </p>
            <p> {item.price} </p>
          </div>
                      </Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {item.countInStock > 0 &&
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col>
          <div>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="flex flex-col items-end">
                  <OrderForm total={total} />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
      {/* <Row>
        <div className="flex justify-end">
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="mt-3 text-gray-500 max-w-sm rtl">
                  <div className="text-right">
                    <p className="font-bold">:سياسة الضمان</p>
                    <p>
                      تلتزم – بتعويض زبائنها في حالة ما وجد المنتج معطوبا او
                      مكسورا او فيه خلل ، منتجاتنا هي منتجات لشركات رائدة في مجال
                      التجميل و الصحة و كل منتجاتها لديها ترخيص من وزارة الصحة و
                      تخضع للقانون التجاري الجزائري .
                    </p>
                    <br />
                    <p className="font-bold">:سياسة التوزيع</p>
                    <p>
                      يتم الاتصال بالزبون بعد 24 ساعة من وضع الطلبية ، وتاكيدها
                      معه هاتفيا يتم اخذ معلومات الزبون التي قام بكتابتهابمحض
                      ارادته واستعمالها لغرض ايصال الطلبية الى العنوان المتفق عليه
                      ، وتسلم الطلبية في غضون 2-7 ايام على حسب الولاية .
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">:سياسة الدفع</p>
                    <p>
                      تنتهج سياسة الدفع عند الاستلام ، اي اننا لا نطلب من الزبون
                      دفع اي مبلغ مسبق ونعتمد على الثقة المتبادلة بين الشركة
                      وزبائنها ، يتم دفع ثمن المنتج عند تسليمه فقط ، و ترفق فاتورة
                      المنتج معه موقعة ومصادق عليها من طرف الشركة .
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </div>
      </Row> */}
    </div>
  );
}

export default CartScreen;
