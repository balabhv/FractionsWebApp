// Current Version used for savegame compatibility checking
var CURRENT_VERSION = "0.1pre 20130317"

// How many pixels is one square of the map
var TILE_WIDTH = 32;
var TILE_HEIGHT = 32;

/* How many map squares to display at a time (in both x and y dimensions) in
 * the screen view */
var TILES_ON_SCREEN_X = 13;
var TILES_ON_SCREEN_Y = 11;

/* The auto-scrolling code will scroll the map to try to keep the player
 * character sprite's position between square 3 and square 7 of the screen
 * view */
var MIN_SCREEN_SQUARE_X = 5;
var MAX_SCREEN_SQUARE_X = 7;
var MIN_SCREEN_SQUARE_Y = 4;
var MAX_SCREEN_SQUARE_Y = 6;

// Width and Height of sprites
var SPRITE_WIDTH = 32;
var SPRITE_HEIGHT = 48;

// Maximum frames per second
var FPS = 30;

// Scroll factor for scroll animation
var SCROLL_FACTOR = 4;

// How often to battle
var BATTLE_FREQ = 0.14;

// How long to wait in ms between writing lines
var MESSAGE_DELAY = 500;

/* Globals */

// 4 Canvases and counting
var mapCanvas = document.getElementById("mapCanvas");
var mapCtx = mapCanvas.getContext("2d");
var spriteCanvas = document.getElementById("spriteCanvas");
var spriteCtx = spriteCanvas.getContext("2d");
var menuCanvas = document.getElementById("menuCanvas");
var menuCtx = menuCanvas.getContext("2d");
var textCanvas = document.getElementById("textCanvas");
var textCtx = textCanvas.getContext("2d");

var g_game = null;
var g_player = null;
var g_worldmap = null;
var g_titlescreen = true;
var g_textDisplay = new TextDisplay();
var g_menu = new MainMenu();
var g_shop = new Shop();
var g_battle = null;
var g_fullscreen = false;
var g_progress = new Progress();

var g_elements = [
    mapCanvas,
    spriteCanvas,
    menuCanvas,
    textCanvas,
    document.getElementById("gamepad")
];

// Utility function to load the xml for a tileset
// Callback function must have mapXml parameter.
function loadXml(xmlUrl, callback) {
    $.ajax({
        type: "GET",
        url: xmlUrl,
        dataType: "xml",
        async: false,
        success: callback,
        error: function(a,b,c) {
            alert('error:' + b);
        }
    });
}

// Process the g_imageData JSON and start loading the images
function loadImages() {
    for (var imgRef in g_imageData.images) {
        var ref = g_imageData.images[imgRef];
        var url = ref.url;
        var img = new Image();
        ref.img = img;
        g_progress.addResource(url, img);
        img.onload = (function(ref1, url1) {
            return function() {
                g_progress.setLoaded(url1);
                if (!!ref1.load)
                    ref1.load();
            };
        })(ref, url);
        
        // src set must be after onload function set due to bug in IE9
        img.src = url;
    }
}

// In non ES5 browsers, Object.keys may not be defined:
if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = new Array();
        for (var k in obj) if (obj.hasOwnProperty(k)) keys.push(k);
        return keys;
    };
}

