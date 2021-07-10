const DoctorsModel = require('../../model/DoctorsModel')

module.exports = {
  getDoctors: async (req, res, next) => {
    try {
      const doctors = await DoctorsModel.find({});
      return res.status(200).send({ doctors });
    } catch (error) {
      return res.send({ error })
    }
  }
};