import type * as SwitchPrimitives from '@radix-ui/react-switch'
import type { HTMLMotionProps } from 'motion/react'

import {
  Switch as SwitchAnimate,
  SwitchThumb,
} from '~/components/animate-ui/primitives/radix/switch'
import { cn } from '~/lib/cn'

type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root> &
  HTMLMotionProps<'button'> & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

export const Switch = ({ className, ...props }: SwitchProps) => {
  return (
    <SwitchAnimate
      className={cn(
        'relative flex p-0.5 h-6 w-10 items-center justify-start rounded-full border transition-colors',
        'data-[state=checked]:justify-end',
        className,
      )}
      {...props}
    >
      <SwitchThumb
        className="rounded-full bg-accent h-full aspect-square"
        pressedAnimation={{ width: 22 }}
      />
    </SwitchAnimate>
  )
}
