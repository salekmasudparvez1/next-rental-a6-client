"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
    title: string | ReactNode
    subtitle?: string | ReactNode
    description?: string | ReactNode
    alignment?: 'left' | 'center' | 'right'
    className?: string
    titleClassName?: string
    subtitleClassName?: string
    descriptionClassName?: string
    showDivider?: boolean
    badge?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
    title, 
    subtitle,
    description,
    alignment = 'center',
    className,
    titleClassName,
    subtitleClassName,
    descriptionClassName,
    showDivider = false,
    badge
}) => {
    const alignmentClass = {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right'
    }[alignment]

    return (
        <div className={cn("space-y-3", alignmentClass, className)}>
            {badge && (
                <div className={cn("inline-block", alignment === 'center' ? 'mx-auto' : '')}>
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                        {badge}
                    </span>
                </div>
            )}
            
            <div>
                <h2 className={cn(
                    "text-3xl md:text-4xl font-bold tracking-tight leading-tight",
                    "bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
                    titleClassName
                )}>
                    {title}
                </h2>
            </div>

            {subtitle && (
                <p className={cn(
                    "text-lg md:text-xl font-semibold text-foreground/80",
                    subtitleClassName
                )}>
                    {subtitle}
                </p>
            )}

            {description && (
                <p className={cn(
                    "text-base text-muted-foreground max-w-2xl",
                    alignment === 'center' ? 'mx-auto' : '',
                    descriptionClassName
                )}>
                    {description}
                </p>
            )}

            {showDivider && (
                <div className={cn(
                    "h-1 bg-linear-to-r from-primary to-primary/40 rounded-full",
                    alignment === 'left' ? 'w-16' : alignment === 'center' ? 'w-16 mx-auto' : 'ml-auto w-16'
                )} />
            )}
        </div>
    )
}

export default SectionHeader
