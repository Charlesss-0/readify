interface Book {
	id: string
	url: string
	cover: string
	title: string
}

interface S3File {
	Key: string
	LastModified: string
	ETag: string
	Size: number
	StorageClass: string
	Url: string
}
