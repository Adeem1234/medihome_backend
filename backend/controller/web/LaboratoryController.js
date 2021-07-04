const CitiesModel = require('../../model/CitiesModel');
const Laboratories = require('../../model/LaboratoriesModel');
const UsersModel = require('../../model/UsersModel');

module.exports = {
  get: async (req, res, next) => {
    try {
      const laboratories = await Laboratories.find({}).populate({ path: 'city', model: 'cities', select: 'name' }).populate({ path: 'manager', model: 'users', select: 'name' });
      res.status(200).render('laboratoriesList', { laboratories });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  show: async (req, res, next) => {
    try {
      const cities = await CitiesModel.find({}).populate('areas');
      const users = await UsersModel.find({ type: 'laboratorist' });
      return res.render('laboratoryAdd', { cities, users });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  add: async (req, res, next) => {
    const { name, city } = req.body;
    try {
      const oldLaboratories = await Laboratories.findOne({ name: name, city: city });
      if (oldLaboratories) {
        res.status(400).send('Laboratory already exists');
      } else {
        const laboratory = new Laboratories({ name: name, city: city });
        await laboratory.save();
        res.redirect('/admin/laboratories');
      }
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const laboratory = await Laboratories.findById(id);
      res.status(200).render('laboratoryEdit', { laboratory });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, city } = req.body;
    try {
      await Laboratories.findByIdAndUpdate(id, { name: name, city: city });
      return res.status(200).redirect('/admin/laboratories');
    } catch (error) {
      // throw error
      res.status(400).send({ data: { message: error } });
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Laboratories.findByIdAndRemove(id);
      res.status(200).redirect('/admin/laboratories');
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
};