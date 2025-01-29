import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish= () => {
    const [title, setTitle]= useState("");
    const [discription , setDiscription]= useState("");
    const navigate= useNavigate();

    return <div className="">
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Title" />
                <TextEditor onChange={(e) => {
                    setDiscription(e.target.value)
                }}/>
                <button onClick={async() => {
                    const responce= await axios.post(`${BACKEND_URL}/blog/post` , {
                        title,
                        content:discription
                    }, {
                        headers: {
                            Authorization:  localStorage.getItem("token")
                        }
                    });
                    navigate(`/blogs/${responce.data.id}`)
                }}
                    type="submit" 
                    className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    aria-label="Publish article"
                >
                    Publish
                </button>
            </div>
        </div>
    </div>
           
}

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div className="w-full p-4 rounded-lg shadow-sm bg-white my-5">
            <div className="w-full mb-4">
                <label htmlFor="post-content" className="sr-only">Write an article</label>
                <textarea 
                    onChange={onChange}
                    rows={8} 
                    className="block w-full p-3 text-sm text-gray-800 bg-white border rounded-lg focus:ring-2 focus:ring-blue-300" 
                    placeholder="Write an article..." 
                    required 
                />
            </div>
            
        </div>
    );
}

