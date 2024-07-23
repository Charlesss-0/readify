import { LuUserCircle } from 'react-icons/lu'
import { RootState } from '../lib'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Profile() {
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const [imgError, setImgError] = useState<boolean>(false)

	return (
		<>
			<dialog id="profile_modal" className="modal">
				<div className="modal-box bg-base-100">
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
						</form>
					</div>

					<div className="flex flex-col gap-10 items-center">
						{currentUser && (
							<>
								{imgError ? (
									<LuUserCircle className="w-16 h-16" />
								) : (
									<img
										src={currentUser.photoURL}
										alt={currentUser.displayName}
										className="w-28 rounded-full"
										onError={() => setImgError(true)}
									/>
								)}

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
