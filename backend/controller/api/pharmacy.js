const Pharmacies = require('../../model/pharmacies');
const Medicines = require('../../model/medicines');

module.exports = {
  addPharmacy: async (req, res, next) => {
    try {
      const { name, city, area } = req.body
      const pharmacy = new Pharmacies({ name: name, area: area, city: city });
      await pharmacy.save();
      return res.status(200).send({ pharmacy: pharmacy, message: 'new pharmacy added' });
    } catch (error) {
      return res.status(401).send({ error })
    }
  },
  addNewMedicine: async (req, res, next) => {
    try {
      const { name, price, manufacturer, formula } = req.body;
      const medicine = new Medicines({ name: name, price: price, manufacturer: manufacturer, formula: formula });
      await medicine.save();
      res.status(200).send({ medicine });
    } catch (error) {
      return res.status(401).send({ error })
    }
  },
  getAllMedicines: async (req, res, next) => {
    try {
      const medicines = await Medicines.find({});
      res.status(200).send({ medicines })
    } catch (error) {
      return res.status(401).send({ error })
    }
  }
};