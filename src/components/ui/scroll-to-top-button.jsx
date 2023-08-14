import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const ScrollToTopButton = () => {
  const [opacity, setOpacity] = useState(0);
  const scrollHeight = 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > scrollHeight) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <Tooltip
      content="Scroll to top"
      className={`${opacity === 0 ? "hidden" : "block"}`}
    >
      <div
        className={`fixed bottom-8 right-8 z-30 transition-opacity duration-500 ${
          opacity === 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        <IconButton
          size="lg"
          onClick={scrollToTop}
          className={`rounded-full ${opacity === 0 ? "hidden" : "block"}`}
        >
          <ChevronUpIcon className="h-6 w-6" strokeWidth={2} />
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default ScrollToTopButton;
