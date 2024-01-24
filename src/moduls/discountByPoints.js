const discountByPoints = {
  applyDiscountPoints: function (cart, customerPoints) {
    const point = 1; // 1 point = 1 baht
    const maxDiscountPercentage = 0.2; // 20%

    // คำนวณราคาสินค้าทั้งหมด
    const totalCatagoryPrice = cart.reduce( 
      (total, item) => total + item.price * item.quantity,
      0
    ); 

    //คำนวณราคาสูงสุดที่ลดได้
    const maxDiscountAmount = totalCatagoryPrice * maxDiscountPercentage; 

    //คำนวณราคาส่วนลด
    const discountAmount = Math.min(customerPoints * point, maxDiscountAmount);

    // คำนวณราคาสินค้าที่ลดราคาแล้ว
    const discountedCart = cart.map((item) => {
      const discountedPrice = Math.max(
        item.price - discountAmount / item.quantity,
        0
      );
      return { ...item, discountedPrice };
    });

    // คำนวณราคาสินค้าที่ลดราคาแล้ว
    const totalDiscountedPrice = discountedCart.reduce(
      (total, item) =>
        total + (item.discountedPrice || item.price) * item.quantity,
      0
    );

    return {
      discountedCart,
      totalDiscountedPrice,
      discountAmount,
      message: `Discounted ${discountAmount} baht from the total price`,
    };
  },
};

export default discountByPoints;
