const Pharmacies = require('../../model/pharmacies');

module.exports = {
  addPharmacy: async (req, res, next) => {
    try {
      const { name, city, area } = req.body
      const pharmacy = new Pharmacies({ name: name, area: area, city: city });
      await pharmacy.save();
      return res.status(200).send({ pharmacy: pharmacy, message: 'new city and area Added' });
    } catch (error) {
      return res.status(401).send({ error })
    }
  },

  getUpdateProfile: async (req, res, next) => {
    try {
      const cities = await Cities.find({}).populate('areas');
      return res.status(200).send({ cities });
    } catch (error) {
      return res.status(401).send({ error })
    }
  },
  updateprofile: async (req, res, next) => {

  }
};