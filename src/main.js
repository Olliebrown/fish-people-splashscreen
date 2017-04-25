/* global dest */
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(config.gameWidth, config.gameHeight, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, true)
  }
}

// Check for a target to load after the splash screen
var query = window.location.search.substring(1)
var vars = query.split('&')
var pair = vars[0].split('=')
if (pair.length > 1) {
  window.dest = pair[1]
}

// Instantiate the game object
window.game = new Game()
