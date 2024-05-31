import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sprite from "../sprite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import CartContext from "../store/cart-context";
import AuthContext from "../store/auth-context";
import OrderForm from "../components/Cart/orderForm";
import "./productDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantityOrdered, setQuantityOrdered] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const cartCtx = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const selectedProduct = data.find(
          (item) => item.id === parseInt(productId)
        );
        setProduct(selectedProduct);
        setIsLoaded(true);
      });
  }, [productId]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const cleanedPrice = parseFloat(product.price.replace("da", ""));
      const totalQuantityInCart = cartCtx.items.reduce((total, item) => {
        if (item.id === product.id) {
          return total + item.amount;
        }
        return total;
      }, 0);

      if (totalQuantityInCart >= product.quantity) {
        setAmountIsValid(false);
        return;
      }

      cartCtx.addItem({
        id: product.id,
        name: product.name,
        amount: quantityOrdered,
        price: cleanedPrice,
        productQuantity: product.quantity,
      });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleCloseError = () => {
    setAmountIsValid(true);
  };
  const rotateAnimationHandler = (props, state) => {
    const transitionTime = props.transitionTime + "ms";
    const transitionTimingFunction = "ease-in-out";
    let slideStyle = {
      display: "block",
      minHeight: "100%",
      transitionTimingFunction: transitionTimingFunction,
      msTransitionTimingFunction: transitionTimingFunction,
      MozTransitionTimingFunction: transitionTimingFunction,
      WebkitTransitionTimingFunction: transitionTimingFunction,
      OTransitionTimingFunction: transitionTimingFunction,
      transform: `rotate(0)`,
      position:
        state.previousItem === state.selectedItem ? "relative" : "absolute",
      inset: "0 0 0 0",
      zIndex: state.previousItem === state.selectedItem ? "1" : "-2",
      opacity: state.previousItem === state.selectedItem ? "1" : "0",
      WebkitTransitionDuration: transitionTime,
      MozTransitionDuration: transitionTime,
      OTransitionDuration: transitionTime,
      transitionDuration: transitionTime,
      msTransitionDuration: transitionTime,
    };
    return {
      slideStyle,
      selectedStyle: {
        ...slideStyle,
        opacity: 1,
        position: "relative",
        zIndex: 2,
        filter: `blur(0)`,
      },
      prevStyle: {
        ...slideStyle,
        transformOrigin: " 0 100%",
        transform: `rotate(${
          state.previousItem > state.selectedItem ? "-45deg" : "45deg"
        })`,
        opacity: "0",
        filter: `blur( ${
          state.previousItem === state.selectedItem ? "0px" : "5px"
        })`,
      },
    };
  };

  return (
    <div className="flex justify-around p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
        <div className="max-w-xs mx-auto border border-gray-300">
          <Carousel
            showIndicators
            renderArrowNext={(clickHandler, hasNext) => {
              return (
                hasNext && (
                  <button
                    onClick={clickHandler}
                    className="nav_btn nav_btn_right"
                  >
                    <svg>
                      <use xlinkHref={sprite + "#right"}></use>
                    </svg>
                  </button>
                )
              );
            }}
            renderArrowPrev={(clickHandler, hasNext) => {
              return (
                hasNext && (
                  <button
                    onClick={clickHandler}
                    className="nav_btn nav_btn_left"
                  >
                    <svg>
                      <use xlinkHref={sprite + "#left"}></use>
                    </svg>
                  </button>
                )
              );
            }}
            renderIndicator={(clickHandler, isSelected, index) => {
              return (
                <li
                  onClick={clickHandler}
                  className={`ind ${isSelected ? "active" : ""}`}
                  key={index}
                  role="button"
                />
              );
            }}
            statusFormatter={(currentItem, total) => {
              return (
                <p>
                  image {currentItem} of {total}
                </p>
              );
            }}
            transitionTime={310}
            animationHandler={rotateAnimationHandler}
            swipeable={false}
          >
            {product.thumbnail.map((productItem, index) => (
              <div key={index} className="pt-2">
                <Image
                  src={productItem}
                  alt={product.name}
                  fluid
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col">
          <ul className="max-w-md mx-auto p-4 direction-rtl">
            <li className="my-4">
              <p className="text-base">
                【خدمة العملاء】 مع سياسة إرجاع لمدة 30 يومًا بدون أسئلة. لا
                تتردد في الاتصال بخدمة العملاء لدينا إذا كان لديك أي مشاكل.
                انتباه: هذا المتتبع الحقيقي للـ 4G (يتضمن شبكة 2G+4G)، ولكنك
                بحاجة إلى شراء بطاقة SIM محلية مع شبكة 4G (LTE). نوصي ببطاقة SIM
                من SpeedTalk. لا يمكن أن تعمل T-mobile مع متتبعنا، لا تستخدمها.
              </p>
            </li>
            <li className="my-4">
              <p className="text-base">
                【شبكة 2G+4G】 SinoTrack 4G متتبع GPS للسيارات، مع تغطية وطنية
                لتتبع السيارات الـ 4G التي تحدث كل دقيقة. (هذا المتتبع GPS
                للدراجات النارية لا يشمل بطاقة SIM، يجب عليك شراء بطاقة SIM
                محلية مع وظائف الشبكة 4G (LTE)، يستخدم متتبع الموقع GPS ST-906L
                حوالي 30 ميجابايت من البيانات في الشهر. لديه بطارية احتياطية
                مدمجة بسعة 180 مللي أمبير، عند بدء تشغيل المحرك، سيتم شحنها، لا
                داعي للقلق بشأن الانقطاع.
              </p>
            </li>
            <li className="my-4">
              <p className="text-base">
                【مع زر الطوارئ وصوت المراقبة】 متتبع GPS للسيارات مع زر الطوارئ
                وصوت المراقبة، يمكن سماع الصوت المحيط بالمتتبع على هاتفك الخلوي.
                عندما يكون الجهاز في حالة غير طبيعية، اضغط على زر الطوارئ لإرسال
                رسالة استغاثة إلى الوصي والمنصة، والاتصال بالوصي في نفس الوقت.
                إذا قمت بالاتصال برقم SIM في الجهاز، سيقوم بالرد على مكالمتك
                تلقائيًا ويمكنك مراقبة الصوت حول الجهاز.
              </p>
            </li>
            <li className="my-4">
              <p className="text-base">
                【تنبيهات فورية】 متتبع GPS عبر الإنترنت في الوقت الحقيقي
                للسيارات يدعم تنبيهات الرسائل النصية للحركة، وإنذار SOS، السور
                الجغرافي، إنذار سرقة ACC، السرعة، المغادرة، الصدمة، والبطارية
                منخفضة، وما إلى ذلك. يتم حفظ بيانات تتبع GPS التاريخية غير
                المحدودة أثناء الخدمة. تتبع من أي مكان باستخدام تطبيقات تتبع GPS
                المجانية مع تنبيهات الرسائل النصية في الوقت الحقيقي.
              </p>
            </li>
            <li className="my-4">
              <p className="text-base">
                【دعم مدى الحياة للمنصة】 يراقب متتبع GPS ST-906L للسيارات نشاط
                القيادة بدقة 100٪ باستخدام خرائط Google. تتبع من أي نظام مثل
                الكمبيوتر، الهاتف، أو الجهاز اللوحي، إلخ. يمكنك تسجيل الدخول إلى
                sinotrackpro أو تنزيل SinoTrack Pro للتتبع من أي مكان باستخدام
                تطبيقات تتبع GPS مع تنبيهات الرسائل النصية في الوقت الحقيقي.
                يمكن لهذا المتتبع GPS للسيارات حفظ سجل تتبع لمدة 2 سنة خلال
                الخدمة، يمكنك إعادة تشغيل مسار التاريخ في أي وقت.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <OrderForm />
        <div className="mt-3 text-gray-500 max-w-sm direction-rtl">
          <hr className="m-0 border-b border-gray-400 opacity-25" />
          <div className="text-right ">
            <p className="font-bold "> :سياسة الضمان </p>
            <p>
              تلتزم – بتعويض زبائنها في حالة ما وجد المنتج معطوبا او مكسورا او
              فيه خلل ، منتجاتنا هي منتجات لشركات رائدة في مجال التجميل و الصحة
              و كل منتجاتها لديها ترخيص من وزارة الصحة و تخضع للقانون التجاري
              الجزائري .
            </p>
            <br />
            <p className="font-bold">سياسة التوزيع :</p>
            <p>
              يتم الاتصال بالزبون بعد 24 ساعة من وضع الطلبية ، وتاكيدها معه
              هاتفيا يتم اخذ معلومات الزبون التي قام بكتابتهابمحض ارادته
              واستعمالها لغرض ايصال الطلبية الى العنوان المتفق عليه ، وتسلم
              الطلبية في غضون 2-7 ايام على حسب الولاية .
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">سياسة الدفع :</p>
            <p>
              تنتهج سياسة الدفع عند الاستلام ، اي اننا لا نطلب من الزبون دفع اي
              مبلغ مسبق ونعتمد على الثقة المتبادلة بين الشركة وزبائنها ، يتم دفع
              ثمن المنتج عند تسليمه فقط ، و ترفق فاتورة المنتج معه موقعة ومصادق
              عليها من طرف الشركة .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
