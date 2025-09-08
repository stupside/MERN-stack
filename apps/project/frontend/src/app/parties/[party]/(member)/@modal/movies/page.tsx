"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from 'next/navigation'

import type { z } from "zod";
import type { NextPage } from "next";
import type { searchMoviesResBodySchema } from "libraries/api";

import { searchMovies } from "./action";
import { Movies } from "./_private/Movies";
import { useParams } from "next/navigation";

const Page: NextPage = () => {
    const params = useParams<{
        party: string
    }>();
    const router = useRouter()

    const [name, setName] = useState<string>('');
    const [movies, setMovies] = useState<z.infer<typeof searchMoviesResBodySchema>>([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchMovies = async () => {
                try {
                    if (!name.trim()) {
                        setMovies([]);
                    } else {
                        const result = await searchMovies({ name });
                        if (result.success) {
                            setMovies(result.data);
                        } else {
                            console.error("Failed to parse movies response", result.error);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch movies", error);
                }
            }

            fetchMovies();
        }, 300);

        return () => clearTimeout(timer);
    }, [name])

    const handleClose = () => {
        setIsOpen(false)
        router.back()
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-6xl bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <DialogTitle className="text-xl font-medium text-gray-900">
                            Search Movies
                        </DialogTitle>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-6 flex-shrink-0">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Search movies..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
                                autoFocus
                            />
                        </div>
                        <div className="flex-1 px-6 pb-6 overflow-y-auto">
                            <Movies party={params.party} movies={movies} />
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Page;