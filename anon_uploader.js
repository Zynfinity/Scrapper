const FormData = require('form-data');
const axios = require('axios');
const fs = require("fs");
const { fromBuffer } = require('file-type');
exports.upload = async (buffer, nama) => {
	return new Promise((resolve, reject) => {
		if(!nama){
			return resolve('Nama tidak diisi')
		}
		fromBuffer(buffer).then(cek_file => {
			fs.writeFileSync(`./media/${nama}.${cek_file.ext}`, buffer)
			const bodyForm = new FormData();
			bodyForm.append('file', fs.createReadStream(`./media/${nama}.${cek_file.ext}`))
			axios(`https://api.anonfiles.com/upload`, {
				method: 'POST',
				data: bodyForm,
				headers: {
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
					"content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
				}
			}).then(({
				data
			}) => {
				console.log(data)
				resolve(data)
			})
		})
	})
}
exports.uploadFromPath = async (path) => {
	return new Promise((resolve, reject) => {
		const bodyForm = new FormData();
		bodyForm.append('file', fs.createReadStream(path))
		axios(`https://api.anonfiles.com/upload`, {
			method: 'POST',
			data: bodyForm,
			headers: {
				"accept": "*/*",
				"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
			}
		}).then(({
			data
		}) => {
			console.log(data)
			resolve(data)
		})
	})
}
