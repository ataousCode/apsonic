'use client';

import AppDownloadModal from '@/components/AppDownloadModal';
import { useAppDownloadModal } from '@/hooks/useAppDownloadModal';

export default function AppDownloadModalWrapper() {
    const { isVisible, dismissModal } = useAppDownloadModal();

    return (
        <AppDownloadModal
            isOpen={isVisible}
            onClose={dismissModal}
        />
    );
}
