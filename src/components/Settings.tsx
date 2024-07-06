export default function Settings() {
	return (
		<>
			<dialog id="settings_modal" className="modal">
				<div className="modal-box bg-base-100">
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								✕
							</button>
						</form>
					</div>

					<div>
						<ul>
							<li>General</li>
							<li></li>
							<li>Security</li>
						</ul>
					</div>
				</div>
			</dialog>
		</>
	)
}
