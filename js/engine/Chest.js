/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Old School RPG Map.
 *
 * The Initial Developer of the Original Code is Jono Xia.
 * Portions created by the Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Jono Xia <jono@mozilla.com>
 *   Gaurav Munjal <Gaurav0@aol.com>
 *   Jebb Burditt <jebb.burditt@gmail.com>
 *   David Leonard <sephirothcloud1025@yahoo.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
 

/* Class representing a treasure chest */
var Chest = Sprite.extend({
    _init: function(x, y, imgRef, subMapId, flagName) {
        this._super(x, y, TILE_WIDTH, TILE_HEIGHT, imgRef, subMapId);
        this._flagName = flagName;
        this._open = false;
        
        var chest = this;
        
        // Determine if chest is open when game is loaded
        g_game.addLoadFunction(function() {
            if (g_game.isFlagSet(chest._flagName))
                chest._open = true;
            else
                chest._open = false;
        });
    },
    
    /* is the treasure chest open? */
    isOpen: function() {
        return this._open;
    },
    
    /* Open the treasure chest */
    open: function() {
        this.clear();
        this._open = true;
        g_game.setFlag(this._flagName);
        this.plot();
    },
    
    /* Draw the treasure chest */
    plot: function(sourceOffsetX, sourceOffsetY, destOffsetX, destOffsetY) {
        
        var newSourceOffsetX = 0;
        if (this._open)
            newSourceOffsetX = TILE_WIDTH;
            
        this._super(newSourceOffsetX, 0, destOffsetX, destOffsetY);
    },
    
    /* called from action method of chests section of g_mapData,
       used to indicate how much gold user will receive upon
       opening the chest */
    onOpenFindGold: function(amt) {
        if (!this.isOpen()) {
            this.open();
            g_player.earnGold(amt);
            g_textDisplay.displayText("You found " + amt + " gold.");
        }
    },
    
    /* called from action method of chests section of g_mapData,
       used to indicate what item(s) user will receive upon
       opening the chest */
    onOpenFindItem: function(msg, itemId, amt) {
        if (!this.isOpen()) {
            this.open();
            g_player.addToInventory(itemId, amt);
            g_textDisplay.displayText(msg);
        }
    },
    
    
    /* called from action method of chests section of g_mapData,
       used to indicate what spell(s) character will learn upon
       opening the chest */
    onOpenLearnSpell: function(spellId) {
        if (!this.isOpen()) {
            this.open();
            g_player.learnSpell(spellId);
            var msg = "You found a spell book.\n";
            var spellName = g_spellData.spells[spellId].name;
            msg += "You learned " + spellName + ".";
            g_textDisplay.displayText(msg);
        }
    }
});