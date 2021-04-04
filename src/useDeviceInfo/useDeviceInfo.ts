import { useEffect, useState } from 'react'

export interface InterfaceDeviceInfoReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const mobileQuery = '(max-width: 767px)'
const tabletQuery = '(min-width: 768px) and (max-width: 991px)'
const desktopQuery = '(min-width: 992px)'

/**
 * Hook that allows us to check screen size, this is mostly use for responsive styles on mobile
 */
// this logic should maybe be moved into a context
export const useDeviceInfo = (): InterfaceDeviceInfoReturn => {
  /*
  xs	0	size-	offset-	push-	pull-	Set columns when (min-width: 0)
  sm	576px	size-sm-	offset-sm-	push-sm-	pull-sm-	Set columns when (min-width: 576px)
  md	768px	size-md-	offset-md-	push-md-	pull-md-	Set columns when (min-width: 768px)
  lg	992px	size-lg-	offset-lg-	push-lg-	pull-lg-	Set columns when (min-width: 992px)
  xl	1200px	size-xl-	offset-xl-	push-xl-	pull-xl-	Set columns when (min-width: 1200px)
   */

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  const handleMedia = (event: any) => {
    if (event.media === mobileQuery) {
      setIsMobile(event.matches)
      return null
    }

    if (event.media === tabletQuery) {
      setIsTablet(event.matches)
      return null
    }

    if (event.media === desktopQuery) {
      setIsDesktop(event.matches)
      return null
    }
  }

  useEffect(() => {
    const mobileMediaCheck = window.matchMedia(mobileQuery)
    const tabletMediaCheck = window.matchMedia(tabletQuery)
    const desktopMediaCheck = window.matchMedia(desktopQuery)

    handleMedia(mobileMediaCheck)
    handleMedia(tabletMediaCheck)
    handleMedia(desktopMediaCheck)

    mobileMediaCheck.addEventListener('change', handleMedia)
    tabletMediaCheck.addEventListener('change', handleMedia)
    desktopMediaCheck.addEventListener('change', handleMedia)

    return () => {
      mobileMediaCheck.removeEventListener('change', handleMedia)
      tabletMediaCheck.removeEventListener('change', handleMedia)
      desktopMediaCheck.removeEventListener('change', handleMedia)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}
