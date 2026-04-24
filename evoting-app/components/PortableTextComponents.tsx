'use client'

import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn } from '@/app/variants'

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true, amount: 0.1 }}
          className='flex-center'
        >
          <div className='relative h-60 w-full lg:h-80 lg:w-3/4 my-8'>
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Blog post image'}
              fill
              className='object-cover rounded-lg'
              sizes='100vw'
            />
            {value.alt && (
              <p className='text-sm text-transparent mt-2'>{value.alt}</p>
            )}
          </div>
        </motion.div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <motion.h1
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='text-4xl font-bold my-6'
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='text-3xl font-bold my-5'
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='text-2xl font-bold my-4'
      >
        {children}
      </motion.h3>
    ),
    h4: ({ children }) => (
      <motion.h4
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='text-xl font-bold my-3'
      >
        {children}
      </motion.h4>
    ),
    blockquote: ({ children }) => (
      <motion.blockquote
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='border-l-4 pl-4 italic my-4'
      >
        {children}
      </motion.blockquote>
    ),
    normal: ({ children }) => (
      <motion.p
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='my-3 text-justify'
      >
        {children}
      </motion.p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <motion.ul
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.1 }}
        className='list-disc pl-5 my-3'
      >
        {children}
      </motion.ul>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <motion.a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true, amount: 0.1 }}
          className='text-primary underline hover:text-primary/80'
        >
          {children}
        </motion.a>
      )
    },
  },
}
