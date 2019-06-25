cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    sceneJump(e, sceneName){
        cc.director.loadScene(sceneName);
    },
});
