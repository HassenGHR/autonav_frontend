import React from "react";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center rounded p-4">
      <div className="w-full mt-5 mb-5 px-4 md:pr-2 md:pl-8">
        <h1 className="text-3xl font-semibold mb-6 p-3 text-center md:text-right">عن المتجر</h1>
        <div className="text-lg m-4 text-center md:text-right md:pr-5">
          <p>
            مرحباً بك في متجرنا! هذا المتجر هو بوابتك لعالم من التسوق الإلكتروني المميز والسهل. اكتشف مجموعة رائعة من المنتجات ذات الجودة العالية بأسعار تنافسية لن تجدها في أي مكان آخر. نحن هنا لنجعل تجربتك ممتعة وآمنة، مع توفير جميع التسهيلات التي تحتاجها، من اختيار المنتج إلى الشحن السريع والتسليم السلس. انضم إلينا واستمتع بتجربة تسوق لا مثيل لها
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
