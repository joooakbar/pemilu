import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { kandidat }         from './kandidat'
import { pengumuman }       from './pengumuman'
import { tataCara }         from './tataCara'
import { electionInfo }     from './electionInfo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, kandidat, pengumuman, tataCara, electionInfo],
}
