import React, { forwardRef, ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  actions?: ReactNode
  /**
   * Small compact variant reduces vertical padding and font sizes.
   */
  compact?: boolean
  /**
   * Optional leading element (icon, avatar, etc.)
   */
  leading?: ReactNode
  /**
   * Add a subtle divider under the header
   */
  divider?: boolean
  /**
   * Extra classes to apply to the root element
   */
  className?: string
}

/**
 * SectionHeader
 *
 * - Compact default spacing for dashboard sections
 * - Optional leading icon/avatar
 * - Optional divider
 * - Actions container aligned to the right and vertically centered
 */
const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      subtitle,
      description,
      actions,
      compact = false,
      leading,
      divider = false,
      className = "",
    },
    ref
  ) => {
    const rootPadding = compact ? "py-2" : "py-4"
    const titleSize = compact ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
    const descSize = compact ? "text-sm" : "text-base"

    return (
      <div
        ref={ref}
        className={`flex items-start md:items-center justify-between   gap-4 ${rootPadding} ${
          divider ? "border-b border-muted-foreground/10" : ""
        } ${className}`}
        role="region"
        aria-label={subtitle ? `${subtitle} — ${title}` : title}
      >
        {/* Left column: leading + texts */}
        <div className="flex min-w-0 items-start md:items-center gap-4 ">
          {leading && (
            <div className={`shrink-0 ${compact ? "w-9 h-9" : "w-12 h-12"}`}>
              {leading}
            </div>
          )}

          <div className="min-w-0 ">
            {subtitle && (
              <p
                className={`text-xs font-medium uppercase tracking-wider text-muted-foreground ${
                  compact ? "mb-0.5" : "mb-1"
                }`}
              >
                {subtitle}
              </p>
            )}

            <h2
              className={`font-semibold tracking-tight leading-tight ${titleSize} truncate`}
            >
              {title}
            </h2>

            {description && (
              <p
                className={`mt-1 max-w-2xl text-muted-foreground ${descSize} line-clamp-2`}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {actions}
          </div>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"
export default SectionHeader