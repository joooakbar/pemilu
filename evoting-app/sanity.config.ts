import { defineConfig } from 'sanity'
import { structureTool }  from 'sanity/structure'
import { visionTool }     from '@sanity/vision'
import { schema }         from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  basePath:  '/studio',
  projectId,
  dataset,
  apiVersion,
  schema,
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('E-VOTIS CMS')
          .items([
            S.listItem().title('Info Pemilihan')   .id('electionInfo').child(S.documentTypeList('electionInfo')),
            S.divider(),
            S.listItem().title('Kandidat / Paslon') .id('kandidat')    .child(S.documentTypeList('kandidat')),
            S.divider(),
            S.listItem().title('Berita & Pengumuman').id('pengumuman').child(S.documentTypeList('pengumuman')),
            S.listItem().title('Tata Cara Memilih') .id('tataCara')    .child(S.documentTypeList('tataCara')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
