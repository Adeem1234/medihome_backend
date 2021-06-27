const Pharmacies = require('../../../model/pharmacies');
const Cities = require('../../../model/cities');

module.exports = {
    get: async (req, res, next) => {
        try {
            const pharmacies = await Pharmacies.find({});
            res.status(200).render('pharmaciesList', { pharmacies });
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
    show: async (req, res, next) => {
        const cities = await Cities.find({}).populate('areas')
        res.render('pharmacyAdd', { cities });
    },
    add: async (req, res, next) => {
        const { name, location } = req.body;
        try {
            const oldPharmacies = await Pharmacies.findOne({ name: name, location: location });
            if (oldPharmacies) {
                res.status(400).send('Pharmacy already exists');
            } else {
                const pharmacy = new Pharmacies({ name: name, location: location });
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
        const { name, location } = req.body;
        try {
            await Pharmacies.findByIdAndUpdate(id, { name: name, location: location });
            return res.status(200).redirect('/admin/pharmacies');
        } catch (error) {
            // throw error
            res.status(400).send({ data: { message: error } });
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await Pharmacies.findByIdAndRemove(id);
            res.status(200).redirect('/admin/pharmacies');
        } catch (error) {
            res.status(400).send({ data: { message: error } });
        }
    },
};