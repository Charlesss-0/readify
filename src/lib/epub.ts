import Epub, { Book } from 'epubjs'
import React, { createRef } from 'react'

export default class EpubReader {
	private viewerRef = createRef<HTMLDivElement>()
	private rendition: any = null
	private bookTitle: string = ''
	private bookCover: string = ''
	private currentSection: number = 0
	private currentPage: number = 0
	private pageWidth: number = 0

	constructor() {
		this.renderBook = this.renderBook.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.next = this.next.bind(this)
		this.previous = this.previous.bind(this)
		this.setViewerRef = this.setViewerRef.bind(this)
		this.getViewerRef = this.getViewerRef.bind(this)
		this.getBookCover = this.getBookCover.bind(this)
		this.getBookTitle = this.getBookTitle.bind(this)
	}

	public async renderBook(bookURL: string): Promise<void> {
		try {
			if (!bookURL) {
				console.error('No book URL specified')
				return
			}

			const response = await fetch(bookURL)
			if (!response.ok) {
				console.error('Failed to fetch book:', response.statusText)
				return
			}
			const blob = await response.blob()
			const bufferURL = await blob.arrayBuffer()

			const book = Epub(bufferURL, {
				requestHeaders: { 'Access-Control-Allow-Origin': '*' },
				openAs: 'binary',
			})

			await book.ready

			const cover: string = (await book.coverUrl()) as string
			const title: string = book.packaging.metadata.title

			this.bookCover = cover
			this.bookTitle = title

			if (this.viewerRef.current) {
				const options = {
					flow: 'paginated',
					width: '100%',
					height: '100%',
					fullsize: true,
				}

				this.rendition = book.renderTo(this.viewerRef.current, options)
				await this.rendition.display(this.currentSection)

				this.pageWidth = this.viewerRef.current?.clientWidth || 0

				this.rendition.on('rendered', () => {
					this.rendition.themes.default({
						body: {
							background: '#F8F6E3 !important',
							color: '#584434 !important',
						},
						'::selection': {
							background: '#561C2455',
						},
						h1: {
							'font-size': '2rem !important',
						},
						h2: {
							'font-size': '2rem !important',
						},
						p: {
							'font-size': '1.5rem !important',
							margin: '1rem 0 !important',
							border: 'none !important',
							'text-align': 'justify !important',
							'text-indent': '0 !important',
						},
						span: {
							'font-family': 'inherit !important',
							'font-size': '1.5rem !important',
							color: 'inherit !important',
							'text-indent': '0 !important',
						},
						div: {
							'font-size': '1.5rem',
							margin: '1rem 0 !important',
							'text-align': 'justify !important',
							'text-indent': '0 !important',
						},
					})
				})
			}
		} catch (e: any) {
			console.error(e.message)
		}
	}

	public onKeyDown(e: KeyboardEvent): void {
		if (e.key === 'ArrowRight') {
			this.next()
		} else if (e.key === 'ArrowLeft') {
			this.previous()
		}
	}

	public async next(): Promise<void> {
		try {
			if (this.rendition && this.viewerRef.current) {
				if (
					(this.currentPage + 1) * this.pageWidth >=
					this.viewerRef.current.scrollWidth
				) {
					const nextSection = this.currentSection + 1
					await this.rendition.display(nextSection)
					this.currentSection = nextSection
					this.currentPage = 0
				} else {
					this.currentPage += 1
					const scrollAmount = this.currentPage * this.pageWidth
					this.viewerRef.current.scrollTo({
						left: scrollAmount,
						behavior: 'smooth',
					})
				}
			}
		} catch (e: any) {
			console.error('Error updating to next section:', e.message)
		}
	}

	public async previous(): Promise<void> {
		try {
			if (this.rendition && this.viewerRef.current) {
				if (this.currentPage === 0) {
					const prevSection = this.currentSection - 1
					await this.rendition.display(prevSection)
					this.currentSection = prevSection
					this.currentPage = 0
				} else {
					this.currentPage -= 1
					const scrollAmount = this.currentPage * this.pageWidth
					this.viewerRef.current.scrollTo({
						left: scrollAmount,
						behavior: 'smooth',
					})
				}
			}
		} catch (e: any) {
			console.error('Error updating to previous section:', e.message)
		}
	}

	public getViewerRef(): React.RefObject<HTMLDivElement> {
		return this.viewerRef
	}

	public setViewerRef(ref: React.RefObject<HTMLDivElement>): void {
		this.viewerRef = ref
	}

	public getBookCover(): string {
		return this.bookCover
	}

	public getBookTitle(): string {
		return this.bookTitle
	}
}
