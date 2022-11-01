import Ajv from 'ajv'
import { RawDB } from '../raw-db/models/raw-db'
import RawDBSchema from '../raw-db/models/raw-db-schema.json'

type ValidationError = {
  id: number
  path: string
  message?: string
}

export function validate(db: RawDB.DBCharacter[]): boolean {
  console.log('Validation of generated RawDB data')
  const errors = getErrors(db)

  console.log('unit in error:', new Set(errors.map(e => e.id)).size)
  console.log('errors count', errors.length)

  console.log('Errors by unit')
  for (const id of new Set(errors.map(x => x.id))) {
    const [_id, u] = db.find(([_id, u]) => _id === id) ?? []
    console.error(`#${id} "${u?.name}"`)

    const matching = errors
      .filter(e => e.id === id)
      .sort((a, b) => a.path.localeCompare(b.path))

    for (const path of new Set(matching.map(x => x.path))) {
      console.error(`  - ${path}`)

      for (const error of matching.filter(m => m.path === path)) {
        console.error(`    - ${error.message}`)
      }
    }
  }

  console.log('Errors by type')
  for (const messageType of new Set(errors.map(x => x.message))) {
    const matching = errors.filter(e => e.message === messageType)

    console.error(`- ${messageType} (${matching.length} occurences)`)

    for (const path of new Set(matching.map(m => m.path))) {
      const ids = matching.filter(e => e.path === path).map(e => e.id)

      console.error(
        `  - ${path} (${ids.length} occurences) ${JSON.stringify(ids)}`,
      )
    }
  }

  if (true || process.env.DEBUG) {
    for (const id of new Set(errors.map(x => x.id))) {
      console.log(JSON.stringify(db.find(([_id, u]) => _id === id)))
    }
  }

  return errors.length === 0
}

function getErrors(db: RawDB.DBCharacter[]): ValidationError[] {
  const ajv = new Ajv({
    allowUnionTypes: true,
    allErrors: true,
    useDefaults: 'empty',
  })

  const validator = ajv.compile(RawDBSchema)

  let errors: ValidationError[] = []
  for (const [id, unit] of db) {
    const isValid = validator(unit)
    if (!isValid && validator.errors) {
      for (const error of validator.errors) {
        const add = error.params?.additionalProperty
        errors.push({
          id,
          message: `${error.message} ${add ? JSON.stringify(add) : ''}`,
          path: error.instancePath,
        })
      }
    }
  }

  return errors
}
