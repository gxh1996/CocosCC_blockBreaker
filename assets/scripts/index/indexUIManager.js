var _globelScript = require("globelScript");
cc.Class({
    extends: cc.Component,

    properties: {
        selectLevelFace:{
            type: cc.Node,
            default: null,
        },
    },

    start () {
    },


    //-------button-------
    PopUpLevelFace(){ //弹出选择关卡界面    
        this.selectLevelFace.active = true;
    },

    hiddenLevelFace(){
        this.selectLevelFace.active = false;
    },

    sceneJump(e, level){
        cc.director.loadScene("gameLevel", function(){
            console.log("加载游戏关卡完毕");
        }.bind(this));
        this.hiddenLevelFace();
    },

    exitGame(){
        cc.game.end();
    },
});
