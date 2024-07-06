import { RootState } from '../lib'
import { useSelector } from 'react-redux'

export default function Profile() {
	const { currentUser } = useSelector((state: RootState) => state.auth)

	return (
		<>
			<dialog id="profile_modal" className="modal">
				<div className="modal-box bg-base-100">
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								✕
							</button>
						</form>
					</div>

					<div className="flex flex-col gap-10 items-center">
						{currentUser && (
							<>
								<img
									src={currentUser.photoURL}
									alt={currentUser.displayName}
									className="w-28 rounded-full"
								/>

								<div className="w-full">
									<p>Your name</p>
									<p className="text-[1.3rem]">{currentUser.displayName}</p>
								</div>

								<div className="w-full">
									<p>Your email</p>
									<p className="text-[1.3rem]">{currentUser.email}</p>
								</div>
							</>
						)}
					</div>
				</div>
			</dialog>
		</>
	)
}
