const Laboratories = require('../../model/laboratories');
const Tests = require('../../model/tests');

module.exports = {
  addLaboratory: async (req, res, next) => {
    try {
      const { name, city, area } = req.body
      const laboratory = new Laboratories({ name: name, area: area, city: city });
      await laboratory.save();
      return res.status(200).send({ laboratory: laboratory, message: 'new laboratory added' });
    } catch (error) {
      return res.status(401).send({ error })
    }
  },
  addNewTest: async (req, res, next) => {
    try {
      const { name, price } = req.body;
      const test = new Tests({ name: name, price: price });
      await test.save();
      res.status(200).send({ test });
    } catch (error) {
      return res.status(401).send({ error })
    }
  },
  getAllTests: async (req, res, next) => {
    try {
      const test = await Tests.find({});
      res.status(200).send({ test });
    } catch (error) {
      return res.status(401).send({ error })
    }
  }
};