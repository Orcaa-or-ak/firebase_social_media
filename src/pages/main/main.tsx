import React from "react";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Posts {
	id: string;
	title: string;
	description: string;
	username: string;
	userId: string;
}

export const Main = () => {
	const [postList, setPostList] = useState<Posts[] | null>(null);
	const postRef = collection(db, "posts");

	useEffect(() => {
		const getPosts = async () => {
			const data = await getDocs(postRef);
			setPostList(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as Posts[]
			);
		};

		getPosts();
	}, [postRef]);

	return (
		<div>
			{postList?.map((post) => (
				<Post post={post} />
			))}
		</div>
	);
};
