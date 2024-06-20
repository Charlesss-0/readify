import { ReactNode } from 'react'

interface ItemType {
	item: string
	icon?: ReactNode
}

interface DropdownContentProps {
	items: ItemType[]
}

export default function DropdownContent({ items }: DropdownContentProps) {
	return (
		<>
			<ul
				tabIndex={0}
				className="dropdown-content absolute w-full placeholder: mt-3 flex flex-col gap- p-2 rounded-lg bg-primary select-none border border-neutral"
			>
				{items.map((item, index) => (
					<li
						key={index}
						className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-neutral active:scale-[0.98]"
					>
						{item.icon}
						{item.item}
					</li>
				))}
			</ul>
		</>
	)
}
