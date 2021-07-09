const LaboratoriesModel = require('../../model/LaboratoriesModel');
// const TestsModel = require('../../model/TestsModel');

module.exports = {
  getLaboratories: async (req, res, next) => {
    try {
      const { city } = req.user;
      const laboratories = await LaboratoriesModel.find({ city: city });
      return res.status(200).send({ laboratories })
    } catch (error) {

    }
  },
  getlaboratory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const laboratory = await LaboratoriesModel.findById(id).populate('tests');
      return res.status(200).send({ laboratory })
    } catch (error) {

    }
  }
};