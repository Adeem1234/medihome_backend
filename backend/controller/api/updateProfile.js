const User = require('../../model/User');

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

    }
    // mydetails: async (req, res, next) => {
    //     try {
    //         const date = new Date(Date.now());
    //         const user = await User.findById(req.user._id).populate({ path: 'friends', select: 'userName avatar unique_id _id name', model: 'users' }).populate({ path: 'bannedUsers', select: 'userName avatar unique_id _id name', model: 'users' }).select('-email -password -role');
    //         const calls = await Call.find({ user: req.user._id }).countDocuments();
    //         const callsToday = await Call.find({ user: req.user._id, date: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') } });
    //         let time = '';
    //         if (callsToday.length) {
    //             time = callsToday[callsToday.length - 1].date;
    //         }
    //         return res.status(200).send({ data: { user, time, calls, callsToday: callsToday.length } });
    //     } catch (err) { return res.status(400).send({ data: { message: err } }); }
    // },
    // userDetails: async (req, res) => {
    //     try {
    //         const { id } = req.body;
    //         const user = await User.findById(id).populate({ path: 'friends', select: 'userName avatar unique_id _id name', model: 'users' }).populate({ path: 'bannedUsers', select: 'userName avatar unique_id _id name', model: 'users' }).populate({ path: 'reviews', select: '-to', model: 'reviews', populate: { path: 'from', model: 'users', select: 'userName avatar unique_id _id name' }, options: { sort: { date: -1 }, limit: 3 }, }).select('-email -password -role');
    //         const checkFriend = await User.findOne({ _id: req.user._id, friends: user._id });
    //         const checkPending = await FriendRequests.findOne({ from: user._id, to: req.user._id });
    //         const checkSent = await FriendRequests.findOne({ to: user._id, from: req.user._id });
    //         if (checkFriend) status = 'Friends';
    //         else if (checkPending) status = 'Accept';
    //         else if (checkSent) status = 'Pending';
    //         else status = 'Add';
    //         return res.status(200).send({ data: { user, status } });
    //     } catch (err) { return res.status(400).send({ data: { message: err } }); }
    // },
    // SaveReviews: async (req, res) => {
    //     try {
    //         const { userId, review } = req.body;
    //         const reviews = new Reviews({ from: req.user._id, to: userId, review: review });
    //         await reviews.save();
    //         console.log(reviews)
    //         const user = await User.findByIdAndUpdate(userId, { $push: { reviews: reviews._id } }, { new: true }).select('reviews');
    //         return res.status(200).send({ data: { reviews, user } });
    //     } catch (err) {
    //         throw err;
    //         return res.status(400).send({ data: { message: err } });
    //     }
    // },
    // GetReviews: async (req, res) => {
    //     try {
    //         let pages, Id;
    //         console.log(req.body.userId)
    //         if (req.body.userId !== undefined || req.body.userId === '') {
    //             Id = req.body.userId;
    //         } else {
    //             Id = req.user._id;
    //         }
    //         perPage = 10;
    //         let page = req.body.page || 1;
    //         console.log('user Id' + req.user._id)
    //         console.log('id: ' + Id)
    //         Reviews.find({ to: Id }).countDocuments().exec((err, count) => {
    //             pages = Math.ceil(count / perPage);
    //         });
    //         Reviews.find({ to: Id }).sort({ date: -1 }).skip(perPage * page - perPage).limit(perPage).select('-to').populate({ path: 'from', select: 'userName name avatar unique_id', model: 'users' })
    //             .exec(async (err, reviews) => {
    //                 console.log(reviews.to)
    //                 if (err) return res.status(400).send({ data: { error: err } });
    //                 return res.status(200).send({ data: { reviews, pages } });
    //             });
    //     } catch (err) {
    //         throw err;
    //         return res.status(400).send({ data: { message: err } });
    //     }
    // },

    // settings: async (req, res, next) => {
    //     try {
    //         let rawdata = fs.readFileSync(url);
    //         console.log(rawdata)
    //         let settings = JSON.parse(rawdata);
    //         console.log(settings)
    //         return res.status(200).send({ data: { settings } });
    //     } catch (err) { return res.status(400).send({ data: { message: err } }); }
    // },

    // } catch (err) {
    //     return res.status(400).send({ data: { message: err } });
    // }
    // },
    //     updateColor: async (req, res, next) => {
    //         const { color } = req.body;
    //         try {
    //             const user = await User.findByIdAndUpdate(req.user._id, { color: color }, { new: true }).select('-email -password -role');
    //             return res.status(200).send({ data: { user: user } });
    //         } catch (error) {
    //             return res.status(400).send({ data: { message: error } });
    //         }
    //     },
    //     updateAvatar: async (req, res, next) => {
    //         const { avatar } = req.body;
    //         try {
    //             const user = await User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true }).select('-email -password -role');
    //             return res.status(200).send({ data: { user: user } });
    //         } catch (error) {
    //             return res.status(400).send({ data: { message: error } });
    //         }
    //     },
    //     updateProfile: async (req, res, next) => {
    //         const { profile_answers, age } = req.body;
    //         let userName = req.body.userName.toLowerCase();
    //         try {
    //             let user = await User.findByIdAndUpdate(req.user._id, { userName: userName, profile_answers: profile_answers, age: age }, { new: true })
    //                 .populate({ path: 'friends', select: 'userName avatar unique_id _id name', model: 'users' }).select('-email -password -role');
    //             return res.status(200).send({ data: { user } });
    //         } catch (err) {
    //             return res.status(400).send({ data: { message: err } });
    //         }
    //     },
};