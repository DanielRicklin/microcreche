'use strict'

let dateFormat = require('dateFormat')

const Capteur = use('App/Models/Capteur')
const MesureCapteur = use('App/Models/MesureCapteur')
const Emplacement = use('App/Models/Emplacement')

class CapteurController {
    async home({ view }){
        const emplacements = await Emplacement.all()

        return view.render('home', { 
            emplacements1: emplacements.toJSON(),
            emplacements2: emplacements.toJSON()
        })
    }

    async barregraphe({ view }){
        const emplacements = await Emplacement.all()

        return view.render('barregraphe', { 
            emplacements: emplacements.toJSON()
        })
    }

    async capteurChoice({ params }){
        const data = await MesureCapteur.query().where('tagcapteur', '=', params.id).orderBy('date').fetch()

        let donnee = []

        data.toJSON().forEach(function(res){
            donnee.push({date:dateFormat(res.date,"yyyy-mm-dd HH:MM:ss"),value:res.valeur})
        })
        
        return donnee
    }

    async emplacementChoice({ params }){
        const getCapteurs = await Capteur.query().where('groupe', '=', params.id).fetch()

        let capteurs = []

        getCapteurs.toJSON().forEach(function(data){
            capteurs.push({"tagcapteur":data.tagcapteur})
        })        
        return capteurs
    }
}

module.exports = CapteurController
