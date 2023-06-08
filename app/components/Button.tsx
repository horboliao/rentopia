// Import necessary modules
import React from "react";
import { IconType } from "react-icons";

// Define the interface for ButtonProps
interface ButtonProps {
    label: string; // The label text for the button
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Event handler for the button click
    disabled?: boolean; // Optional flag to disable the button
    outline?: boolean; // Optional flag to use outline style
    small?: boolean; // Optional flag to use small size
    icon?: IconType; // Optional icon component from react-icons
}

// Define the Button component
export const Button: React.FC<ButtonProps> = ({
                                                  label,
                                                  onClick,
                                                  disabled,
                                                  outline,
                                                  small,
                                                  icon: Icon,
                                              }) => {
    return (
        <button
            onClick={onClick} // Attach the onClick event handler
            disabled={disabled} // Set the disabled state of the button
            className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? "bg-white" : "bg-[#1DB954]"} // Set the background color based on the outline flag
        ${outline ? "border-black" : "border-[#1DB954]"} // Set the border color based on the outline flag
        ${outline ? "text-black" : "text-white"} // Set the text color based on the outline flag
        ${small ? "text-sm" : "text-md"} // Set the text size based on the small flag
        ${small ? "py-1" : "py-3"} // Set the padding based on the small flag
        ${small ? "font-light" : "font-semibold"} // Set the font weight based on the small flag
        ${small ? "border-[1px]" : "border-2"} // Set the border size based on the small flag
      `}
        >
            {Icon && (
                <Icon
                    size={24} // Set the size of the icon
                    className="
            absolute
            left-4
            top-3
          "
                />
            )}
            {label} // Display the label text

        </button>
    );
};
