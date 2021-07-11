const Medicines = require('../../model/MedicinesModel')
const path = require('path');

module.exports = {
  index: async (req, res, next) => {
    try {
      const medicines = await Medicines.find({});
      return res.render('medicineslist', { medicines });
    } catch (error) { return error; }
  },
  add: async (req, res, next) => {
    try {
      return res.render('medicineAdd');
    } catch (error) { return error; }
  },
  create: async (req, res, next) => {
    try {
      const { name, formula, manufacturer, price } = req.body;
      console.log(req.body)
      console.log(req.files)
      const file = req.files.file;
      const fileName = 'file-' + Date.now() + path.extname(file.name).toLowerCase();
      console.log(fileName)

      // const checkMedicine = await Medicines.find({ name: name, formula: formula, manufacturer: manufacturer });
      // console.log(checkMedicine)

      // if (checkMedicine) { return res.render('medicineAdd', error); }
      // else {
      const newFile = {
        name: fileName,
        path: `${process.env.BASE_URL}/medicines/${fileName}`,
      };
      await file.mv(`${__dirname}../../../public/medicines/${fileName}`, (err) => {
        if (err) console.log(err);;
      });
      const medicine = new Medicines({
        name: name,
        formula: formula,
        manufacturer: manufacturer,
        price: price,
        logo: newFile
      });
      await medicine.save();
      console.log(medicine)
      res.redirect('/admin/medicines');
      // }
    } catch (error) { return error; }
  },
  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const medicine = await Medicines.findById(id);
      if (medicine) { return res.render('medicineEdit', { medicine }) }
      else { return res.redirect('/admin/medicines') }
    } catch (error) { return error; }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, formula, manufacturer, price } = req.body;
    const updateMedicine = await Medicines.findByIdAndUpdate(id, { name: name, formula: formula, manufacturer: manufacturer, price: price })
    updateMedicine = await updateMedicine.save();
    return res.redirect('/admin/medicines')
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const medicine = await Medicines.findByIdAndDelete(id);
      return res.redirect('/admin/medicines')
    } catch (error) { return error; }
  }
}