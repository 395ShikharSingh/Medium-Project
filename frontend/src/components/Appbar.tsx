import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between items-center px-10 py-4">
            <Link to={'/blogs'} className="flex items-center text-lg ">
                MEDIUM
            </Link>
            <div className="flex items-center">
                <Link to={"/publish"}>
                    <button 
                        type="button" 
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer"
                    > 
                        New Blog
                    </button>
                </Link>
                <Avatar size={9} name={"Shikhar"} />
            </div>
        </div>
    );
};
