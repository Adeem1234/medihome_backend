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
  }
}