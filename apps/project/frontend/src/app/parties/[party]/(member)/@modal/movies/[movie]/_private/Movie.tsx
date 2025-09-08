"use client"

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Image from "next/image";
import type { FC } from 'react'
import z from 'zod';
import { searchMoviesResBodySchema } from 'libraries/api';


export const Movie: FC<{
    movie: z.infer<typeof searchMoviesResBodySchema>[number];
}> = ({ movie }) => {
    const router = useRouter()

    const handleClose = () => {
        router.back()
    }

    return (
        <Dialog open={true} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="mx-auto max-w-5xl w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                        <DialogTitle className="text-2xl font-light text-gray-800">
                            Movie Details
                        </DialogTitle>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                {movie.images.poster && (
                                    <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={movie.images.poster}
                                            alt={`${movie.title} poster`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-light text-gray-800 mb-2">{movie.title}</h1>
                                    <p className="text-gray-500">TMDB ID: {movie.ref}</p>
                                </div>

                                {movie.images.backdrop && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Backdrop</h3>
                                        <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
                                            <Image
                                                src={movie.images.backdrop}
                                                alt={`${movie.title} backdrop`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}