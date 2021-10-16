const urlSupporter = require('../models/url-supporter.model');

const urlSupporterAndCoounter = async (req, res, next) => {
    try {
        let path = req.url;
        let urlFields = {
            urlPath: path
        };
        const urlDetails = await urlSupporter.findOne(urlFields).exec();
        if (urlDetails) {
            let updateUrlFields = {
                counter: urlDetails.counter + 1
            }

            await urlSupporter.updateOne(
                { urlPath: urlDetails.urlPath },
                { $set: updateUrlFields }
            ).then((updateUrlData) => {
                res.json({
                    status: 'success',
                    message: 'Similar path found. Counter updated.',
                    data: {
                        path: urlDetails.urlPath,
                        counter: updateUrlFields.counter
                    }
                })
            });;

        } else {

            urlFields.counter = 1;
            const newUrlSupporter = new urlSupporter(urlFields);
            newUrlSupporter.save().then((urlData) => {
                res.json({
                    status: 'success',
                    message: 'Path saved.',
                    data: urlData
                })
            });

        }

    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

module.exports.urlSupporterAndCoounter = urlSupporterAndCoounter;
