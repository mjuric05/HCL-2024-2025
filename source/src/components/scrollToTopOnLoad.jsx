"use client";

import { useEffect } from "react";

export function ScrollToTopOnLoad() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

export default ScrollToTopOnLoad;
