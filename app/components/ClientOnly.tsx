import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode; // The children components to be rendered
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true); // Set the 'hasMounted' flag to true when the component mounts
    }, []);

    if (!hasMounted) {
        return null; // Render nothing if the component has not mounted yet
    }

    return (
        <>
            {children} // Render the children components
        </>
    );
};

export default ClientOnly;
