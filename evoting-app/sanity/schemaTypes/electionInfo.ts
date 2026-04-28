import { defineField, defineType } from 'sanity'

export const electionInfo = defineType({
  name:  'electionInfo',
  title: 'Info Pemilihan',
  type:  'document',
  fields: [
    defineField({
      name:        'namaPemilihan',
      title:       'Nama Resmi Pemilihan',
      type:        'string',
      validation:  r => r.required(),
      description: 'Contoh: Pemilihan Ketua OSIS SMA Nusantara 2025',
    }),
    defineField({
      name:    'logo',
      title:   'Logo Pemilihan',
      type:    'image',
      options: { hotspot: true },
    }),
    defineField({
      name:        'startTime',
      title:       'Waktu Mulai Pemilihan',
      type:        'datetime',
      validation:  r => r.required(),
      description: 'Tanggal dan jam pemilihan dibuka',
      options:     { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 15 },
    }),
    defineField({
      name:        'endTime',
      title:       'Waktu Selesai Pemilihan',
      type:        'datetime',
      validation:  r => r.required(),
      description: 'Tanggal dan jam pemilihan ditutup',
      options:     { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm', timeStep: 15 },
    }),
    defineField({
      name: 'tanggalTampil',
      title: 'Tanggal Tampil',
      type: 'datetime',
    }),
    defineField({
      name:        'tempatVoting',
      title:       'Keterangan Tempat / Platform',
      type:        'string',
      description: 'Contoh: Online via E-VOTIS | Lab Komputer Lantai 2',
    }),
    defineField({
      name:        'deskripsi',
      title:       'Deskripsi Singkat',
      type:        'text',
      rows:        3,
      description: 'Tampil di hero section portal voter',
    }),
  ],
  preview: {
    select: { title: 'namaPemilihan', subtitle: 'startTime', media: 'logo' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      media,
      subtitle: subtitle
        ? new Date(subtitle).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Tanggal belum diisi',
    }),
  },
})
