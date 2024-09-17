import {
	addDoc,
	getDocs,
	collection,
	query,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Posts as IPost } from "./main";
import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";

interface Props {
	post: IPost;
}

interface Like {
	likeId: string;
	userId: string;
}

export const Post = (props: Props) => {
	const { post } = props;
	const [user] = useAuthState(auth);

	const [likes, setLikes] = useState<Like[] | null>(null);

	const likeRef = collection(db, "likes");

	const likeDoc = query(likeRef, where("postId", "==", post.id));

	const addLike = async () => {
		try {
			const newDoc = await addDoc(likeRef, {
				userId: user?.uid,
				postId: post.id,
			});
			if (user) {
				setLikes((prev) =>
					prev
						? [...prev, { userId: user?.uid, likeId: newDoc.id }]
						: [{ userId: user?.uid, likeId: newDoc.id }]
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(
				likeRef,
				where("postId", "==", post.id),
				where("userId", "==", user?.uid)
			);

			const likeToDeleteData = await getDocs(likeToDeleteQuery);
			const likeId = likeToDeleteData.docs[0].id;
			const likeToDelete = doc(db, "likes", likeId);
			await deleteDoc(likeToDelete);

			if (user) {
				setLikes(
					(prev) =>
						prev && prev.filter((like) => like.likeId !== likeId)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

	useEffect(() => {
		const getLikes = async () => {
			const data = await getDocs(likeDoc);
			setLikes(
				data.docs.map((doc) => ({
					userId: doc.data().userId,
					likeId: doc.id,
				})) as Like[]
			);
		};
		getLikes();
	}, []);

	return (
		<div>
			<div className="title">
				<h1> {post.title} </h1>
			</div>
			<div className="body">
				<p> {post.description} </p>
			</div>
			<div className="footer">
				<p> @{post.username} </p>
				<button onClick={hasUserLiked ? removeLike : addLike}>
					{hasUserLiked ? <BiDislike /> : <BiLike />}{" "}
				</button>
				{likes && <p> Likes: {likes?.length} </p>}
			</div>
		</div>
	);
};
