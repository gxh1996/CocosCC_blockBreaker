var _board = require("board");
var _floor = require("floor");
var _blockManager = require("blockManager");
var _gameLevelUIManager = require("gameLevelUIManager");
var _gameController = require("GameController");
var _ballsManager = require("ballsManager");

cc.Class({
    extends: cc.Component,

    properties: {
        board: {
            type: _board,
            default: null,
        },
        blockRoot :{
            type: cc.Node,
            default: null,
        },
        floor: {
            type: _floor,
            default: null,
        },
        GameController:{
            type: _gameController,
            default:null,
        },
        Canvas:{
            type: cc.Node,
            default: null,
        },
        blockManager:{
            type: _blockManager,
            default: null,
        },
        gameUIM:{
            type: _gameLevelUIManager,
            default: null,
        },
        ballsManager:{
            type:_ballsManager,
            default:null,
        },
        test:{
            type:cc.Node,
            default:null,
        },
    },

    start() {
        this.GameController = this.Canvas.getComponent("GameController");        
    },

});