// Process the g_mapData JSON and start loading the maps and tilesets
function loadMaps() {
    var setupFunctions = 0;
    var numSubmaps = Object.keys(g_mapData.submaps).length;

    for (var i = 0; i < numSubmaps; ++i) {
        var mapData = g_mapData.submaps[i];
        var mapId = mapData.id;
        var tileset = new Tileset(mapData.tileset.width, mapData.tileset.height, mapData.tileset.imgRef);
        var xmlUrl = mapData.xmlUrl;
        g_progress.addResource(xmlUrl);
        loadXml(xmlUrl, (function(mapData, mapId, tileset, xmlUrl) {
            return function(mapXml) {
                g_progress.setLoaded(xmlUrl);
                var map = null;
                if (mapId == 0) {
                    g_worldmap = new WorldMap(mapXml, tileset, mapData.music);
                    map = g_worldmap.getSubMap(0);
                } else {
                    map = new SubMap(mapXml, tileset, mapData.overWorld, mapData.music);
                    g_worldmap.addSubMap(mapId, map);
                }
                if (!!mapData.load)
                    mapData.load();
                
                // Setup Random Encounters
                var defaultZone = mapData.zone;
                if (mapData.randomEncounters) {
                    for (var x = 0; x < map.getXLimit(); ++x) {
                        for (var y = 0; y < map.getYLimit(); ++y) {
                            var square = map.getSquareAt(x, y);
                            if (square.passable()) {
                                square.onEnter = function() {
                                    if (Math.random() < BATTLE_FREQ) {
                                        keyBuffer = 0;
                                        g_battle = new Battle();
                                        var zone = this.getZone();
                                        if (!zone)
                                            zone = defaultZone;
                                        g_battle.setupRandomEncounter(zone, mapData.background, mapData.battleMusic);
                                        g_battle.draw();
                                    }
                                };
                            }
                        }
                    }
                }
                
                // Entrances to other maps
                var submap = g_worldmap.getSubMap(mapId);
                if (mapData.entrances) {
                    for (var i = 0; i < mapData.entrances.length; ++i) {
                        var entrance = mapData.entrances[i];
                        var square = submap.getSquareAt(entrance.fromX, entrance.fromY);
                        square.onEnter = (function(entrance) {
                            return function() {
                                g_worldmap.goToMap(g_player,
                                    entrance.toMapId,
                                    entrance.toX,
                                    entrance.toY,
                                    entrance.toScrollX,
                                    entrance.toScrollY,
                                    entrance.facing);
                                if (!!entrance.onEnter)
                                    entrance.onEnter();
                            };
                        })(entrance);
                    }
                }
                
                // Exits
                if (mapData.exit) {
                    function doExit() {
                        g_worldmap.goToMap(g_player,
                            mapData.exit.toMapId,
                            mapData.exit.toX,
                            mapData.exit.toY,
                            mapData.exit.toScrollX,
                            mapData.exit.toScrollY,
                            mapData.exit.facing);
                    }
                    
                    var xLimit = map.getXLimit();
                    var yLimit = map.getYLimit();
                    if (mapData.exit.at == "edges") {
                        for (var x = 0; x < xLimit; x++)
                            for (var y = 0; y < yLimit; y++)
                                if (x == 0 || y == 0 || x == xLimit - 1 || y == yLimit - 1) {
                                    submap.getSquareAt(x, y).onEnter = doExit;
                                }
                    } else if (mapData.exit.at == "bottom") {
                        var y = yLimit - 1;
                        for (var x = 0; x < xLimit; x++)
                            submap.getSquareAt(x, y).onEnter = doExit;
                    } else if (mapData.exit.at == "top") {
                        var y = 0;
                        for (var x = 0; x < xLimit; x++)
                            submap.getSquareAt(x, y).onEnter = doExit;
                    } else if (mapData.exit.at == "left") {
                        var x = 0;
                        for (var y = 0; y < yLimit; y++)
                            submap.getSquareAt(x, y).onEnter = doExit;
                    } else if (mapData.exit.at == "right") {
                        var x = xLimit - 1;
                        for (var y = 0; y < yLimit; y++)
                            submap.getSquareAt(x, y).onEnter = doExit;
                    }
                }
                
                // NPCs
                if (mapData.npcs) {
                    for (var i = 0; i < mapData.npcs.length; ++i) {
                        var npcData = mapData.npcs[i];
                        var npc = new Character(npcData.locX,
                            npcData.locY,
                            npcData.imgRef,
                            mapId,
                            npcData.facing,
                            npcData.walks,
                            npcData.zone);
                        npc.action = (function(npcData) {
                            return function() {
                                this.facePlayer();
                                if (!!npcData.callback)
                                    g_textDisplay.setCallback(npcData.callback);
                                if (typeof(npcData.displayText) == "function")
                                    g_textDisplay.displayText(npcData.displayText());
                                else
                                    g_textDisplay.displayText(npcData.displayText);
                            };
                        })(npcData);
                        map.addSprite(npc);
                        npcData.npc = npc;
                    }
                }
                
                // Actions
                if (mapData.actions) {
                    for (var i = 0; i < mapData.actions.length; ++i) {
                        var actionData = mapData.actions[i];
                        var square = submap.getSquareAt(actionData.locX, actionData.locY);
                        square.onAction = (function(actionData) {
                            return function() {
                                if (!actionData.dir || actionData.dir == g_player.getDir())
                                    actionData.onAction();
                            };
                        })(actionData);
                    }
                }
                
                // Treasure Chests
                if (mapData.chests) {
                    for (var i = 0; i < mapData.chests.length; ++i) {
                        var chestData = mapData.chests[i];
                        var chest = new Chest(chestData.locX,
                            chestData.locY,
                            chestData.imgRef,
                            mapId,
                            chestData.event);
                        chest.action = chestData.action;
                        map.addSprite(chest);
                    }
                }
                
                if (++setupFunctions == numSubmaps)
                    g_progress.finishSetup();
            };
        })(mapData, mapId, tileset, xmlUrl));
    }
}

