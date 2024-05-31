import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearCartItems, listCommunesAndFees } from "../../actions/CartAction";
import wilayas from "../../constants/wilayaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader"; // Assuming you have a Loader component
import "./orderForm.css";
import Message from "../Message";

const OrderForm = ({ total }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [wilayaCode, setWilayaCode] = useState(0);
  const [address, setAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [loadingOrder, setLoadingOrder] = useState(false); // State for loading indicator
  const [errorOrder, setErrorOrder] = useState(false); // State for loading indicator
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success message

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const communesAndFees = useSelector((state) => state.communesAndFees);
  const { loading, error, communes, fee } = communesAndFees;

  useEffect(() => {
    if (total !== 0) {
      dispatch(listCommunesAndFees(wilayaCode, deliveryMethod));
      
    }
  }, [dispatch, wilayaCode, deliveryMethod, total]);

  
  useEffect(() => {
    if (showSuccess){
      dispatch(clearCartItems());

    }
    
  }, [dispatch, showSuccess]);

  useEffect(() => {
    if (total === 0) {
      setTotalAmount(0.0);
    } else if (total && fee) {
      setTotalAmount(parseFloat(total) + parseInt(fee));
    } else {
      setTotalAmount(total);
    }
  }, [total, fee]);

  useEffect(() => {
    if (communes.length > 0) {
      setCommune(communes[0]); // Set the first commune as the default value
    }
  }, [communes]);

  const getWilayaNames = () => {
    return wilayas.map((wilaya) => wilaya.name);
  };

  const handleWilayaChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setWilaya(e.target.value);
    setWilayaCode(selectedIndex); // Assuming index starts from 0
  };
  

  const wilayaNames = getWilayaNames();
  console.log(commune);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingOrder(true); // Start loading indicator

    // Prepare request data
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/create/order?api_token=${process.env.REACT_APP_API_TOKEN}`;

    if (commune === ""){
      console.log("empty commune");
      setErrorOrder(true); }
    else{
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference: "EC2909",
          nom_client: fullName,
          telephone: phoneNumber,
          telephone_2: "",
          adresse: address,
          code_postal: "",
          commune: commune,
          code_wilaya: wilayaCode.toString(),
          montant: totalAmount,
          remarque: "",
          produit: "", // Replace with your concatenated item names
          boutique: "16. Dz shop",
          type: "1",
          stop_desk: parseInt(deliveryMethod),
        }),
      };
  
      try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.success) {
          setShowSuccess(true);

        }
       
      } catch (error) {
        console.error("Error creating order:", error);
        // Handle error, e.g., display error message
        setLoadingOrder(false); // Stop loading indicator
      }
    }
    
  };
  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className={`form-container ${showSuccess ? "blur-background" : ""}`}>      {loading && (
        <div className="loader-container">
          <Loader /> {/* Render loader while loading data */}
        </div>
      )}
       {errorOrder && <Message variant="info">رجاءا إختر البلدية</Message>}

       {showSuccess ? (
        <div className="success-message-card">
          <h1>شكرا</h1>
          <h2>تم إرسال طلبك بنجاح</h2>
          <button onClick={handleSuccessOk}>OK</button>
        </div>
      ) :(
        <form
        className={`bg-light p-3 rounded border border-gray-300 ${
          loading ? "form-blur" : ""
        }`}
        id="contact-us"
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-between">
          <div className="w-full p-1.5">
            <input
              type="tel"
              placeholder="رقم الهاتف"
              className="w-full py-2 px-4 border border-gray-300 rounded mb-4"
              minLength="10"
              maxLength="10"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-full p-1.5">
            <input
              type="text"
              placeholder="الإسم و اللقب"
              className="w-full py-2 px-4 border border-gray-300 rounded mb-4"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full p-1.5">
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded mb-4"
              required
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
            >
              {communes.length > 0 ? (
                communes.map((communeName, index) => (
                  <option key={index} value={communeName}>
                    {communeName}
                  </option>
                ))
              ) : (
                <option value="">البلدية</option>
              )}
            </select>
          </div>
          <div className="w-full p-1.5">
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded mb-4"
              required
              value={wilaya}
              onChange={handleWilayaChange}
            >
              <option value="">الولاية</option>
              {wilayaNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="العنوان"
            className="w-full py-2 px-4 border border-gray-300 rounded"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-3 rtl">
          <div className="flex items-center gap-3">
            <Form.Check
              type="radio"
              id="atHome"
              label=" المنزل"
              name="deliveryMethod"
              value="0"
              checked={deliveryMethod === "0"}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="desk"
              label=" المكتب"
              name="deliveryMethod"
              value="1"
              checked={deliveryMethod === "1"}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="ml-4"
            />
          </div>
          <span className="mr-4 font-bold"> : التوصيل إلى</span>
        </div>
        <div className="flex justify-center items-center mt-5">
          <div className="flex items-center gap-2">
            <p>دج </p>
            <p> {totalAmount} </p>
            <p className="font-bold"> :المبلغ الإجمالي </p>
          </div>
        </div>

        <div className="px-2 py-2">
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white px-4 py-2 rounded"
          >
            إضغط هنا لتأكيد الطلب
          </button>
        </div>
      </form>
      )}
     
    </div>
  );
};

export default OrderForm;
