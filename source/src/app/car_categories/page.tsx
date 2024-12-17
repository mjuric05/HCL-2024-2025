"use client";

import { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetchData';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function CarCategoriesPage() {
    const [data, setData] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 20;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData().then(fetchedData => setData(fetchedData));
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h1 className="text-6xl font-extrabold tracking-tight">Car Categories</h1>
            {data.length > 0 ? (
                <div className="mt-8 w-full max-w-screen-lg">
                    <h2 className="text-2xl font-bold">Fetched Posts:</h2>
                    <ul className="bg-gray-100 p-4 rounded-lg mt-4">
                        {currentPosts.map((post, index) => (
                            <li key={post.id} className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {indexOfFirstPost + index + 1}. {post.title}
                                </h3>
                                <p className="text-gray-700">{post.body}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="bg-[#9747FF] text-white px-4 py-2 rounded-lg hover:bg-[#ae73fa] transition duration-300"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(data.length / postsPerPage)}
                            className="bg-[#9747FF] text-white px-4 py-2 rounded-lg hover:bg-[#ae73fa] transition duration-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}