type BreakpointTypes = 'sm' | 'md' | 'lg'

const checkParsingErrors = (
  stylingString: string,
  parsedStyles: string,
  breakpoint: string
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (stylingString.includes(`${breakpoint}:`) && !parsedStyles) {
      console.log(new Error().stack)
      console.error(
        `"md:" property found in classes prop, but was not applied, are you sure it was formatted correctly?
          
          styling string: ${stylingString}
          `
      )
    }
  }
}

export const regexBreakpointParser = (
  breakpoint: BreakpointTypes,
  classString: string
) => {
  const breakpointRegex = new RegExp(`${breakpoint}:(.+?);`) // new

  const breakpointMatches = breakpointRegex.exec(classString)

  if (breakpointMatches === null) return ''
  return breakpointMatches[1]
}

export interface ResponsiveOptions {
  isMobile?: boolean
  isTablet?: boolean
  isDesktop?: boolean
}

// TODO:  isTablet, isMobile, isDesktop breakpoints need to be configurable
export const processResponsiveString = (
  responsiveString: string,
  { isMobile, isTablet, isDesktop }: ResponsiveOptions,
  className: string | undefined
) => {
  const baseStyles = responsiveString.split(';')

  let returnCssClasses = []

  if (Array.isArray(baseStyles)) returnCssClasses.push(baseStyles[0].trim())

  if (isMobile || isTablet || isDesktop) {
    const smStyles = regexBreakpointParser('sm', responsiveString).trim()
    checkParsingErrors(responsiveString, smStyles, 'sm')
    if (smStyles) {
      returnCssClasses = returnCssClasses.concat(smStyles.split(' '))
    }
  }

  if (isTablet || isDesktop) {
    const mdStyles = regexBreakpointParser('md', responsiveString).trim()
    checkParsingErrors(responsiveString, mdStyles, 'md')

    if (mdStyles) {
      returnCssClasses = returnCssClasses.concat(mdStyles.split(' '))
    }
  }

  if (isDesktop) {
    const lgStyles = regexBreakpointParser('lg', responsiveString).trim()
    checkParsingErrors(responsiveString, lgStyles, 'lg')
    if (lgStyles) {
      returnCssClasses = returnCssClasses.concat(lgStyles.split(' '))
    }
  }

  if (className) {
    return `${returnCssClasses.join(' ')} ${className}`
  }

  return returnCssClasses.join(' ')
}
