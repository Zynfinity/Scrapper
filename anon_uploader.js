const FormData = require('form-data');
const axios = require('axios')
const fs = require('fs')
exports.upload = async(path) => {
	return new Promise((resolve,reject) => {
		const bodyForm = new FormData();
		bodyForm.append('file', fs.createReadStream(path))
		axios(`https://api.anonfiles.com/upload`,{
			method: 'POST',
			data: bodyForm,
			headers: {
				"accept": "*/*",
				"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
			}
		}).then(({ data }) => {
        	console.log(data)
			resolve(data)
		})
	})
}
