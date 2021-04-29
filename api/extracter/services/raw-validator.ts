import Ajv from 'ajv'
import { RawDB } from '../models/raw-db'
import RawDBSchema from '../models/raw-db-schema.json'

type ValidationError = {
  id: number
  path: string
  message?: string
}

export function validate(db: RawDB.DBCharacter[]) : boolean {
  console.log('Validation of generated RawDB data')
  const errors = getErrors(db)

  console.log('unit in error:', new Set(errors.filter(e => e.id)).size)
  console.log('errors count', errors.length)

  const messageTypes = new Set(errors.map(x => x.message))

  for (const messageType of messageTypes) {
    const matching = errors.filter(e => e.message === messageType)

    console.error(`- ${messageType} (${matching.length} occurence)`)

    const groupByPath = new Set(matching.map(m => m.path))

    for (const group of groupByPath) {
      const ids = matching.filter(e => e.path === group).map(e => e.id)

      console.error(
        `  - ${group} (${ids.length} occurence) ${JSON.stringify(ids)}`,
      )
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
