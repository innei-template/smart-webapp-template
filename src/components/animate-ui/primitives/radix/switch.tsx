'use client'

import type {
  HTMLMotionProps,
  LegacyAnimationControls,
  TargetAndTransition,
  VariantLabels,
} from 'motion/react'
import { m as motion } from 'motion/react'
import { Switch as SwitchPrimitives } from 'radix-ui'
import * as React from 'react'

import { useControlledState } from '~/hooks/use-controlled-state'
import { getStrictContext } from '~/lib/get-strict-context'

type SwitchContextType = {
  isChecked: boolean
  setIsChecked: (isChecked: boolean) => void
  isPressed: boolean
  setIsPressed: (isPressed: boolean) => void
}

const [SwitchProvider, useSwitch] =
  getStrictContext<SwitchContextType>('SwitchContext')

type SwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitives.Root>,
  'asChild'
> &
  HTMLMotionProps<'button'>

function Switch(props: SwitchProps) {
  const [isPressed, setIsPressed] = React.useState(false)
  const [isChecked, setIsChecked] = useControlledState({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onCheckedChange,
  })

  return (
    <SwitchProvider
      value={{ isChecked, setIsChecked, isPressed, setIsPressed }}
    >
      <SwitchPrimitives.Root {...props} onCheckedChange={setIsChecked} asChild>
        <motion.button
          data-slot="switch"
          whileTap="tap"
          initial={false}
          onTapStart={() => setIsPressed(true)}
          onTapCancel={() => setIsPressed(false)}
          onTap={() => setIsPressed(false)}
          {...props}
        />
      </SwitchPrimitives.Root>
    </SwitchProvider>
  )
}

type SwitchThumbProps = Omit<
  React.ComponentProps<typeof SwitchPrimitives.Thumb>,
  'asChild'
> &
  HTMLMotionProps<'div'> & {
    pressedAnimation?:
      | TargetAndTransition
      | VariantLabels
      | boolean
      | LegacyAnimationControls
  }

function SwitchThumb({
  pressedAnimation,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}: SwitchThumbProps) {
  const { isPressed } = useSwitch()

  return (
    <SwitchPrimitives.Thumb asChild>
      <motion.div
        data-slot="switch-thumb"
        whileTap="tab"
        layout
        transition={transition}
        animate={isPressed ? pressedAnimation : undefined}
        {...props}
      />
    </SwitchPrimitives.Thumb>
  )
}

type SwitchIconPosition = 'left' | 'right' | 'thumb'

type SwitchIconProps = HTMLMotionProps<'div'> & {
  position: SwitchIconPosition
}

function SwitchIcon({
  position,
  transition = { type: 'spring', bounce: 0 },
  ...props
}: SwitchIconProps) {
  const { isChecked } = useSwitch()

  const isAnimated = React.useMemo(() => {
    if (position === 'right') return !isChecked
    if (position === 'left') return isChecked
    if (position === 'thumb') return true
    return false
  }, [position, isChecked])

  return (
    <motion.div
      data-slot={`switch-${position}-icon`}
      animate={isAnimated ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={transition}
      {...props}
    />
  )
}

export {
  Switch,
  type SwitchContextType,
  SwitchIcon,
  type SwitchIconPosition,
  type SwitchIconProps,
  type SwitchProps,
  SwitchThumb,
  type SwitchThumbProps,
  useSwitch,
}
