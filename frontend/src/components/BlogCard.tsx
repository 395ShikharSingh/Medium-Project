import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex items-center">
                    <Avatar name={authorName} />
                    <div className="font-extralight pl-2 text-sm">
                        {authorName}
                    </div>
                    <div className="pl-2 font-thin text-slate-400">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">{title}</div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "...."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-2">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
};

export function Avatar({ name, size = 6 }: { name: string; size?: number }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const avatarSize = `${size * 4}px`;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <div className="relative flex items-center">
            {/* Avatar Button */}
            <div
                className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                style={{ width: avatarSize, height: avatarSize }}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span className="text-xs text-gray-600 dark:text-gray-300">
                    {name.charAt(0).toUpperCase()}
                </span>
            </div>

            {/* Logout Button (only visible when clicked) */}
            {showDropdown && (
                <button
                    className="ml-2 px-3 py-1 text-red-500 bg-white border rounded-md shadow hover:bg-gray-100"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
}