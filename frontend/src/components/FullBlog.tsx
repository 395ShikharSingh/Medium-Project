import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog= ({blog}: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-2xl">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-3">
                        Post on 2nd Feb 2024
                    </div>
                    <div className="pt-2 "> 
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-mg">
                        Author 
                    </div>
                    <div className="flex pt-5">
                        <div className="pr-4 flex-col justify-center">
                            <Avatar name={blog.author.name} size={8}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold ">
                                {blog.author.name || "Unknown"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, iste.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
}