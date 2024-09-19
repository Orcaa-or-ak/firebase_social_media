import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required for a post!"),
        description: yup.string().required("Give some description for the post!"),

    });

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postRef = collection(db, "posts"); 

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });

        navigate("/");
    }
    
    return (
        <form className="Form" onSubmit={handleSubmit(onCreatePost)}>
            <input className="Title" placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea className="Description" placeholder="Description..." {...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input className="SubmitButton" type="submit" />
        </form>
    )
}