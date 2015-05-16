var rpg;
function loadRpg() {
	
	rpg = new Rpg("gameCanvas");
	
	// Adding animation from file "Database.js"
	rpg.addAnimation(Database.animation['EM Exclamation']);
	rpg.addAnimation(Database.animation['Darkness 1']);
	rpg.addAnimation(Database.animation['Fang']);
	rpg.addAnimation(Database.animation['SP Recovery 2']);

	// Adding Actions
	rpg.addAction('myattack', {
		action: 'attack', // for Action Battle System
		suffix_motion: ['_SWD_1'], // suffix of the filename
		duration_motion: 1, // animation loop
		block_movement: true,
		wait_finish: 5, // frame
		speed: 25,
		keypress: ['A'],
		condition: function() {
			return rpg.switchesIsOn(2);
		}
	});
	
	rpg.addAction('attack_ennemy', {
		action: 'attack',
		suffix_motion: [''],
		duration_motion: 1,
		block_movement: true,
		wait_finish: 1
	});
	
	//Prepare to dynamically add events on the map
	rpg.prepareEventAjax("monster1");
	rpg.prepareEventAjax("monster2");
	rpg.prepareEventAjax("monster3");
	
	/**
		Map Town
	*/
	rpg.loadMap('Town', {
		tileset: 'village.png',
		autotiles: ['sol11.png'],
		bgm:  {mp3: 'Town', ogg: 'Town'},
		transfert: [
			{x: 46, y: 8, map: 'Grotte1', x_final: 3, y_final: 39},
			{x: 49, y: 34, map: 'Forest1', x_final: 0, y_final: 5, dy: 4, parallele: true, direction: 'right',
			callback: function() {
				// The player can not change maps if switch # 2 is not activated
				if (rpg.player.inTransfert) return false;
				rpg.player.inTransfert = true;
				if (rpg.switchesIsOn(2)) {
					return true;
				}
				else {
					var event = rpg.getEventByName('EV001');
					event.turnTowardPlayer();
					rpg.callCommandsEvent(event, function() {
						event.setStopDirection('left');
						rpg.player.move(['left'], function() {
							rpg.player.animation('stop');
						});
						rpg.player.inTransfert = false;
					}, true);
					return false;
				}
			}}
		],
		events:  ['5_EV001', '5_EV002', '5_EV003', '5_EV004', '5_EV005', '5_EV006', '5_EV007', '5_EV008', '5_EV009', '5_EV010'],
		player:  {
			x: 26, 
			y: 41, 
			direction: 'up',
			filename: 'Hero.png', 
			regX: 35, 
			regY: 68, 
			speed: 4,
			actionBattle: {
				hp_max: 200
			},
			actions: ['myattack']
		}
	}, init());
	
	/**
		Map Cave
	*/
	rpg.prepareMap('Grotte1', {
		tileset: 'Grotte 3.png',
		autotiles: ['sol22.png', 'sol22.png', 'sol22.png', 'sol221.png', 'sol222.png', 'sol22.png', 'sol22.png'],
		bgm: {mp3: 'Cave', ogg: 'Cave'},
		events:  ['1_EV001', '1_EV002', '1_EV003', '1_EV005', '1_EV006', '1_EV007', '1_EV008', '1_EV009','1_EV010'],
		transfert: [
			{x: 3, y: 39, map: 'Town', x_final: 46, y_final: 9, direction: 'bottom'}
		],
	}, mapLoadCave);
	
	/**
		Map Forest 1
	*/
	rpg.prepareMap('Forest1', {
		tileset: 'Forest.png',
		autotiles: ['sol11.png'],
		bgm: {mp3: 'Forest', ogg: 'Forest'},
		transfert: [
			{x: 24, y: 29, map: 'Forest2', x_final: 4, y_final: 0, dx: 3, parallele: true, direction: 'bottom'},
			{x: 0, y: 5, map: 'Town', x_final: 49, y_final: 34, dy: 4, parallele: true, direction: 'left'} 
		]
		
	}, function() {
		createMonster('monster1', 8, 13);
		createMonster('monster1', 23, 21);
		createMonster('monster1', 19, 10);
		createMonster('monster2', 25, 12);
		mapLoad();
	});
	
	/**
		Map Forest 2
	*/
	rpg.prepareMap('Forest2', {
		tileset: 'Forest.png',
		bgm: {mp3: 'Forest', ogg: 'Forest'},
		transfert: [
			{x: 4, y: 0, map: 'Forest1', x_final: 24, y_final: 29, dx: 3, parallele: true, direction: 'up'},
			{x: 4, y: 18, map: 'Temple1', x_final: 10, y_final: 11, direction: 'up'}
		],
		events: ['2_EV001'],
		autotiles: ['sol11.png']
	}, function() {
		createMonster('monster1', 16, 21);
		createMonster('monster1', 18, 15);
		createMonster('monster2', 9, 10);
		mapForest2();
		mapLoad();
	});
	
	/**
		Map Catacomb 1
	*/
	rpg.prepareMap('Temple1', {
		tileset: 'Grotte 2.png',
		bgm: {mp3: 'Temple', ogg: 'Temple'},
		transfert: [
			{x: 10, y: 11, map: 'Forest2', x_final: 4, y_final: 19, direction: 'bottom'},
			{x: 4, y: 9, map: 'Temple', x_final: 17, y_final: 2, direction: 'bottom'}
		]
	}, mapLoad);
	
	/**
		Map Catacomb 2
	*/
	rpg.prepareMap('Temple', {
		tileset: 'Grotte 2.png',
		bgm: {mp3: 'Temple', ogg: 'Temple'},
		transfert: [
			{x: 17, y: 2, map: 'Temple1', x_final: 4, y_final: 8, direction: 'up'},
			{x: 7, y: 3, map: 'Temple2', x_final: 9, y_final: 28, direction: 'up'}
		],
		events:  ['4_EV001', '4_EV002', '4_EV003', '4_EV004', '4_EV005']
	},  function() { 
		mapLoadTemple();
		mapLoad();
	});
	
	/**
		Map Catacomb 3
	*/
	rpg.prepareMap('Temple2', {
		tileset: 'Grotte 2.png',
		bgm: {mp3: 'Temple', ogg: 'Temple'},
		transfert: [
			{x: 31, y: 4, map: 'Temple3', x_final: 7, y_final: 10, direction: 'up'},
			{x: 9, y: 28, map: 'Temple', x_final: 7, y_final: 4, direction: 'bottom'}
		],
		events:  ['3_EV001', '3_EV002', '3_EV003'],
	}, function() {
		createMonster('monster3', 12, 23);
		createMonster('monster3', 20, 15);
		createMonster('monster1', 11, 11);
		createMonster('monster1', 22, 9);
		createMonster('monster3', 32, 12);
		mapLoad();
	});
	
	/**
		Map Catacomb 4 (End)
	*/
	rpg.prepareMap('Temple3', {
		tileset: 'Grotte 2.png',
		bgm: {mp3: 'Temple', ogg: 'Temple'},
		transfert: [
			{x: 7, y: 10, map: 'Temple2', x_final: 31, y_final: 5, direction: 'bottom'}
		],
		events:  ['6_EV001'],
	}, end());

}

