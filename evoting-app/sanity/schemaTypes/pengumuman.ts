import { defineField, defineType } from 'sanity'

export const pengumuman = defineType({
  name:  'pengumuman',
  title: 'Berita & Pengumuman',
  type:  'document',
  fields: [
    defineField({ name: 'judul',     title: 'Judul',     type: 'string',   validation: r => r.required() }),
    defineField({
      name: 'kategori', title: 'Kategori', type: 'string',
      options: { list: ['Pengumuman', 'Berita', 'Update Teknis', 'Hasil'] },
    }),
    defineField({ name: 'konten',    title: 'Konten',    type: 'blockContent' }),
    defineField({ name: 'tanggal',   title: 'Tanggal',   type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'published', title: 'Publikasi', type: 'boolean',  initialValue: false }),
  ],
  preview: {
    select: { title: 'judul', subtitle: 'kategori' },
  },
})
