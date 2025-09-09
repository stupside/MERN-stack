import type { FC } from "react";

export interface RemoveButtonProps {
    onRemove: (formData: FormData) => void;
    isLoading?: boolean;
    className?: string;
}

export const RemoveButton: FC<RemoveButtonProps> = ({
    onRemove,
    isLoading = false,
    className = ""
}) => {
    return (
        <form action={onRemove}>
            <button
                type="submit"
                disabled={isLoading}
                className={`p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors disabled:opacity-50 cursor-pointer ${className}`}
                title={"Remove from watchlist"}
            >
                {isLoading ? (
                    <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24">
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            opacity="0.25"
                        />
                        <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            opacity="0.75"
                        />
                    </svg>
                ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </button>
        </form>
    );
};