function createMonster(name, x, y) {
	// Change positions and add events on the map
	rpg.setEventPrepared(name, {x: x, y: y});
	rpg.addEventPrepared(name);
}

function end() {
	rpg.bind('eventCall_end', function(event) {
		alert('Thank you for trying the mini-rpg !');
		window.location.reload(true);
	});
}

function init() {
	rpg.bind('changeGold', function(gold) {
		var total = parseInt($('#gold span').html());
		$('#gold span').html(gold + total);
	});
	// Set the scrolling on the player
	rpg.setScreenIn("Player");
}

function mapLoadTemple() {
	var order = 0;
	var order_correct = true;
	
	// Function called with the command "call"in the event
	rpg.bind('eventCall_Switch01', function(event) {
		order_valid(1, event);
	});
	rpg.bind('eventCall_Switch02', function(event) {
		order_valid(2, event);
	});
	rpg.bind('eventCall_Switch03', function(event) {
		order_valid(3, event);
	});
	rpg.bind('eventCall_Switch04', function(event) {
		order_valid(4, event);
	});
	
	function order_valid(value, event) {
		order++;
		if (order != value) {
			order_correct = false;
		}
		if (order == 4) {
			if (order_correct) {
				rpg.setSwitches(8, true);
			}
			else {
				rpg.playSE('057-Wrong01.ogg');
				event.commandsExit();
				rpg.setSwitches([4, 5, 6, 7], false);
				order = 0;
				order_correct = true;
			}
		}
	}
	
	createMonster('monster3', 9, 9);
}

