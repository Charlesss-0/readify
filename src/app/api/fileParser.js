const { Upload } = require('@aws-sdk/lib-storage')
const { S3Client, S3 } = require('@aws-sdk/client-s3')

const formidable = require('formidable')
const { Transform } = require('stream').Transform

const parseFile = async req => {
	return new Promise((resolve, reject) => {
		let options = {
			maxFileSize: 100 * 1024 * 1024,
			allowEmptyFiles: false,
		}

		const form = formidable(options)

		form.parse(req, (err, fields, files) => {})

		form.on('error', error => {
			reject(error.message)
		})

		form.on('data', data => {
			if (data.name === 'successUpload') {
				resolve(data.value)
			}
		})

		form.on('fileBegin', (formName, file) => {
			file.open = async () => {
				this._writeStream = new Transform({
					transform(chunk, enconding, callback) {
						callback(null, chunk)
					},
				})

				this._writeStream.on('error', e => {
					form.emit('error', e)
				})
			}
		})
	})
}

module.exports = parseFile
