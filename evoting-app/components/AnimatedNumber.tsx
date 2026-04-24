'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
}

const AnimatedNumber = ({
  value,
  duration = 1,
  className,
}: AnimatedNumberProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  )
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration })
      return controls.stop
    }
  }, [isInView, count, value, duration])

  return (
    <motion.h2 ref={ref} className={className}>
      {rounded}
    </motion.h2>
  )
}

export default AnimatedNumber
