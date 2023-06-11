// Import necessary modules
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

// Define the interface for CategoryBoxProps
interface CategoryBoxProps {
    icon: IconType; // Icon component from react-icons
    label: string; // The label text for the category
    selected?: boolean; // Optional flag to indicate if the category is selected
}

// Define the CategoryBox component
const CategoryBox: React.FC<CategoryBoxProps> = ({
                                                     icon: Icon,
                                                     label,
                                                     selected,
                                                 }) => {
    const router = useRouter();
    const params = useSearchParams();

    // Define the click event handler for the category box
    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString()); // Parse the current query parameters
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label, // Add or update the 'category' parameter in the query
        };

        if (params?.get("category") === label) {
            delete updatedQuery.category; // If the category is already selected, remove it from the query
        }

        const url = qs.stringifyUrl(
            {
                url: "/", // Set the base URL
                query: updatedQuery, // Set the updated query parameters
            },
            { skipNull: true } // Skip null values in the query
        );

        router.push(url); // Update the URL with the new query parameters
    }, [label, router, params]);

    return (
        <div
            onClick={handleClick}
            className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"} // Set the border color based on the selected flag
        ${selected ? "text-neutral-800" : "text-neutral-500"} // Set the text color based on the selected flag
      `}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

export default CategoryBox;
