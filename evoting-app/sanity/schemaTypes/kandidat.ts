import { defineField, defineType } from 'sanity'

export const kandidat = defineType({
  name:  'kandidat',
  title: 'Kandidat / Paslon',
  type:  'document',
  fields: [
    defineField({ 
      name: 'noUrut',
      title: 'Nomor Urut',            
      type: 'number',      
      validation: r => r.required().min(1) 
    }),
    defineField({ 
      name: 'namaPaslon',   
      title: 'Nama Paslon',            
      type: 'string',      
      validation: r => r.required() 
    }),
    defineField({ 
      name: 'foto',         
      title: 'Foto Resmi',             
      type: 'image',       
      options: { hotspot: true } 
    }),
    defineField({ 
      name: 'visi',         
      title: 'Visi',                   
      type: 'blockContent' 
    }),
    defineField({ 
      name: 'misi',         
      title: 'Misi',                   
      type: 'blockContent' 
    }),
    defineField({ 
      name: 'programKerja', 
      title: 'Program Kerja',          
      type: 'blockContent' 
    }),
    defineField({ 
      name: 'videoUrl',     
      title: 'URL Video Kampanye',     
      type: 'url' 
    }),
  ],
  preview: {
    select: { 
      title: 'namaPaslon', 
      subtitle: 'nomorUrut', 
      media: 'foto' },
    prepare: ({ 
      title, 
      subtitle,
      media 
    }) => ({
      title, media, subtitle: `Nomor Urut ${subtitle}`,
    }),
  },
  orderings: [{ 
    title: 'Nomor Urut', 
    name: 'nomorUrut', 
    by: [{ field: 'nomorUrut', direction: 'asc' }] }],
})
