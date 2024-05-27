require('dotenv').config()

const { MongoClient } = require('mongodb')
const config = require('../config/config')

async function connect() {
	const uri = config.MONGODB_URI

	const client = new MongoClient(uri)

	try {
		await client.connect()

		await listDatabases(client)
	} catch (e) {
		console.error('Error initializing cluster:', e)
	} finally {
		await client.close()
	}
}
connect().catch(console.error)

async function listDatabases(client: any) {
	const databasesList = await client.db().admin().listDatabases()

	console.log('Databases:')
	databasesList.databases.forEach((db: any) => {
		console.log(`- ${db.name}`)
	})
}
