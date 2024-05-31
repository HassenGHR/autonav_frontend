import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

const Delivery = () => {
  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center rounded p-4">
        <div className="w-full md:w-1/2">
          <img
            className="hover:grow hover:shadow-lg mb-6 max-w-full border border-gray-300 rounded"
            src='https://webdesign.maximus.com.my/wp-content/uploads/2017/06/e-commerce.jpg'
            alt='ecommerce'
          />
        </div>
        <div className="w-full md:w-1/2 pl-8">

           
             <div className="flex justify-end">
            <Row  className="text-right">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className=" text-gray-500 max-w-sm rtl">
                  <div  className="text-lg mb-4 text-right">
        
                    <br />
                    <p className="font-bold">:الشحن والتسليم</p>
                    <p>
                      يتم الاتصال بالزبون لتأكيدالطلبية ، ثم نقوم بشحن الطلبية إلى شركة التوصيل، وتسلم الطلبية في غضون 2-7 ايام على حسب الولاية 
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">:الدفع</p>
                    <p>
                      الدفع عند الاستلام ، يتم دفع ثمن المنتج عند تسليمه من طرف شركة التوصيل</p>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Row>
          </div>
          </div>
        </div>
      </div>

  );
};

export default Delivery;
