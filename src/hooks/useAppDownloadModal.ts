import { useEffect, useState } from 'react';

const SESSION_KEY = 'app-download-modal-session-dismissed';

/**
 * Custom hook to manage app download modal visibility
 * Shows modal on every page refresh unless dismissed in current session
 */
export function useAppDownloadModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has dismissed the modal in this session
        const isSessionDismissed = sessionStorage.getItem(SESSION_KEY);

        if (!isSessionDismissed) {
            const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');

            if (hasSeenWelcome) {
                // Show modal after a short delay for better UX
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 1500);
                return () => clearTimeout(timer);
            } else {
                // Wait for splash screen to finish
                const handleSplashComplete = () => {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 500);
                };

                window.addEventListener('welcome-splash-complete', handleSplashComplete);
                return () => window.removeEventListener('welcome-splash-complete', handleSplashComplete);
            }
        }
    }, []);

    const dismissModal = () => {
        setIsVisible(false);
        // Store dismissal in sessionStorage (clears on browser close)
        sessionStorage.setItem(SESSION_KEY, 'true');
    };

    return {
        isVisible,
        dismissModal,
    };
}
