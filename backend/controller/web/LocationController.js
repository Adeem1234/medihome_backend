const CitiesModel = require("../../model/CitiesModel");
const AreasModel = require("../../model/AreasModel");

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
  },
  getLocations: async (req, res, next) => {
    try {
      const cities = await CitiesModel.find({}).populate('areas');
      return res.render('locations', { cities });
    } catch (error) {
      return res.status(400).send({ data: { message: error } })
    }
  },
  addLocationGet: async (req, res) => {
    try {
      const cities = await CitiesModel.find({}).populate('areas')
      return res.render('locationAdd', { cities })
    } catch (error) {
      return res.status(400).send({ data: { message: error } })
    }
  },
  addCityAndArea: async (req, res) => {
    try {
      const { city, area } = req.body;
      const newArea = new AreasModel({ name: area });
      newArea = await newArea.save();
      const newCity = new CitiesModel({ name: city, areas: [newArea._id] })
      newCity = await newCity.save();
      return res.redirect('/admin/locations');
    } catch (error) {
      return res.status(400).send({ data: { message: error } })
    }
  },
  AddArea: async (req, res) => {
    try {
      const { cityId, area } = req.body;
      const newArea = new AreasModel({ name: area });
      newArea = await newArea.save()
      const city = await Cities.findByIdAndUpdate(cityId, { $push: { areas: newArea._id } })
      return res.redirect('/admin/locations')
    } catch (error) {
      return res.status(400).send({ data: { message: error } })
    }
  },
  AddAreaGet: async (req, res) => {
    try {
      const cities = await CitiesModel.find({});
      return res.status(200).render('addArea', { cities });
    } catch (error) {
      return res.status(400).send({ data: { message: error } })
    }
  }

}