/* Main Game setup code */
$(document).ready(function() {
    
    // What to do after loading is complete
    g_progress.onComplete = function() {
        document.getElementById("loaded").innerHTML = "Loading Complete!";
    };
    
    // What to do if loading fails
    g_progress.onFail = function() {
        var html = "One or more resource(s) was not loaded:<br>";
        var list = g_progress.getList();
        for (var i = 0; i < list.length; ++i)
            html += list[i] + "<br>"
        document.getElementById("loaded").innerHTML = html;
    };

    g_game = new Game("titlescreen");
        
    loadImages();
            
    loadMaps();
});

// Utility function to print a message to user
// regardless of whether in battle or on map
function printText(msg) {
    if (g_battle)
        g_battle.writeMsg(msg);
    else
        g_textDisplay.displayText(msg);
}

// Procedurally generate gui box similar to
// http://opengameart.org/content/rpg-gui-block-element
function drawBox(ctx, x, y, width, height, radius, lineWidth) {
    
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "white";
    
    var left = x + 2 * lineWidth;
    var top = y + 2 * lineWidth;
    var right = x + width - 2 * lineWidth;
    var bottom = y + height - 2 * lineWidth;
    
    ctx.beginPath();
    ctx.moveTo(left + radius, top);
    ctx.lineTo(right - radius, top);
    ctx.quadraticCurveTo(right, top, right, top + radius);
    ctx.lineTo(right, bottom - radius);
    ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
    ctx.lineTo(left + radius, bottom);
    ctx.quadraticCurveTo(left, bottom, left, bottom - radius);
    ctx.lineTo(left, top + radius);
    ctx.quadraticCurveTo(left, top, left + radius, top);
    ctx.closePath();
    
    ctx.shadowOffsetX = lineWidth / 2;
    ctx.shadowOffsetY = lineWidth / 2;
    ctx.shadowBlur = lineWidth;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    
    var grd = ctx.createLinearGradient(x, y, x, y + height);
    grd.addColorStop(0, "#0066FF");
    grd.addColorStop(1, "#000099");
    ctx.fillStyle = grd;
    ctx.fill();    
    ctx.stroke();
    
    //Turn off the shadow
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
}

// forward setOnNewGame to main menu
function setOnNewGame(callback) {
    g_menu.setOnNewGame(callback);
}

/* Input Handling */
var DOWN_ARROW = 40;
var UP_ARROW = 38;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var SPACEBAR = 32;
var ENTER = 13;
var ESC = 27;
var keyBuffer = 0;
var keyDown = false;

function handleKeyPress(event) {
    if (!event.ctrlKey && !event.altKey && !event.metaKey) {
        var key = event.keyCode ? event.keyCode : event.charCode ? event.charCode : 0;
        keyDown = true;
        handleKey(key, event);
    }
}

function handleKeyUp() {
    keyDown = false;
    if (g_battle)
        g_battle.handleKeyUp();
}

