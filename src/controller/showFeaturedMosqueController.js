const displayFeaturedMosques = require('../view/displayFeaturedMosques');
const FindFeaturedMosques = require('../model/findFeaturedMosques');
require('@babel/register')({
    presets: ['@babel/preset-react'],
});

const findMosques = async (req, res) => {
    try {
        const featuredMosques = await FindFeaturedMosques();

        if (!featuredMosques || featuredMosques.length === 0) {
            return res.status(204).json({'message': 'No mosques found.'});
        }

        // Render the React component to HTML using server-side rendering
        const result = displayFeaturedMosques(featuredMosques)

        res.send(result);
    } catch (error) {
        console.error('Error finding mosques:', error);
        res.status(500).json({'message': 'Internal Server Error'});
    }
};

module.exports = {
    findMosques
};
