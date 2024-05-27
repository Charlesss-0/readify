import { ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

import s3 from '@/server/config/aws-config'

const Bucket = process.env.S3_BUCKET_NAME

export async function GET() {
	const response = await s3.send(new ListObjectsCommand({ Bucket }))
	return NextResponse.json(response?.Contents ?? [])
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

		return NextResponse.json({ message: 'File uploaded successfully', data })
	} catch (e: any) {
		console.error('Error uploading file', e)
		return NextResponse.json({ message: e.message }, { status: 500 })
	}
}
