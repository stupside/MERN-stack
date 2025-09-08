import { getAllPartiesResBodySchema } from "api";
import type { FC } from "react";
import { type z } from "zod";

export const Party: FC<{
    party: z.infer<typeof getAllPartiesResBodySchema>[number]
}> = ({ party }) => {
    return <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-xl font-medium text-gray-800 group-hover:text-red-500 transition-colors">
                    {party.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">Party ID: {party.id}</p>
            </div>
            <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
        </div>
    </div>;
}