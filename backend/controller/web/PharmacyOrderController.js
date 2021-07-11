const OrdersModel = require("../../model/OrdersModel");
const PharmaciesModel = require("../../model/PharmaciesModel");


module.exports = {
  updateOrderStatusProcessing: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrdersModel.findByIdAndUpdate(id, { status: 'processing' });
      order = await order.save();
      return res.redirect(req.headers.referer);
    } catch (error) {
      return error;
    }
  },
  updateOrderStatusCompleted: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrdersModel.findByIdAndUpdate(id, { status: 'completed' });
      order = await order.save();
      return res.redirect(req.headers.referer);
    } catch (error) {
      return error;
    }
  },
  getOrders: async (req, res) => {
    try {
      const user = await User.findById(JSON.parse(req.sessionStore.sessions[req.sessionID]).passport.user);
      const pharmacy = await PharmaciesModel.findOne({ manager: user._id }).populate('orders');
      const orders = await pharmacy.orders;
      return res.renders('pharmacyOrders', { orders })
    }
    catch (error) {
      return error;
    }
  }
}