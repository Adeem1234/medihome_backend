const Doctors = require('../../model/DoctorsModel');

module.exports = {
  get: async (req, res, next) => {
    try {
      const doctors = await Doctors.find({});
      res.status(200).render('doctorsList', { doctors });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  show: async (req, res, next) => {
    res.render('doctorAdd');
  },
  add: async (req, res, next) => {
    const { name, phoneNo } = req.body;
    try {
      const oldDoctors = await Doctors.findOne({ name: name, phoneNo: phoneNo });
      if (oldDoctors) {
        res.status(400).send('Doctor already exists');
      } else {
        const doctor = new Doctors({ name: name, phoneNo: phoneNo });
        await doctor.save();
        res.redirect('/admin/doctors');
      }
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const doctor = await Doctors.findById(id);
      res.status(200).render('doctorEdit', { doctor });
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, phoneNo } = req.body;
    try {
      await Doctors.findByIdAndUpdate(id, { name: name, phoneNo: phoneNo });
      return res.status(200).redirect('/admin/doctors');
    } catch (error) {
      // throw error
      res.status(400).send({ data: { message: error } });
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Doctors.findByIdAndRemove(id);
      res.status(200).redirect('/admin/doctors');
    } catch (error) {
      res.status(400).send({ data: { message: error } });
    }
  },
};