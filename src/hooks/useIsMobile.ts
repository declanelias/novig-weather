import { useEffect, useState } from "react";

export const useIsMobile = (maxWidth = 768): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth <= maxWidth);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [maxWidth]);

    return isMobile;
};
