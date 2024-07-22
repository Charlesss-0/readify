import connect from '../config/connectToMongo'

export async function GET(req: Request) {
	const userUid = new URL(req.url).searchParams.get('userUid')

	if (!userUid) {
		return Response.json(
			{ message: 'No user UID provided' },
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}

	try {
		const client = await connect
		const db = client.db('books')

		const cursor = db.collection('favorites').find({ userUid })
		const result = await cursor.toArray()

		return Response.json(result, {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		return Response.json(
			{ message: error },
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}
}

export async function POST(req: Request) {
	const body = await req.json()

	const document = {
		userUid: body.userUid,
		key: body.key,
		title: body.title,
	}

	try {
		const client = await connect
		const db = client.db('books')

		await db.collection('favorites').insertOne(document)

		return Response.json(
			{ message: 'Document added to favorites' },
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	} catch (error) {
		return Response.json(
			{ message: error },
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}
}

export async function DELETE(req: Request) {
	const userUid = new URL(req.url).searchParams.get('userUid')
	const bookId = new URL(req.url).searchParams.get('bookId')

	if (!userUid || !bookId) {
		return Response.json(
			{ message: 'No user UID or book ID provided' },
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}

	const document = {
		userUid: userUid,
		key: bookId,
	}

	try {
		const client = await connect
		const db = client.db('books')

		const result = await db.collection('favorites').deleteOne(document)

		if (result.deletedCount === 0) {
			return Response.json(
				{ message: 'Document not found or already deleted' },
				{
					status: 404,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		return Response.json(
			{ message: 'Document deleted' },
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	} catch (error) {
		return Response.json(
			{ message: error },
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}
}
