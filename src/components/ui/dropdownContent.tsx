export default function DropdownContent({ items }: { items: any }) {
	return (
		<>
			<ul
				tabIndex={0}
				className="dropdown-content absolute w-full mt-3 flex flex-col p-2 rounded-lg bg-base-200 select-none border border-neutral"
			>
				{items.map((item: any, index: number) => (
					<li
						key={index}
						onClick={item.action}
						className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-secondary-content text-primary active:scale-[0.98]"
					>
						{item.icon}
						{item.item}
					</li>
				))}
			</ul>
		</>
	)
}
