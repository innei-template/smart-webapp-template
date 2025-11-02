import { createContext } from 'react'

export interface SegmentGroupContextValue {
  value: string
  setValue: (value: string) => void
  componentId: string
}
export const SegmentGroupContext = createContext<SegmentGroupContextValue>(
  null!,
)
