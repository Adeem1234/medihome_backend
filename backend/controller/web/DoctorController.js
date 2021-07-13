const DoctorsModel = require('../../model/DoctorsModel');

module.exports = {
  get: async (req, res, next) => {
    try {
      const doctors = await DoctorsModel.find({});
      res.status(200).render('doctorsList', { doctors });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  show: async (req, res, next) => {
    res.render('doctorAdd');
  },
  add: async (req, res, next) => {
    const { name, phoneNo, specialization, diploma } = req.body;
    try {
      const oldDoctors = await DoctorsModel.findOne({ name: name, phoneNo: phoneNo, specialization: specialization, diploma: diploma });
      if (oldDoctors) {
        res.status(400).send('Doctor already exists');
      } else {
        const doctor = new DoctorsModel({ name: name, phoneNo: phoneNo, specialization: specialization, diploma: diploma });
        await doctor.save();
        res.redirect('/admin/doctors');
      }
    } catch (error) {
      throw error
      res.status(400).send({ data: { message: error } });
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const doctor = await DoctorsModel.findById(id);
      res.status(200).render('doctorEdit', { doctor });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, phoneNo } = req.body;
    try {
      await DoctorsModel.findByIdAndUpdate(id, { name: name, phoneNo: phoneNo, specialization: specialization, diploma: diploma });
      return res.status(200).redirect('/admin/doctors');
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      await DoctorsModel.findByIdAndRemove(id);
      res.status(200).redirect('/admin/doctors');
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
};