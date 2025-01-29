import { ChangeEvent, useState} from "react";
import { Link , useNavigate} from "react-router-dom"
import { SignupInput } from "@shikharsingh123/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth= ({type}: {type: "signup" | "signin"}) => {
    const navigate= useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name:"",
        username: "",
        password: ""
    })

    async function sendRequest() {
       try{
            const responce=  await axios.post(`${BACKEND_URL}/user/${type=== "signup" ? "signup" : "signin"}`, postInputs);
            const jwt= responce.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
       }catch(e) {

       }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center"> 
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create An Account
                    </div>
                    <div className="text-slate-400 ">
                        {type=== "signin"? "Don't have a account?" : "Already have an account?"}
                        <Link className= "underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </div>
                <div className="py-8">
                    {type==="signup" ? <LabelInput lable="Name" placeholder="Shikhar Singh" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }}/> : null}
                    <LabelInput lable="Username" placeholder="ShikharSingh@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username:e.target.value
                        })
                    }}/>
                    <LabelInput lable="Password" type={"password"} placeholder="1233" onChange={(e) => {
                        setPostInputs( {
                            ...postInputs,
                            password:e.target.value
                        })
                    }}/>
                </div>
                <button onClick={sendRequest} type="button" className=" w-full text-white bg-gray-800       hover:bg-gray-900 focus:out line-none focus: ring-4
                    focus: ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark: hover: bg-gray-700 dark: focus: ring-gray-700">
                        {type=== "signup" ? "SignUp" : "SignIn"}
                </button>
            </div>
        </div> 
    </div>
}
 
interface LabelledInputType {
    lable: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}
function LabelInput({lable, placeholder, onChange, type}: LabelledInputType) {
    return <div>
        < label className="block mb-2 text-sm font-medium text-black pt-2 font-semibold">{lable}</label>
        <input onChange={onChange} type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}
