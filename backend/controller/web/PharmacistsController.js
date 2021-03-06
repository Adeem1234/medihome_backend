const Pharmacies = require('../../model/PharmaciesModel');
const CitiesModel = require('../../model/CitiesModel');
const UsersModel = require('../../model/UsersModel');
const MedicinesModel = require('../../model/MedicinesModel');

module.exports = {
    get: async (req, res, next) => {
        try {
            const pharmacies = await Pharmacies.find({}).populate({ path: 'city', model: 'cities', select: 'name' }).populate({ path: 'area', model: 'areas' }).populate({ path: 'manager', model: 'users', select: 'name' });
            res.status(200).render('pharmaciesList', { pharmacies });
        } catch (error) { res.status(400).send({ data: { message: error } }); }
    },
    show: async (req, res, next) => {
        try {
            const cities = await CitiesModel.find({}).populate('areas');
            const users = await UsersModel.find({ type: 'Pharmacist' });
            return res.render('pharmacyAdd', { cities, users });
        } catch (error) { res.status(400).send({ data: { message: error } }); }
    },
    add: async (req, res, next) => {
        try {
            const { name, city, area, manager } = req.body;
            const oldPharmacies = await Pharmacies.findOne({ name: name, city: city, area: area, manager: manager });
            if (oldPharmacies) {
                res.status(400).send('Pharmacy already exists');
            } else {
                const pharmacy = new Pharmacies({ name: name, city: city, area: area });
                await pharmacy.save();
                res.redirect('/admin/pharmacies');
            }
        } catch (error) {
            throw error
            res.status(400).send({ data: { message: error } });
        }
    },
    edit: async (req, res, next) => {
        const { id } = req.params;
        try {
            const cities = await CitiesModel.find({}).populate('areas');
            const users = await UsersModel.find({ type: 'Pharmacist' });
            const pharmacy = await Pharmacies.find({}).populate({ path: 'city', model: 'cities', select: 'name' }).populate({ path: 'area', model: 'areas' }).populate({ path: 'manager', model: 'users', select: 'name' })
            res.status(200).render('pharmacyEdit', { pharmacy: pharmacy[0], cities, users });
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const { name, city, area, manager } = req.body;
        try {
            await Pharmacies.findByIdAndUpdate(id, { name: name, city: city, area: area, manager: manager });
            return res.status(200).redirect('/admin/pharmacies');
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Pharmacies.findByIdAndRemove(id);
            res.status(200).redirect('/admin/pharmacies');
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
    medicines: async (req, res) => {
        try {
            const user = await UsersModel.findById(JSON.parse(req.sessionStore.sessions[req.sessionID]).passport.user);
            const pharmacy = await Pharmacies.findOne({ manager: user._id }).populate({ path: 'medicines.medicine', model: 'medicines' })
            const medicines = await MedicinesModel.find({})
            return res.render('pharmacyMedicines', { pharmacy, medicines })
        } catch (error) {
            throw error
            res.status(400).send({ data: { message: error } });
        }
    },
    updateStock: async (req, res) => {
        try {
            const user = await UsersModel.findById(JSON.parse(req.sessionStore.sessions[req.sessionID]).passport.user);
            const { medicine, quantity } = req.body;
            const pharmacy = await Pharmacies.findOneAndUpdate({ manager: user._id }, { $push: { medicines: { ...req.body } } })
            await pharmacy.save()
            return res.redirect('/admin/pharmacy/add/medicine')
        }
        catch (error) {
            res.status(400).send({ data: { message: error } });

        }
    }

};