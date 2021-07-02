const Pharmacies = require('../../model/PharmaciesModel');
const CitiesModel = require('../../model/CitiesModel');

module.exports = {
    get: async (req, res, next) => {
        try {
            const pharmacies = await Pharmacies.find({});
            res.status(200).render('pharmaciesList', { pharmacies });
        } catch (error) { res.status(400).send({ data: { message: error } }); }
    },
    show: async (req, res, next) => {
        try {
            const cities = await CitiesModel.find({}).populate('areas');
            return res.render('pharmacyAdd', { cities });
        } catch (error) { res.status(400).send({ data: { message: error } }); }
    },
    add: async (req, res, next) => {
        try {
            const { name, city, area } = req.body;
            const oldPharmacies = await Pharmacies.findOne({ name: name, city: city, area: area });
            if (oldPharmacies) {
                res.status(400).send('Pharmacy already exists');
            } else {
                const pharmacy = new Pharmacies({ name: name, city: city, area: area });
                await pharmacy.save();
                res.redirect('/admin/pharmacies');
            }
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
    edit: async (req, res, next) => {
        const { id } = req.params;
        try {
            const pharmacy = await Pharmacies.findById(id);
            res.status(200).render('pharmacyEdit', { pharmacy });
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const { name, city, area } = req.body;
        try {
            await Pharmacies.findByIdAndUpdate(id, { name: name, city: city, area: area });
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
    
};