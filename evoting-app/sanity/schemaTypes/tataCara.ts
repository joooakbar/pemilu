import { defineArrayMember, defineField, defineType } from 'sanity'

export const tataCara = defineType({
  name:  'tataCara',
  title: 'Tata Cara Memilih',
  type:  'document',
  fields: [
    defineField({ name: 'judul',      title: 'Judul',          type: 'string' }),
    defineField({
      name:  'langkah',
      title: 'Langkah-Langkah',
      type:  'array',
      of: [defineArrayMember({
        type:   'object',
        fields: [
          defineField({ name: 'nomor',      type: 'number' }),
          defineField({ name: 'judul',      type: 'string' }),
          defineField({ name: 'deskripsi',  type: 'text' }),
          defineField({ name: 'gambar',     type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'judul', subtitle: 'nomor' } },
      })],
    }),
    defineField({ name: 'videoEmbed', title: 'URL Video Tutorial', type: 'url' }),
  ],
})
