/**
* This file will contain a controller functions that use Google Translate API for translation
* @author Aaron Su - 930006201
*/

const {Translate} = require('@google-cloud/translate').v2
require('dotenv').config();
const TRANSLATE_CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

/**
 * Gets a request and run the according queries to translate text received in request to language received in request
 * 
 * @param req request
 * @param res response
 * @return {string} translated text
 */
const translateText = async (req, res, next) => {
    const targetLanguage = req.body.targetLanguage;
    const text = req.body.text;
    const translate = new Translate({
        credentials: TRANSLATE_CREDENTIALS,
        projectId: TRANSLATE_CREDENTIALS.project_id
    });

    try {
        let [response] = await translate.translate(text, targetLanguage);
        res.status(200).json(response);
    } catch (error) {
        return 0;
    }
};

module.exports = {
    translateText
};
