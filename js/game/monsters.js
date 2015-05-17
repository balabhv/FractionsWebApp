var g_encounterData = { 
    "zones": [ {
        "zone": "1",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    }, {
        "zone": "2",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    }, {
        "zone": "3",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    }, {
        "zone": "4",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    }, {
        "zone": "5",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    },{
        "zone": "6",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    },{
        "zone": "7",
        "encounters": [ {
            "name": "A ninja minion",
            "monsters": [ 0 ]
        }]
    }]
};

var g_monsterData = { 
    "monsters": [ {
        /*"id": 0,
        "name": "slime",
        "hp": 15,
        "attack": 10,
        "defense": 0,
        "exp": 5,
        "gold": 5,
        "imgRef": "enemies",
        "left": 4,
        "top": 109,
        "width": 31,
        "height": 24
    }, {
        "id": 1,
        "name": "rat",
        "hp": 25,
        "attack": 15,
        "defense": 2,
        "exp": 10,
        "gold": 5,
        "imgRef": "enemies",
        "left": 7,
        "top": 498,
        "width": 63,
        "height": 55
    }, {
        "id": 2,
        "name": "snake",
        "hp": 30,
        "attack": 20,
        "defense": 6,
        "exp": 15,
        "gold": 10,
        "imgRef": "enemies",
        "left": 7,
        "top": 160,
        "width": 48,
        "height": 59
    }, {
        "id": 3,
        "name": "blue slime",
        "hp": 20,
        "attack": 20,
        "defense": 20,
        "exp": 20,
        "gold": 10,
        "imgRef": "enemies",
        "left":78,
        "top": 109,
        "width": 31,
        "height": 24
    }, {
        "id": 4,
        "name": "cocatrice",
        "hp": 45,
        "attack": 32,
        "defense": 16,
        "exp": 30,
        "gold": 30,
        "imgRef": "enemies",
        "left": 14,
        "top": 329,
        "width": 47,
        "height": 67
    }, {
        "id": 5,
        "name": "red slime",
        "hp": 30,
        "attack": 30,
        "defense": 30,
        "exp": 30,
        "gold": 15,
        "imgRef": "enemies",
        "left":41,
        "top": 109,
        "width": 31,
        "height": 24
    }, {
        "id": 6,
        "name": "white rat",
        "hp": 55,
        "attack": 38,
        "defense": 20,
        "exp": 40,
        "gold": 30,
        "imgRef": "enemies",
        "left": 145,
        "top": 498,
        "width": 63,
        "height": 55
    }, {
        "id": 7,
        "name": "cobra",
        "hp": 60,
        "attack": 42,
        "defense": 30,
        "exp": 40,
        "gold": 40,
        "imgRef": "enemies",
        "left": 67,
        "top": 160,
        "width": 48,
        "height": 59
    }, {
        "id": 8,
        "name": "wolf",
        "hp": 68,
        "attack": 46,
        "defense": 28,
        "exp": 50,
        "gold": 25,
        "imgRef": "enemies",
        "left": 7,
        "top": 685,
        "width": 47,
        "height": 55
    }, {*/
        //"id": 9,
        "id":0,
        
        "name": "ninja minion",
        "hp": 100,
        "attack": 55,
        "defense": 20,
        "exp": 60,
        "gold": 40,
        "imgRef": "enemies",
        "left": 380,
        "top": 904,
        "width": 60,
        "height": 91
        /*"special": function(source) {
        
            // Mage will try to heal the weakest monster in encounter
            var lowId = -1;
            var lowHP = 9999;
            g_battle.writeMsg("The " + source.getName() + " casts Heal.");
            g_battle.forEachMonster(function(monster, id) {
                if (!monster.isDead() && monster.getHP() < lowHP) {
                    lowHP = monster.getHP();
                    lowId = id;
                }
            });
            var monster = g_battle._monsterList[lowId];
            var amt = 50 + Math.floor(Math.random() * 50);
            monster.heal(amt);
            g_battle.writeMsg("The " + monster.getName() + " was healed for " + amt + ".");
        }*/
    }]
};