const OrdersModel = require('../../model/OrdersModel')
const PharmaciesModel = require('../../model/PharmaciesModel')

module.exports = {
  placeOrder: async (req, res) => {
    try {

      console.log(req.body)
      let { cart, pharmacy } = req.body;
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
    
    let order = new OrdersModel({
      pharmacy: pharmacy._id,
      city: city,
      area: area,
      customer: user._id,
      total: total
    })
    order = await order.save();
    let updatePharmacy = await PharmaciesModel.findByIdAndUpdate(pharmacy._id, { $push: { orders: order._id } })
    await updatePharmacy.save()
    return res.status(200).send({ order: order, pharmacy: updatePharmacy })
    }
    catch (error) {
      console.log(error)
      return res.status(400).send({error})
    }

  }
}
