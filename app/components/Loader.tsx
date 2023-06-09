'use client';

import { PuffLoader } from "react-spinners";

// Loader component that displays a spinning animation
const Loader = () => {
    return (
        <div
            className="
      h-[70vh]
      flex
      flex-col
      justify-center
      items-center
    "
        >
            <PuffLoader
                size={100}
                color="green"
            />
        </div>
    );
}

export default Loader;
