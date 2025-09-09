import { PropsWithChildren } from "react";

export interface SubtleLinkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const SubtleLinkButton: React.FC<SubtleLinkButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-xs text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer underline`}
    >
      {children}
    </button>
  );
};

export const ModalActionForm: React.FC<PropsWithChildren<{
  action: () => void;
}>> = ({
  children,
  action,
}) => {
    return (
      <form action={action}>
        {children}
      </form>
    );
  };