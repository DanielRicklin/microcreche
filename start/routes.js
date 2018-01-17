'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')



Route.get('/', 'CapteurController.home')
Route.get('/barregraphe', 'CapteurController.barregraphe')
Route.get('/api/emplacement/:id', 'CapteurController.emplacementChoice')
Route.get('/api/capteur/:id', 'CapteurController.capteurChoice')
Route.any('*', ({ view }) => view.render('welcome'))  //faire le 404 la dessus