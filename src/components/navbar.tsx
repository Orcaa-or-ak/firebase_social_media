import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
	const [user] = useAuthState(auth); // Get the current user

	const signUserOut = async () => {
		await signOut(auth);
	};

	return (
		<div className="NavBar">
			<div className="NavLink">
				<Link to="/">Home</Link>
				{!user ? (
					<Link to="/login">Login</Link>
				) : (
					<Link to="/createpost">Create post</Link>
				)}
			</div>
			<div className="UserDisplay">
				{user && (
					<>
						<p className="Username">{user?.displayName}</p>
						<img
							className="ProfilePic"
							src={user?.photoURL || ""}
							width="100"
							height="100"
							alt=""
						/>
						<button onClick={signUserOut}>Log out</button>
					</>
				)}
			</div>
		</div>
	);
};
