'use strict'

const Schema = use('Schema')

class CapteurSchema extends Schema {
  up () {
    this.table('capteur', (table) => {
      // alter table
    })
  }

  down () {
    this.table('capteur', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CapteurSchema
