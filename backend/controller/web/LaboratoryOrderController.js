const LaboratoriesModel = require("../../model/LaboratoriesModel");
const OrdersModel = require("../../model/OrdersModel");


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
      const laboratory = await LaboratoriesModel.findOne({ manager: user._id }).populate('orders');
      const orders = await laboratory.orders;
      return res.renders('laboratoryOrders', { orders })
    }
    catch (error) {
      return err;
    }
  }
}