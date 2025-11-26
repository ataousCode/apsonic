'use client';

import { cn } from '@/lib/utils';

type AnimatedBackgroundProps = {
    variant?: 'default' | 'bright' | 'subtle';
    className?: string;
};

export default function AnimatedBackground({
    variant = 'default',
    className
}: AnimatedBackgroundProps) {
    const opacity = {
        default: { green: 20, yellow: 15, center: 15 },
        bright: { green: 30, yellow: 20, center: 15 },
        subtle: { green: 10, yellow: 8, center: 10 },
    }[variant];

    return (
        <div className={cn("absolute inset-0", className)}>
            <div
                className="absolute top-0 right-0 h-96 w-96 blur-[120px] animate-pulse"
                style={{ backgroundColor: `rgba(28, 160, 73, ${opacity.green / 100})` }}
            />
            <div
                className="absolute bottom-0 left-0 h-96 w-96 blur-[100px] animate-pulse"
                style={{
                    backgroundColor: variant === 'bright'
                        ? `rgba(234, 179, 8, ${opacity.yellow / 100})`
                        : `rgba(28, 160, 73, ${opacity.yellow / 100})`,
                    animationDelay: '1s'
                }}
            />
            {variant === 'bright' && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] blur-[150px]"
                    style={{ backgroundColor: `rgba(28, 160, 73, ${opacity.center / 100})` }}
                />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,160,73,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,160,73,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,160,73,0.15),transparent_70%)]" />
        </div>
    );
}
