import { useEffect } from "react";

const ScrollToTopOnLoad = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    return null;
};

export default ScrollToTopOnLoad;
