const CitiesModel = require("../../model/CitiesModel");

module.exports = {
  getCityArea: async (req, res, next) => {
    try {
      const { id } = req.params;
      const city = await CitiesModel.findById(id).populate('areas');
      const areas = city.areas;
      return res.status(200).send({ areas });
    } catch (error) {
      return res.status(400).send({ data: { message: error } });
    }
  }
};