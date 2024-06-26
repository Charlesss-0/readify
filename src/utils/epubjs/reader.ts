import Epub from 'epubjs'

export default class Reader {
	private bookTitle: string = ''
	private bookCover: string = ''

	constructor() {
		this.renderBook = this.renderBook.bind(this)
		this.getBookCover = this.getBookCover.bind(this)
		this.getBookTitle = this.getBookTitle.bind(this)
	}

	public async renderBook(bookURL: string): Promise<void> {
		try {
			if (!bookURL) {
				console.error('No book URL specified')
				return
			}

			const res = await fetch(bookURL)
			if (!res.ok) {
				console.error('Failed to fetch book', res)
				return
			}
			const blob = await res.blob()
			const bufferURL = await blob.arrayBuffer()

			const book = Epub(bufferURL, {
				requestHeaders: { 'Access-Control-Allow-Origin': '*' },
				openAs: 'binary',
			})

			await book.ready

			this.bookCover = (await book.coverUrl()) as string
			this.bookTitle = book.packaging.metadata.title
		} catch (e: any) {
			console.error(e.message)
		}
	}

	public getBookCover(): string {
		return this.bookCover
	}

	public getBookTitle(): string {
		return this.bookTitle
	}
}
