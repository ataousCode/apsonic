'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AppDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AppDownloadModal({
    isOpen,
    onClose,
}: AppDownloadModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Handle Escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Focus trap and initial focus
    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center p-4',
                'bg-black/70 backdrop-blur-md',
                'animate-in fade-in duration-300'
            )}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                className={cn(
                    'relative w-full max-w-lg',
                    'rounded-[2rem] border border-white/10',
                    'bg-[var(--apsonic-ink)]',
                    'shadow-2xl shadow-apsonic-green/10',
                    'animate-in zoom-in-95 duration-300'
                )}
            >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                    <div className="absolute top-0 right-0 h-64 w-64 bg-apsonic-green/10 blur-[100px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 h-64 w-64 bg-apsonic-green/5 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Close Button */}
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className={cn(
                        'absolute right-4 top-4 z-10 rounded-full p-2',
                        'text-white/60 transition-all hover:bg-white/10 hover:text-white hover:rotate-90',
                        'focus:outline-none focus:ring-2 focus:ring-apsonic-green focus:ring-offset-2 focus:ring-offset-[var(--apsonic-ink)]'
                    )}
                    aria-label="Close modal"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Content */}
                <div className="relative space-y-8 p-8 md:p-10 text-center">
                    {/* APSONIC Logo Text */}
                    <div className="flex justify-center">
                        <h1 className="text-4xl font-bold text-white tracking-wider">
                            APSONIC
                        </h1>
                    </div>

                    {/* Title with Gradient */}
                    <div className="space-y-3">
                        <h2
                            id="modal-title"
                            className="text-3xl font-bold text-white md:text-4xl"
                        >
                            Mobile App
                        </h2>
                        <div className="inline-flex items-center gap-2 rounded-full border border-apsonic-green/30 bg-apsonic-green/10 px-6 py-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apsonic-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-apsonic-green"></span>
                            </span>
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-apsonic-green">
                                Coming Soon
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-base text-white/80 leading-relaxed max-w-md mx-auto">
                        Experience APSONIC on the go! Our mobile app is currently in development and will be available soon on iOS and Android.
                    </p>

                    {/* Coming Soon Badges */}
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <div className="glass-panel rounded-2xl border border-white/10 px-6 py-3 opacity-60">
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <span className="text-sm font-medium text-white">App Store</span>
                            </div>
                        </div>
                        <div className="glass-panel rounded-2xl border border-white/10 px-6 py-3 opacity-60">
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <span className="text-sm font-medium text-white">Google Play</span>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={cn(
                            'w-full rounded-full border border-apsonic-green/30 bg-apsonic-green/10 px-8 py-4',
                            'text-base font-semibold text-apsonic-green transition-all',
                            'hover:bg-apsonic-green hover:text-white',
                            'focus:outline-none focus:ring-2 focus:ring-apsonic-green focus:ring-offset-2 focus:ring-offset-[var(--apsonic-ink)]'
                        )}
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
}
