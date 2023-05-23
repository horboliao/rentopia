'use client'

import {BiSearch} from "react-icons/all";

const Search = () => {
    return (
        <div
        className="
        rounded-full
        p-1
        w-full
        md:w-auto
        border-[1px]
        shadow-sm
        hover:shadow-md
        transition duration-500 ease-in-out
        cursor-pointer">
            <div className="
            flex
            flex-row
            gap-3
            items-center
            justify-between">
                <div className="
                text-sm
                font-semibold
                px-3">
                    Anywhere
                </div>
                <div className="
                text-sm
                font-semibold
                px-3">
                    Any Week
                </div>
                <div className="
                text-sm
                text-gray-600
                pl-3">
                    Add guests
                </div>
                <div className="
                rounded-full
                p-2
                bg-[#1DB954]
                text-white">
                    <BiSearch size={18}/>
                </div>
            </div>
        </div>
    );
 }
 export default Search;
