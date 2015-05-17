var BATTLE_MAIN_MENU = 0;
var BATTLE_ITEM_MENU = 1;
var BATTLE_SPELL_MENU = 2;
var BATTLE_MONSTER_MENU = 3;

var BATTLE_MENU_ATTACK = 0;
var BATTLE_MENU_DEFEND = 1;
var BATTLE_MENU_SPELL = 2;
var BATTLE_MENU_ITEM = 3;
var BATTLE_MENU_RUN = 4;

var NUM_BATTLE_MENU_ACTIONS_SHOWN = 3;

/* Class for the main battle menu */
var BattleMenu = Menu.extend({
    _init: function(battle) {
        var menu = this;
        this._battle = battle;
        var screenHeight = mapCanvas.height;
        this._texts1 = [ "Attack", "Defend", "Run" ];
        this._super({
            type: BATTLE_MAIN_MENU,
            numberSelections: NUM_BATTLE_MENU_ACTIONS_SHOWN,
            drawBox: true,
            left: 0,
            top: screenHeight - 150,
            width: 140,
            height: 150,
            radius: 15,
            thickness: 3,
            pointerLeft: 16,
            textLeft: 36,
            heights: [
                screenHeight - 130, 
                screenHeight - 100, 
                screenHeight - 70, 
                screenHeight - 40
            ],
            texts: this._texts1,
            // flags: flags,
            font: "bold 20px monospace",
            callbacks: [
                function() { menu._battle.beginAttack(); },
                function() { menu._battle.defend(); },
                function() { menu._battle.run(); }
            ],
            canESC: false
        });
        this._currentMenu = this;
    },
    
    /* Get the current menu */
    getCurrentMenu: function() {
        return this._currentMenu;
    },
    
    /* Set the current menu */
    setCurrentMenu: function(menu) {
        this._currentMenu = menu;
    },
    
    // Called after one of the submenus is cleared
    returnTo: function(clear) {
        this._currentMenu = this;
        this.drawPointer();
        if (clear) {
            this._battle.clearText();
            this._battle.drawText();
        }
    },
    
    setDisplayed: function(displayed) {
        this._displayed = displayed;
    },
    
    displayItemMenu: function() {
        this._battle.clearText();
        var menu = new BattleItemMenu(this, this._battle);
        menu.display();
        this._currentMenu = menu;
        this._battle.setMonsterWillAttack(false);
    },
    
    displaySpellMenu: function() {
        this._battle.clearText();
        var menu = new BattleSpellMenu(this, this._battle);
        menu.display();
        this._currentMenu = menu;
        this._battle.setMonsterWillAttack(false);
    },
    
    /* Handles arrow key input for battle menu */
    handleKey: function(key) {
        if (this._currentMenu == this) {
            if (this._displayed) {
                this.clearPointer();
                switch(key) {
                    case DOWN_ARROW:
                        this._current++;
                        this._current %= this._num;
                        break;
                    case UP_ARROW:
                        this._current--;
                        if (this._current < 0)
                            this._current += this._num;
                        break;
                    case RIGHT_ARROW:
                    case LEFT_ARROW:
                        break;
                }
                this.drawPointer();
            }
        } else
           this._currentMenu.handleKey(key);
    },
    
    /* Called when enter key is pressed and battle menu has focus */
    handleEnter: function() {
        if (this._currentMenu == this)
            if (this._texts == this._texts1) {
                this._callbacks[this._current]();
            } else
                this._callbacks[BATTLE_MENU_RUN]();
        else
           this._currentMenu.handleEnter();
    },
    
    /* Called when ESC key is pressed and battle menu has focus */
    handleESC: function() {
        if (this._currentMenu == this && this._canESC)
           this._super();
        else
           this._currentMenu.handleESC();
    }
});