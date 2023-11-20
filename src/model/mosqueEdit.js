const dbConnect = require('../config/dbConnect');

const mosqueEdit = async ({id, requestBody}) => {
    try {
        const client = await dbConnect();
        const dbName = 'mosque-platform';
        const collectionName = 'mosques';
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const mosque = await collection.findOne({ _id: id }).exec();

        if (!mosque) {
            return {'message': 'No mosque matches ID.'}
        }
        // Update mosque properties based on the request body
        if (requestBody?.name !== '') mosque.name = requestBody.name;
        if (requestBody?.address !== '') mosque.address = requestBody.address;
        if (requestBody?.imamName !== '') mosque.imamName = requestBody.imamName;
        if (requestBody?.contactNo !== '') mosque.contactNo = requestBody.contactNo;
        if (requestBody?.email !== '') mosque.email = requestBody.email;
        if (requestBody?.description !== '') mosque.description = requestBody.description;
        if (requestBody?.photo[0] !== null) mosque.photo[0] = requestBody.photo[0];
        if (requestBody?.photo[1] !== null) mosque.photo[1] = requestBody.photo[1];
        if (requestBody?.photo[2] !== null) mosque.photo[2] = requestBody.photo[2];
        console.log(mosque.name)
        console.log(mosque.description)

        // Save the updated mosque document
        const result = await mosque.save();
        return result;
    } catch (error) {
        console.error('Error updating mosque in model:', error);
        throw error; // Rethrow the error for handling in the controller
    }
};

module.exports = {
    mosqueEdit
}

