/* Class representing an enemy in battles */
var Monster = Class.extend({

    // Parameter from g_monsterData
    _init: function(monster) {
        this._monster = monster;
        this._maxHP = monster.hp;
        this._hp = monster.hp;
        this._loc = 0;
    },
    
    getHP: function() {
        return this._hp;
    },
    
    damage: function(amt) {
        this._hp -= amt;
    },
    
    heal: function(amt) {
        this._hp += amt;
        if (this._hp > this._maxHP)
            this._hp = this._maxHP;
    },
    
    isDead: function() {
        return this._hp <= 0;
    },
    
    /* loc=0 means first monster in encounter, etc. */
    getLoc: function() {
        return this._loc;
    },
    
    setLoc: function(loc) {
        this._loc = loc;
    },
    
    getName: function() {
        return this._monster.name;
    },
    
    getAttack: function() {
        return this._monster.attack;
    },
    
    getDefense: function() {
        return this._monster.defense;
    },
    
    getExp: function() {
        return this._monster.exp;
    },
    
    getGold: function() {
        return this._monster.gold;
    },
    
    getImageRef: function() {
        return this._monster.imgRef;
    },
    
    getLeft: function() {
        return this._monster.left;
    },
    
    getTop: function() {
        return this._monster.top;
    },
    
    getWidth: function() {
        return this._monster.width;
    },
    
    getHeight: function() {
        return this._monster.height;
    },
    
    hasSpecialAttack: function() {
        return !!this._monster.special;
    },
    
    useSpecialAttack: function() {
        this._monster.special(this);
    }
});