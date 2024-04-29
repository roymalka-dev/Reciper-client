import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom React hook for scrolling to the top of the page when the route changes.
 *
 * This hook utilizes the `useLocation` hook from react-router-dom to detect route changes,
 * and then scrolls the window to the top.
 */
export function useScrollToTop() {
  /**
   * Retrieves the current location pathname using the `useLocation` hook from react-router-dom.
   */
  const { pathname } = useLocation();

  /**
   * Effect hook to scroll to the top of the page when the route changes.
   * It triggers the scroll to top action whenever the pathname changes.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
