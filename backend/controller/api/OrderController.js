const OrdersModel = require('../../model/OrdersModel')

module.exports = {
  placeOrder: async (req, res) => {
    console.log('body')
    const { cart, pharmacy } = req.body;
    let user = req.user;
    let city, area;
    let total = 0;
    cart.forEach(cartItem => {
      cartItem.medicine = cartItem.medicine._id;
      console.log(typeof cartItem.total)
      total = total + cartItem.total
    })
    city = pharmacy.city._id
    area = pharmacy.area._id
    console.log(user)

    // const order = new OrdersModel({
    //   pharmacy: pharmacy._id,
    //   city: city,
    //   area: area,
    //   customer: user._id
    // })
  }
}