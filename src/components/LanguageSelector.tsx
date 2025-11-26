'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧', available: true },
        { code: 'fr', name: 'Français', flag: '🇫🇷', available: false, comingSoon: 'Bientôt disponible' },
        { code: 'zh', name: '中文', flag: '🇨🇳', available: false, comingSoon: '即将推出' },
    ];

    const handleLanguageClick = (lang: typeof languages[0]) => {
        if (!lang.available) {
            setDialogMessage(lang.comingSoon || 'Coming soon');
            setShowDialog(true);
            setIsOpen(false);
            setTimeout(() => setShowDialog(false), 2000);
        }
    };

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        'flex items-center gap-2 rounded-full px-4 py-2',
                        'border border-white/20 bg-white/10 text-white',
                        'hover:bg-white/20 transition-all',
                        'text-sm font-medium'
                    )}
                >
                    <span className="text-lg">🌐</span>
                    <span className="hidden sm:inline">EN</span>
                    <svg
                        className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/20 bg-black/95 backdrop-blur-xl shadow-xl z-20 overflow-hidden">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageClick(lang)}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-4 py-3',
                                        'text-white hover:bg-white/10 transition-colors',
                                        'text-left border-b border-white/10 last:border-0',
                                        lang.available && 'bg-apsonic-green/10'
                                    )}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <div className="flex-1">
                                        <div className="font-medium">{lang.name}</div>
                                        {!lang.available && (
                                            <div className="text-xs text-white/50">Coming soon</div>
                                        )}
                                    </div>
                                    {lang.available && (
                                        <svg className="h-5 w-5 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {showDialog && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-4 max-w-md w-full bg-gradient-to-br from-apsonic-ink to-black border border-apsonic-green/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-apsonic-green/20 animate-in zoom-in-95 duration-200">
                        <div className="text-center space-y-6">
                            <div className="text-7xl md:text-8xl">🌍</div>
                            <p className="text-3xl md:text-4xl font-bold text-apsonic-green">{dialogMessage}</p>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
