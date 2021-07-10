const User = require('../../model/UsersModel');
// const Reviews = require('../../model/reviews');
// const Call = require('../../model/calls');
// const Settings = require('../../model/setting');
// const FriendRequests = require('../../model/friendRequests');
const fs = require('fs');
// let url = './public/settings/setting.json';
const moment = require('moment');
const Cities = require('../../model/CitiesModel');
const Areas = require('../../model/AreasModel');
const PharmaciesModel = require('../../model/PharmaciesModel');
const LaboratoriesModel = require('../../model/LaboratoriesModel');


module.exports = {
    addCitynArea: async (req, res, next) => {
        try {
            const { city, area } = req.body
            const getCity = await Cities.find({ name: city });
            if (getCity) {
                const newArea = new Areas({ name: area });
                await newArea.save();
                const updateCity = await Cities.findById(getCity._id).push({ area: newArea._id });
                const user = await User.findByIdAndUpdated(req.user._id, { area: newArea._id, city: updateCity._id, profileUpdated: true });
                return res.status(200).send({ user: user, message: 'new area Added' })
            }
            else {
                const newArea = new Areas({ name: area });
                await newArea.save();
                const newCity = await Cities({ name: city, area: newArea._id });
                await newCity.save();
                const user = await User.findByIdAndUpdated(req.user._id, { area: newArea._id, city: newCity._id, profileUpdated: true });
                return res.status(200).send({ user: user, message: 'new city and area Added' });
            }
        } catch (error) {
            return res.status(401).send({ error })
        }
    },
    getUpdateProfile: async (req, res, next) => {
        try {
            const cities = await Cities.find({}).populate('areas');
            return res.status(200).send({ cities });
        } catch (error) {
            return res.status(401).send({ error })
        }
    },
    updateprofile: async (req, res, next) => {

    },
    Dashboard: async (req, res) => {
        try {
            // const { city, area } = req.user
            const pharmacies = await PharmaciesModel.find({})
                .populate({ path: 'city', model: 'cities', select: 'name' })
                .populate({ path: 'area', model: 'areas' })
                .populate({ path: 'medicines.medicine', model: 'medcines' });
            const laboratories = await LaboratoriesModel.find({}).populate({ path: 'city', model: 'cities' })
            return res.status(200).send({ pharmacies, laboratories })
        } catch (err) {
            return res.status(400).send({ msg: err })
        }
    },
    getCities: async (req, res) => {
        try {
            const cities = await Cities.find({}).populate('areas');
            return res.status(200).send({ cities })
        } catch (error) {
            return res.status(400).send({ error })
        }
    }
};