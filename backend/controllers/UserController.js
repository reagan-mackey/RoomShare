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
            query.city = city;
        }

        if (state) {
            query.state = state;
        }

        if (gender) {
            query.gender = gender;
        }

        if (major) {
            query.major = major;
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