import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import Nav from "./Headers/nav";
import { Button } from "@material-tailwind/react";

//Import Modul Coupons
import FixedAmount from "../moduls/fixedAmount";
import Percentage from "../moduls/percentageDiscount";
import percentageDiscountByCategory from "../moduls/percentageDiscountByItemCategory";
import discountByPoints from "../moduls/discountByPoints";
import specialCampaigns from "../moduls/specialCampaigns";

//Select Coupons
const coupons = [
  { name: "ส่วนลด 50 บาท", discountFixedAmount: 50 },
  { name: "ส่วนลด 10 %", discountPercentage: 10 },
  { name: "ส่วนลดเฉพาะ accessorie 15 %", discountCategory: 15 },
  { name: "ส่วนลด 40 บาท ทุกๆ 300 บาท", fixedDiscountAmount: 40 },
];

function Carts() {
  const {
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountedCartTotal, setDiscountedCartTotal] = useState(0);
  const [customerPoints, setCustomerPoints] = useState(0);
  const [discountedCart, setDiscountedCart] = useState([]);
  const [discountMessage, setDiscountMessage] = useState("");

  console.log("Discounted Cart:", discountedCart);
  console.log("Discount Message:", discountMessage);

  const handleCouponSelect = (selectedCoupon) => {
    if (selectedCoupon) {
      const couponObject = JSON.parse(selectedCoupon);

      if (
        "discountFixedAmount" in couponObject ||
        "discountPercentage" in couponObject ||
        "discountCategory" in couponObject ||
        "fixedDiscountAmount" in couponObject
      ) {
        setSelectedCoupon(couponObject);
      } else {
        setSelectedCoupon(null);
      }
    } else {
      setSelectedCoupon(null);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  //คำนวณการลดราคา โดยใช้ Modul ที่เขียนไว้ โดยเรียกใช้งานผ่านชื่อ Modul ที่เราตั้งให้ และเรียกใช้งานฟังก์ชั่นที่เราตั้งให้ โดยการเรียกใช้งานผ่านชื่อ Modul และชื่อฟังก์ชั่น
  const handleApplyDiscount = () => {
    const result = discountByPoints.applyDiscountPoints(items, customerPoints);

    setDiscountedCart(result.discountedCart);
    setDiscountedCartTotal(result.totalDiscountedPrice);
    setDiscountMessage(result.message);

    console.log("Discounted Cart:", result.discountedCart);
    console.log("Discount Message:", result.message);
  };

  useEffect(() => {
    handleApplyDiscount();
  }, [items, customerPoints]);

  useEffect(() => {
    let discountedCart;
    let discountedPrice;
    let message;

    if (selectedCoupon?.discountFixedAmount) {
      const fixedAmountResult = FixedAmount.applyDiscount(
        items,
        selectedCoupon?.discountFixedAmount || 0
      );
      discountedCart = fixedAmountResult.discountedCart;
      discountedPrice = fixedAmountResult.discountedPrice;
      message = fixedAmountResult.message;
    } else if (selectedCoupon?.discountPercentage) {
      const percentageResult = Percentage.applyPercentageDiscount(
        items,
        selectedCoupon?.discountPercentage || 0
      );
      discountedCart = percentageResult.discountedCart;
      discountedPrice = percentageResult.discountedPrice;
      message = percentageResult.message;
    } else if (selectedCoupon?.discountCategory) {
      console.log("Items before category discount:", items);
      const categoryDiscountResult =
        percentageDiscountByCategory.applyCategoryDiscount(
          items,
          "accessorie",
          selectedCoupon?.discountCategory || 0
        );
      discountedCart = categoryDiscountResult.discountedCart;
      discountedPrice = categoryDiscountResult.totalDiscountedPrice;
      message = "Discount applied to the selected category";
      console.log("Items after category discount:", discountedCart);
      console.log("Items after category discount:", discountedPrice);
    } else if (selectedCoupon?.fixedDiscountAmount) {
      const specialCampaignResult = specialCampaigns.applySpecialCampaigns(
        items,
        300,
        selectedCoupon?.fixedDiscountAmount || 0
      );
      discountedCart = specialCampaignResult.discountedCart;
      discountedPrice = specialCampaignResult.discountedPrice;
      message = specialCampaignResult.message;
      console.log(
        "Fixed Discount Amount:",
        selectedCoupon?.fixedDiscountAmount
      );
    } else {
      discountedCart = items.map((item) => ({
        ...item,
        totalPrice: item.price * item.quantity,
      }));
      discountedPrice = cartTotal;
      message = "ไม่ได้ใช้ Coupon";
    }

    console.log("Discounted Cart Price:", discountedPrice);
    console.log("Discounted Cart Items:", discountedCart);
    console.log("Message:", message);

    setDiscountedCartTotal(discountedPrice);
  }, [items, selectedCoupon, cartTotal]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("cart");
      // emptyCart();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <Nav />
      <div className="container mx-auto flex justify-center ">
        <section className=" text-gray-600 body-font font-medium">
          <div className="grid row-auto justify-between">
            <h5>
              Cart ({totalUniqueItems}) total Items: ({totalItems})
            </h5>
            <table className="w-[100rem] ms-5 table-auto max-w-lg bg-white rounded-lg shadow-md divide-y divide-gray-200 border border-gray-200">
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.img}
                        style={{ height: "10rem", margin: "1.0rem" }}
                        alt={item.title}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className="flex items-center justify-center mt-1 bg-white rounded-8 overflow-hidden  transition duration-300 ease hover:border-blue-500">
                        <div class="w-auto h-auto flex items-center justify-center text-gray-700  bg-white border-none cursor-pointer transition-all duration-300 ease">
                          <button>
                            <span
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              class="material-symbols-outlined flex text-center"
                            >
                              remove
                            </span>
                          </button>
                          <div class="flex items-center justify-center w-9 border-l border-r border-solid border-F5F8FB">
                            {item.quantity}
                          </div>
                          <button>
                            <span
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              class="material-symbols-outlined flex text-center"
                            >
                              add
                            </span>
                          </button>
                        </div>
                        <button>
                          <span
                            onClick={() => removeItem(item.id)}
                            className="material-symbols-outlined flex text-center ms-5"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="col-auto mt-2 ms-auto flex flex-col items-end">
              <div className="flex items-center mb-2 ">
                <label className="block text-sm font-medium text-gray-700">
                  Select Coupon:
                </label>
                <select
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  onChange={(e) => handleCouponSelect(e.target.value)}
                >
                  <option value="">No Coupon</option>
                  {coupons.map((coupon, index) => (
                    <option key={index} value={JSON.stringify(coupon)}>
                      {coupon.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mb-2 ">
                <lebel className="block text-sm font-medium text-gray-700">
                  Enter Customer Points:
                </lebel>
                <input
                  type="number"
                  value={customerPoints}
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value, 10);
                    if (!isNaN(inputValue) && inputValue >= 0) {
                      setCustomerPoints(inputValue);
                      handleApplyDiscount();
                    }
                  }}
                  className="mt-1 ms-2 block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <h2 className="mb-2 text-slate-900 text-lg">
                Total Price:{" "}
                {isNaN(discountedCartTotal) || discountedCartTotal < 0
                  ? "Invalid Total"
                  : `${discountedCartTotal.toFixed(2)} ฿`}
              </h2>
              <Button
                onClick={() => emptyCart()}
                className="btn btn-danger ms-5 border border-gray-500 rounded-md py-1 px-1 font-medium"
                variant="text"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Carts;