function mapForest2() {
	rpg.bind('update', function() {
		if (rpg.gold >= 15 && !rpg.switchesIsOn(10)) {
			rpg.setSwitches(10, true);
		}
	});
}

function mapLoadCave() {
	var stone1 = rpg.getEventByName('EV006');
	var stone2 = rpg.getEventByName('EV010');
	var stone3 = rpg.getEventByName('EV001');
	rpg.bind('update', function() {
		if ((stone1.x == 16 && stone1.y == 27 ||
			stone2.x == 16 && stone2.y == 27 ||
			stone3.x == 16 && stone3.y == 27)
			&& !rpg.switchesIsOn(3)) {
			rpg.setSwitches([1, 3], true);
		}
	});
}

function mapLoad() {
	rpg.setActionBattle({
		displayHpBar: true,
		// When the player is detected
		detection: {
			_default: function(event) {
				if (event.actionBattle.mode != 'passive') {
					// View an animation of an event
					rpg.animations['EM Exclamation'].setPositionEvent(event);
					rpg.animations['EM Exclamation'].play();
					// The event came to the player
					event.moveStart();
					event.approachPlayer();
					// The mode of the event becomes "offensive"
					rpg.setEventMode(event, 'offensive');
					
				}
			}
		},
		// When the player is no longer detected
		nodetection: {
			_default: function(event) {
				// The event will stop movement and incorporates current random displacement
				event.moveStop();
				event.moveStart();
				event.moveRandom();
			}
		},
		onChangeMode: function(event, mode) {
		},
		eventInvinsible: {
			normal: function(event) {
			
			}
		},
		eventAttack: {
			_default: function(event) {
				// When the player is attacked
				event.turnTowardPlayer();
				rpg.animations['Fang'].setPositionEvent(rpg.player);
				rpg.animations['Fang'].play();
				rpg.player.blink(30, 2);
				event.action('attack_ennemy', function() {
					rpg.setEventMode(event, 'passive');
				});
				rpg.player.actionBattle.hp -= 5;
				if (rpg.player.actionBattle.hp <= 0) {
					alert('Game Over !');
					window.location.reload(true);
				}
				else {
					$('#hp').animate({'width': ($('#hp').width() - 5) + 'px'});
				}
			}
		
		},
		eventPassive: {
			_default: function(event) {
				event.moveRandom();
				event.wait(25, false, function() {
					event.detection = false;
					rpg.setEventMode(event, 'normal');
				});
			}
		},
		eventAffected: {
			_default: function(event) {
				rpg.setEventMode(event, 'invinsible');
				event.blink(30, 2, function() {
					rpg.setEventMode(event, 'normal');
				});
				event.actionBattle.hp -= 100;
			}
		},
		ennemyDead: {
			drop_coin: function(event, item) {
				event.createEventRelativeThis(item, {
					move: false
				});
			
			}				
		},
		// Cache events can be deposited on the ground
		eventsCache: ["coin"]
	});
	
	
	
}