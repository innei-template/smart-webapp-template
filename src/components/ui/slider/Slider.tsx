import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { clsxm } from '~/lib/cn'

export const Slider = ({
  ref,
  className,
  variant = 'primary',
  ...props
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  variant?: 'primary' | 'secondary'
} & {
  ref?: React.Ref<
    | (React.ElementRef<typeof SliderPrimitive.Root> & {
        variant?: 'primary' | 'secondary'
      })
    | null
  >
}) => (
  <SliderPrimitive.Root
    ref={ref}
    className={clsxm(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={clsxm(
        'relative h-1.5 w-full grow overflow-hidden rounded-full',
        variant === 'primary' ? 'bg-accent/20' : 'bg-fill-secondary',
      )}
    >
      <SliderPrimitive.Range
        className={clsxm(
          'absolute h-full',
          variant === 'primary' ? 'bg-accent/80' : 'bg-fill',
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={clsxm(
        'block size-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary'
          ? 'border-accent/50 focus-visible:ring-accent bg-accent'
          : 'border-border focus-visible:ring-border bg-material-opaque',
      )}
    />
  </SliderPrimitive.Root>
)
Slider.displayName = SliderPrimitive.Root.displayName
