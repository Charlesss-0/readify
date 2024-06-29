import {
	GetObjectCommand,
	ListObjectsCommand,
	PutObjectCommand,
} from '@aws-sdk/client-s3'

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3 from '../config/aws.config'

const Bucket = process.env.S3_BUCKET_NAME as string

export async function GET(req: Request) {
	try {
		const url = new URL(req.url)
		const userUid = url.searchParams.get('userUid')

		if (!userUid) {
			return Response.json({ message: 'No user UID provided' }, { status: 400 })
		}

		const response = await s3.send(new ListObjectsCommand({ Bucket }))
		const contents = response?.Contents ?? []

		const userObjects = contents.filter((item: any) => item.Key.startsWith(`${userUid}/`))
		if (!userObjects || userObjects.length === 0) {
			return Response.json(
				{ message: 'No matching user objects found!' },
				{ status: 404 }
			)
		}

		const signedUrls = await Promise.all(
			userObjects.map(async (item: any) => {
				const command = new GetObjectCommand({
					Bucket,
					Key: item.Key,
				})

				const signedUrl = await getSignedUrl(s3, command, {
					expiresIn: 3600,
				})

				return {
					Key: item.Key,
					LastModified: item.LastModified.toISOString(),
					ETag: item.ETag,
					Size: item.Size,
					StorageClass: item.StorageClass,
					Url: signedUrl,
				}
			})
		)

		const res = Response.json(signedUrls)
		res.headers.set('Access-Control-Allow-Origin', '*')
		res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
		res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')

		return res
	} catch (error: any) {
		return Response.json({ message: error.message }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File
		const userUid = formData.get('userUid') as string

		if (!file) {
			return Response.json({ error: 'No file provided' }, { status: 400 })
		}

		if (!userUid) {
			return Response.json({ error: 'No user uid provided' }, { status: 400 })
		}

		const Body = Buffer.from(await file.arrayBuffer())
		const Key = `${userUid}/${Date.now().toString()}-${file.name}`

		const uploadParams = { Bucket, Key, Body }

		const data = await s3.send(new PutObjectCommand(uploadParams))

		const res = Response.json({ message: 'File uploaded successfully', data })
		res.headers.set('Access-Control-Allow-Origin', '*')
		res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
		res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')

		return res
	} catch (error: any) {
		return Response.json({ message: error.message }, { status: 500 })
	}
}
