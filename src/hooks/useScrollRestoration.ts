import { throttle } from "throttle-debounce";
import { useEffect } from "react";

const useScrollRestoration = (dependency: boolean) => {
  useEffect(() => {
    if (dependency) {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition");

      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
    }

    const handleScroll = throttle(200, () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dependency]);
};

export default useScrollRestoration;
