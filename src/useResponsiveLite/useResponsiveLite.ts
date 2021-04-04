import { useMemo } from 'react'
import { useDeviceInfo, InterfaceDeviceInfo } from '../'
import { processResponsiveString } from '../utils'

export interface ResponsiveCssClassParams {
  classes?: string
  className?: string
  deviceInfo: InterfaceDeviceInfo
}

export interface InterfaceUseResponsiveLite {
  classes: string | undefined
  className: string | undefined
}

export const useResponsiveLite = ({
  classes,
  className,
}: InterfaceUseResponsiveLite) => {
  const deviceInfo = useDeviceInfo()

  return useMemo(() => {
    if (className && typeof classes !== 'string') return className
    return processResponsiveString(classes, deviceInfo, className)
  }, [classes, className, deviceInfo])
}
