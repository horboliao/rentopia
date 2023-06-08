'use client';

import { IconType } from "react-icons";


interface CategoryBoxProps {
    icon: IconType; // Icon component to render
    label: string; // Label text for the category box
    selected?: boolean; // Indicates if the category box is selected or not (optional)
    onClick: (value: string) => void; // Function to handle the click event of the category box
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
                                                     icon: Icon,
                                                     label,
                                                     selected,
                                                     onClick
                                                 }) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
        >
            <Icon size={30} />
            <div className="font-semibold">
                {label}
            </div>
        </div>
    );
}

export default CategoryBox;