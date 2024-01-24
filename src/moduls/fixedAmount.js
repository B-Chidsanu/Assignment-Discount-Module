const fixedAmount = {
  applyDiscount: function (cart, discountFixedAmount) {
    if (cart.length === 0) {
      return {
        discountedPrice: 0,
        discountedCart: [],
        message: "ตะกร้าสินค้าว่างเปล่า",
      };
    }

    // คำนวณราคารวมในตะกร้าสินค้า
    const totalCartPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // คำนวณราคาสินค้าที่ลดราคาแล้ว
    if (totalCartPrice >= discountFixedAmount) {
      const discountedPrice = totalCartPrice - discountFixedAmount;

      const discountedCart = cart.map((item) => ({
        ...item,
        totalPrice: item.price * item.quantity,
      }));

      return {
        discountedPrice,
        discountedCart,
        message: `ราคารวม: ${discountedPrice} THB`,
      };
    } else {
      return {
        discountedPrice: totalCartPrice,
        discountedCart: cart.map((item) => ({
          ...item,
          totalPrice: item.price * item.quantity,
        })),
        message:
          "ไม่สามารถใช้ส่วนลดได้ เนื่องจากราคารวมในตะกร้าสินค้าน้อยกว่าส่วนลด",
      };
    }
  },
};
export default fixedAmount;
