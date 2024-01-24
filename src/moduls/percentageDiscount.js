const percentageDiscount = {
  applyPercentageDiscount: function (cart, discountPercentage) {
    if (cart.length === 0) {
      return {
        discountedPrice: 0,
        discountedCart: [],
        message: "ตะกร้าสินค้าว่างเปล่า",
      };
    }

    // คำนวณราคารวมในตะกร้าสินค้า
    const totalOriginalCartPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // คำนวณราคาส่วนลด
    const discountAmount = (discountPercentage / 100) * totalOriginalCartPrice;

    // คำนวณราคาสินค้าที่ลดราคาแล้ว
    if (totalOriginalCartPrice >= discountAmount) {
      const discountedPrice = totalOriginalCartPrice - discountAmount;

      const discountedCart = cart.map((item) => {
        const discountPercentageApplied = item.price / totalOriginalCartPrice;
        const discountedItemPrice = discountPercentageApplied * discountedPrice;

        return {
          ...item,
          totalPrice: discountedItemPrice * item.quantity,
        };
      });

      return {
        discountedPrice,
        discountedCart,
        message: `ราคารวม: ${discountedPrice.toFixed(2)} ฿`,
      };
    } else {
      return {
        discountedPrice: totalOriginalCartPrice,
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

export default percentageDiscount;
