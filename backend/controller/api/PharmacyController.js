const PharmaciesModel = require('../../model/PharmaciesModel');
const MedicinesModel = require('../../model/MedicinesModel');

module.exports = {
  getPharmacies: async (req, res, next) => {
    try {
      const pharmacies = await PharmaciesModel.find({});
      return res.status(200).send({ data: { pharmacies } })
    } catch (error) {

    }
  },
  getPharmacy: async (req, res, next) => {
    try {
      const { id } = req.params;
      const pharmacy = await PharmaciesModel.findById(id).populate('tests');
      return res.status(200).send({ data: { pharmacy } })
    } catch (error) {

    }
  }
};