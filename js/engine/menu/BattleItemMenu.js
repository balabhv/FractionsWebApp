/*var BattleItemMenu = Menu.extend({
    _init: function(parent, battle) {
        this._battle = battle;
        this._parent = parent;
        var screenWidth = mapCanvas.width;
        var screenHeight = mapCanvas.height;
        this._items = [];
        var numItems = this._getItems();
        var texts = this._getTexts();
        var flags = this._getFlags();
        var callbacks = this.createCallbacks(numItems);
        var menu = this;
        this._super({
            type: BATTLE_ITEM_MENU,
            numberSelections: numItems,
            drawBox: false,
            left: 133,
            top: screenHeight - 150,
            width: screenWidth - 133,
            height: 150,
            radius: 15,
            thickness: 3,
            pointerLeft: 154,
            textLeft: 180,
            heights: [
                screenHeight - 132, 
                screenHeight - 110, 
                screenHeight - 86, 
                screenHeight - 62,
                screenHeight - 38
            ],
            texts: texts,
            flags: flags,
            font: "bold 16px sans-serif",
            callbacks: callbacks,
            canESC: true,
            onFlag: function() { menu._battle.setMonsterWillAttack(false); },
            afterCallback: function() { menu._parent.returnTo(true); },
            afterClear: function() { menu._parent.returnTo(true); }
        });
    },
    
    _getItems: function() {
        var numItems = 0;
        var itemMenu = this;
        g_player.forEachItemInInventory(function(itemId, amt) {
            if (amt > 0) {
                var item = {};
                item.name = g_itemData.items[itemId].name;
                item.type = g_itemData.items[itemId].type;
                item.amt = amt;
                item.id = itemId;
                item.canUse = g_itemData.items[itemId].usable;
                itemMenu._items.push(item);
                numItems++;
            }
        });
        
        return numItems;
    },
    
    _getTexts: function() {
        var texts = [];
        for (var i = 0; i < this._items.length; ++i) {
            var item = this._items[i];
            var amt2 = (item.amt < 10) ? " " + item.amt : item.amt;
            texts[i] = item.name + ":" + amt2;
        }
        return texts;
    },
    
    _getFlags: function() {
        return _.map(this._items, function(item, index) {
            return !item.canUse;
        });
    },

    callback: function(i) {
        var item = this._items[i];
        this.clear();
        var theItem = g_itemData.items[item.id];
        theItem.use(g_player);
        g_player.removeFromInventory(item.id);
        g_battle.setMonsterWillAttack(true);
    }
});*/