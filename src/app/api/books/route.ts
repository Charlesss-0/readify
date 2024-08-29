import {
	CompleteMultipartUploadCommand,
	CreateMultipartUploadCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	ListObjectsCommand,
	PutObjectCommand,
	UploadPartCommand,
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
			return Response.json({ message: 'No matching user objects found!' }, { status: 404 })
		}

		const signedUrls = await Promise.all(
			userObjects.map(async (item: any) => {
				const command = new GetObjectCommand({
					Bucket,
					Key: item.Key,
				})

				const signedUrl = await getSignedUrl(s3, command, {
					expiresIn: 3600 * 24,
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

		return Response.json(signedUrls, {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type,Authorization',
			},
		})
	} catch (error: any) {
		return Response.json({ message: error.message }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File
		const userUid = formData.get('userUid') as string

		if (!file || !userUid) {
			return Response.json(
				{ error: 'Upload parameters not met: missing file or UID' },
				{ status: 400 }
			)
		}

		const Body = Buffer.from(await file.arrayBuffer())
		const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.epub`
		const Key = `${userUid}/${uniqueFileName}`

		const createUploadCommand = {
			Bucket,
			Key,
		}

		const createMultipartUploadCommand = new CreateMultipartUploadCommand(createUploadCommand)
		const multipartUploadData = await s3.send(createMultipartUploadCommand)

		const partSize = 5 * 1024 * 1024
		const partCount = Math.ceil(Body.length / partSize)
		const uploadPromises = []

		for (let partNumber = 0; partNumber < partCount; partNumber++) {
			const start = partNumber * partSize
			const end = Math.min(start + partSize, Body.length)

			const partParams = {
				Bucket,
				Key,
				PartNumber: partNumber + 1,
				UploadId: multipartUploadData.UploadId,
				Body: Body.slice(start, end),
			}

			const uploadPartCommand = new UploadPartCommand(partParams)
			uploadPromises.push(s3.send(uploadPartCommand))
		}

		const uploadedParts = await Promise.all(uploadPromises)
		const completeUploadParams = {
			Bucket,
			Key,
			UploadId: multipartUploadData.UploadId,
			MultipartUpload: {
				Parts: uploadedParts.map((part, index) => ({
					ETag: part.ETag,
					PartNumber: index + 1,
				})),
			},
		}

		const completeMultipartUploadCommand = new CompleteMultipartUploadCommand(completeUploadParams)
		const data = await s3.send(completeMultipartUploadCommand)

		return Response.json(
			{ message: 'File uploaded successfully', data },
			{
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type,Authorization',
				},
			}
		)
	} catch (error: any) {
		return Response.json({ message: error.message }, { status: 500 })
	}
}

export async function DELETE(req: Request) {
	const url = new URL(req.url)
	const userUid = url.searchParams.get('userUid')
	const bookId = url.searchParams.get('bookId')

	if (!userUid || !bookId) {
		return Response.json({ message: 'Missing parameters' }, { status: 400 })
	}

	const Key = `${userUid}/${bookId}`

	const command = new DeleteObjectCommand({
		Bucket,
		Key,
	})

	try {
		const response = await s3.send(command)

		return Response.json(
			{ message: 'File deleted successfully', response },
			{
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type,Authorization',
				},
			}
		)
	} catch (error: any) {
		return Response.json({ message: error.message }, { status: 500 })
	}
}
