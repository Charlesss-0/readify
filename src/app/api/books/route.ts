import {
	GetObjectCommand,
	ListObjectsCommand,
	PutObjectCommand,
} from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3 from '@/server/config/aws-config'

const Bucket = process.env.S3_BUCKET_NAME as string

export async function GET() {
	try {
		const response = await s3.send(new ListObjectsCommand({ Bucket }))
		const contents = response?.Contents ?? []

		const signedUrls = await Promise.all(
			contents.map(async (item: any) => {
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

		const res = NextResponse.json(signedUrls)
		res.headers.set('Access-Control-Allow-Origin', '*')
		res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
		res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')

		return res
	} catch (error: any) {
		console.error('Error fetching from S3:', error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 })
		}

		const Body = Buffer.from(await file.arrayBuffer())
		const Key = `${Date.now().toString()}-${file.name}`

		const uploadParams = { Bucket, Key, Body }

		const data = await s3.send(new PutObjectCommand(uploadParams))

		const res = NextResponse.json({ message: 'File uploaded successfully', data })
		res.headers.set('Access-Control-Allow-Origin', '*')
		res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
		res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')

		return res
	} catch (e: any) {
		console.error('Error uploading file', e)
		return NextResponse.json({ message: e.message }, { status: 500 })
	}
}