// Send a key event to an appropriate function given game state
function handleKey(key, event) {
    if (g_progress.isLoadComplete()) {
        if (g_worldmap.isAnimating()) {
            keyBuffer = key;
            event.preventDefault();
        } else {
            switch (key) {
                case DOWN_ARROW:
                    if (g_menu.isDisplayed())
                        g_menu.handleKey(key);
                    else if (g_shop.shopDisplayed())
                        g_shop.handleKey(key);
                    else if (g_battle)
                        g_battle.handleKey(key);
                    else if (!g_titlescreen && !g_textDisplay.textDisplayed() && !g_worldmap.isAnimating())
                        g_player.move(0, 1, FACING_DOWN);
                    event.preventDefault();
                    break;
                case UP_ARROW:
                    if (g_menu.isDisplayed())
                        g_menu.handleKey(key);
                    else if (g_shop.shopDisplayed())
                        g_shop.handleKey(key);
                    else if (g_battle)
                        g_battle.handleKey(key);
                    else if (!g_titlescreen && !g_textDisplay.textDisplayed() && !g_worldmap.isAnimating())
                        g_player.move(0, -1, FACING_UP);
                    event.preventDefault();
                    break;
                case RIGHT_ARROW:
                    if (g_menu.isDisplayed())
                        g_menu.handleKey(key);
                    else if (g_shop.shopDisplayed())
                        g_shop.handleKey(key);
                    else if (g_battle)
                        g_battle.handleKey(key);
                    else if (!g_titlescreen && !g_textDisplay.textDisplayed() && !g_worldmap.isAnimating())
                        g_player.move(1, 0, FACING_RIGHT);
                    event.preventDefault();
                    break;
                case LEFT_ARROW:
                    if (g_menu.isDisplayed())
                        g_menu.handleKey(key);
                    else if (g_shop.shopDisplayed())
                        g_shop.handleKey(key);
                    else if (g_battle)
                        g_battle.handleKey(key);
                    else if (!g_titlescreen && !g_textDisplay.textDisplayed() && !g_worldmap.isAnimating())
                        g_player.move(-1, 0, FACING_LEFT);
                    event.preventDefault();
                    break;
                case SPACEBAR:
                case ENTER:
                    if (g_textDisplay.textDisplayed())
                        g_textDisplay.clearText();
                    else if (g_menu.isDisplayed())
                        g_menu.handleEnter();
                    else if (g_shop.shopDisplayed())
                        g_shop.handleEnter();
                    else if (g_battle)
                        g_battle.handleEnter();
                    else if (!g_worldmap.isAnimating()) {
                        g_worldmap.doAction();
                        g_player.getSquareUnderfoot().onAction();
                    }
                    event.preventDefault();
                    break;
                case ESC:
                    if (g_textDisplay.textDisplayed())
                        g_textDisplay.clearText();
                    else if (g_menu.isDisplayed())
                        g_menu.handleESC();
                    else if (g_shop.shopDisplayed())
                        g_shop.handleESC();
                    else if (g_battle)
                        g_battle.handleESC();
                    else
                        g_menu.getCurrentMenu().display();
                    event.preventDefault();
                    break;
            }
        }
    }
}

// Called after an animation is over or game is otherwise
// no longer busy. Handle the key saved in the buffer.
function handleBufferedKey() {
    if (keyBuffer && !g_battle && !g_worldmap.isAnimating()) {
        var key = keyBuffer;
        keyBuffer = 0;
        switch (key) {
            case DOWN_ARROW:
                g_player.move(0, 1, FACING_DOWN);
                break;
            case UP_ARROW:
                g_player.move(0, -1, FACING_UP);
                break;
            case RIGHT_ARROW:
                g_player.move(1, 0, FACING_RIGHT);
                break;
            case LEFT_ARROW:
                g_player.move(-1, 0, FACING_LEFT);
                break;
            case SPACEBAR:
            case ENTER:
                if (g_textDisplay.textDisplayed())
                    g_textDisplay.clearText();
                else
                    g_worldmap.doAction();
                break;
        }
    }
}

if (window.opera || $.browser.mozilla)
    $(window).keypress(handleKeyPress);
else
    $(window).keydown(handleKeyPress);
$(window).keyup(handleKeyUp);

/* Handle onscreen gamepad */
$(document).ready(function() {
    
    var upButton = document.getElementById("upButton");
    upButton.onclick = function(event) { handleKey(UP_ARROW, event); }
    var downButton = document.getElementById("downButton");
    downButton.onclick = function(event) { handleKey(DOWN_ARROW, event); }
    var leftButton = document.getElementById("leftButton");
    leftButton.onclick = function(event) { handleKey(LEFT_ARROW, event); }
    var rightButton = document.getElementById("rightButton");
    rightButton.onclick = function(event) { handleKey(RIGHT_ARROW, event); }
    var escButton = document.getElementById("escButton");
    escButton.onclick = function(event) { handleKey(ESC, event); }
    var enterButton = document.getElementById("enterButton");
    enterButton.onclick = function(event) { handleKey(ENTER, event); }
});

/* Experimental Full Screen Support
 * Activate by double clicking
 * Right now, scrolling performs well only in IE9 in my tests */
