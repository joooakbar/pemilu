'use client'

import {
  scrollToSection,
} from '../utils/navbar.utils'

export const useNavbar = () => {

  const handleScroll = (
    selector: string
  ) => {

    scrollToSection(selector)
  }

  return {
    handleScroll,
  }
}