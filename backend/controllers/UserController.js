const addUser = (User) =>
    ({ id, email, firstName, lastName, profilePhoto }) => {
        const user = new User({
            id,
            email,
            firstName,
            lastName,
            profilePhoto,
        });
        return user.save();
    };

const getUsers = (User) => () => {
    return User.find({});
};

const getUserByEmail = (User) =>
    async ({ email }) => {
        return await User.findOne({ email });
    };

const getUserById = (User) =>
    async (id) => {
        const user = await User.findOne({ id });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };

const getUsersBySearch = (User) =>
    async (city, state, gender, major, startDate, endDate) => {
        const query = {};

        if (city) {
            query.city = { $regex: new RegExp("^" + city + "$", "i") };
        }

        if (state) {
            query.state = { $regex: new RegExp("^" + state + "$", "i") };
        }

        if (gender) {
            query.gender = { $regex: new RegExp("^" + gender + "$", "i") };
        }

        if (major) {
            query.major = { $regex: new RegExp("^" + major + "$", "i") };
        }

        if (startDate) {
            query.startDate = startDate;
        }

        if (endDate) {
            query.endDate = endDate;
        }

        return await User.find(query);
    };

const updateUser = (User) =>
    async (id, updateFields) => {
        const updatedUser = await User.findOneAndUpdate({ id: id }, updateFields, { new: true });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    };

module.exports = (User) => {
    return {
        addUser: addUser(User),
        getUsers: getUsers(User),
        getUserByEmail: getUserByEmail(User),
        getUserById: getUserById(User),
        getUsersBySearch: getUsersBySearch(User),
        updateUser: updateUser(User),
    };
};