cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    update(){
        //当前关卡等级，0表示index场景
        this.currentLevel = 0;
    },

    start () {
        //全局脚本
        // cc.game.addPersistRootNode(); 

        

    },

    getCurrentLevel(){
        return this.currentLevel;
    },

    setCurrentLevel(l){
        this.currentLevel = l;
    }
    

    // update (dt) {},
});
