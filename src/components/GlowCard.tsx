import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { cn } from '@/lib/utils'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightSize?: number
}

// Black card with a mouse-follow spotlight and the gateway-style gradient border on hover
export default function GlowCard({ className, children, spotlightSize = 260, ...props }: GlowCardProps) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-2xl border-white/[0.06] bg-black/[0.96] text-neutral-300 shadow-2xl backdrop-blur-xl',
        className,
      )}
      {...props}
    >
      <Spotlight size={spotlightSize} className="from-white/[0.07] via-white/[0.04] to-transparent" />
      <div className="glow-border" />
      {children}
    </Card>
  )
}
