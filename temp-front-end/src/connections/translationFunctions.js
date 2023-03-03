/**
* This file will contain a functions that will fetch appropriate routes to use Google Translate API
* @author Aaron Su - 930006201
*/

/**
  * Translates the first given parameter into the language of second give parameter
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} text - text to be translated
  * @param {string} targetLanguage - language to be translated into
  * @return {json} - data of translated text
  */
async function translate(text, targetLanguage) {  
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: text, targetLanguage: targetLanguage})
    }
    const response = await fetch('http://localhost:2000/api/v1/apis/translate', request)
    const data = await response.json()
    // const translation = data[0]
    return data
}

export {
    translate
}
