const percentageDiscountByItemCategory = {
  applyCategoryDiscount: function (cart, category, discountCategory) {
    // คำนวณราคาสินค้าทั้งหมด
    const discountedCart = cart.map((item) => {
      // คำนวณราคาส่วนลด
      const isTargetCategory = item.category === category;

      // คำนวณราคาส่วนลด
      const discountedPrice = isTargetCategory
        ? item.price * (1 - discountCategory / 100)
        : item.price;
      console.log("discountedPrice:", discountedPrice);

      // คำนวณราคาสินค้าที่ลดราคาแล้ว
      const discountedTotalPrice = discountedPrice * item.quantity;
      console.log("discountedTotalPrice:", discountedTotalPrice);
      return { ...item, discountedPrice, discountedTotalPrice };
    });

    // คำนวณราคาสินค้าที่ลดราคาแล้ว
    const totalDiscountedPrice = discountedCart.reduce(
      (total, item) => total + (item.discountedTotalPrice || item.price),
      0
    );

    console.log("totalDiscountedPrice:", totalDiscountedPrice);
    return {
      discountedCart,
      totalDiscountedPrice,
    };
  },
};

export default percentageDiscountByItemCategory;
