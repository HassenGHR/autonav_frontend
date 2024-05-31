import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTelegram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

function Footer() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="container my-4" dir="rtl">
      <footer className="text-center text-lg-start text-gray-700 bg-gray-100">
        <div className="container p-3 pb-0">
          <section>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 text-right">
                <h6 className="text-uppercase mb-2 font-weight-bold">
                  Autonav
                </h6>
                <p>
                  مرحبًا بك في متجرنا الإلكتروني، حيث نقدم لك تجربة تسوق ممتعة
                  وآمنة. اكتشف مجموعتنا المتنوعة من المنتجات بأسعار تنافسية
                  وخيارات شحن مريحة. ابدأ التسوق الآن!
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3 text-right">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  المنتجات
                </h6>
                <p>
                  <a className="text-gray-700" href="/category/أجهزة تعقب">
                    أجهزة تعقب
                  </a>
                </p>
                <p>
                  <a className="text-gray-700" href="/category/لوازم كهربائية">
                    لوازم كهربائية
                  </a>
                </p>
                <p>
                  <a className="text-gray-700" href="/category/متنوعة">
                    متنوعة
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-right">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  روابط مفيدة
                </h6>
                {userInfo ? (
                  <p>
                    <a className="text-gray-700" href="/profile">
                      حسابك
                    </a>
                  </p>
                ) : null}
                <p>
                  <a className="text-gray-700" href="/aboutUs">
                    عن المتجر
                  </a>
                </p>
                <p>
                  <a className="text-gray-700" href="/delivery">
                    الشحن و التسليم
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 text-right">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  اتصل بنا
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> الدار البيضاء, الجزائر
                  العاصمة
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  support@autonav.shop
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> 0542761377
                </p>
              </div>
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-center text-md-end">
                <div className="p-3">
                  © 2024 حقوق النشر:
                  <a className="text-gray-700" href="https://autonav.shop/">
                    autonav.shop
                  </a>
                </div>
              </div>

              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-start">
                <a
                  className="btn btn-outline-secondary btn-floating m-1 text-black"
                  role="button"
                  href="https://web.facebook.com/profile.php?id=100091316903532"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>

                <a
                  className="btn btn-outline-secondary btn-floating m-1 text-black"
                  role="button"
                  href="https://twitter.com"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>

                <a
                  className="btn btn-outline-secondary btn-floating m-1 text-black"
                  role="button"
                  href="https://t.me/TestStore2383_bot"
                >
                  <FontAwesomeIcon icon={faTelegram} />
                </a>

                <a
                  className="btn btn-outline-secondary btn-floating m-1 text-black"
                  role="button"
                  href="https://instagram.com"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
