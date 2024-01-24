const specialCampaigns = {
  applySpecialCampaigns: function (cart, thresholdAmount, fixedDiscountAmount) {
    if (cart.length === 0) {
      return {
        discountedCart: [],
        discountedPrice: 0,
        message: "No items in the cart",
      };
    }

    // คำนวณราคาส่วนลดก่อน
    const discountedCart = cart.map((item) => {
      const totalItemPrice = item.price * item.quantity;
      const discountedPrice =
        totalItemPrice -
        Math.floor(totalItemPrice / thresholdAmount) * fixedDiscountAmount;

      console.log("Threshold Amount:", thresholdAmount);
      console.log("Item:", item);
      console.log("Discounted Price:", discountedPrice);

      return { ...item, discountedPrice: Math.max(discountedPrice, 0) };
    });

    // ให้อาร์เรย์ DiscountedCart เพื่อคำนวณราคาที่ลดทั้งหมด
    const discountedPrice = discountedCart.reduce(
      (total, item) => total + item.discountedPrice,
      0
    );

    console.log("Discounted Cart:", discountedCart);
    console.log("Total Discounted Price:", discountedPrice);

    return {
      discountedCart,
      discountedPrice,
      message: `Discounted ${discountedPrice} baht using fixed amount discount for every ${thresholdAmount} baht`,
    };
  },
};

export default specialCampaigns;
