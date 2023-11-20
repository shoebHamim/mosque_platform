const mosqueEdit = require('../model/mosqueEdit')


const updateMosque = async (req, res) => {
    try {
        
        if (!req?.params?.id) {
            return res.status(400).json({'message': 'Mosque id required.'});
        }
        // Call mosqueUpdate with the mosque document and the request body
        const result = await mosqueEdit(req.params.id, req.body);

        res.json(result);
    } catch (error) {
        console.error('Error updating mosque:', error);
        res.status(500).json({'message': 'Internal Server Error'});
    }

}

module.exports = updateMosque
