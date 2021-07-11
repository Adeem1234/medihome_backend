const PharmaciesModel = require('../../model/PharmaciesModel');
const MedicinesModel = require('../../model/MedicinesModel');

module.exports = {
  getPharmacies: async (req, res, next) => {
    try {
      const { city, area } = req.user;
      const pharmacies = await PharmaciesModel.find({ city: city, area: area })
        .populate({ path: 'city', model: 'cities', select: 'name' })
        .populate({ path: 'area', model: 'areas' })
        .populate({ path: 'medicines.medicine', model: 'medicines' });
      console.log(pharmacies)
      return res.status(200).send({ pharmacies })
    } catch (error) {
      console.log(error)
    }
  },
  getPharmacy: async (req, res, next) => {
    try {
      const { id } = req.params;
      const pharmacy = await PharmaciesModel.findById(id).populate({ path: 'city', model: 'cities', select: 'name' }).populate({ path: area, model: 'areas' }).populate({ path: 'medicines.medicine', model: 'medicines' });
      return res.status(200).send({ pharmacy })
    } catch (error) {

    }
  }
};