cc.Class({
    extends: cc.Component,

    properties: {
        //状态栏
        stateBarGrade:{
            type: cc.Label,
            default: null,
        },
        stateBarHP:{
            type: cc.Label,
            default: null,
        },

        //游戏结算界面
        gameEndFace: {
            type: cc.Node,
            default: null,
        },
        title: { 
            type: cc.Label,
            default: null,
        },
        finalGrade: {
            type: cc.Label,
            default: null,
        },
        
        //游戏设置界面
        gameSetFace: {
            type: cc.Node,
            default: null,
        },
        currentGrade: {
            type: cc.Label,
            default: null,
        },
        
    },

    onLoad () {
        this.initHPValue = 3;
        this.currentHP = this.initHPValue;
        this.grade = 0;
    },

    start () {
        this.DataManager = this.node.getComponent("DataManager");
        this.GameController = this.DataManager.GameController;

        this.updateHPLabel();
        this.updateGradeLabel();
    },

    subHP() {
        this.currentHP--;
        this.updateHPLabel();
    },

    addHP(){
        this.currentHP++;
        this.updateHPLabel();
    },

    getHP(){
        return this.currentHP;
    },
    initHP(){
        this.currentHP = this.initHPValue;
    },

    addGrade(g){
        this.grade += g;
        this.updateGradeLabel();
    },
    initGrade(){
        this.grade = 0;
    },

    updateHPLabel(){
        this.stateBarHP.string = this.currentHP;
    },

    updateGradeLabel(){
        this.stateBarGrade.string = this.grade;
    },

    //游戏结算
    PopUpSuccessFace(){
        this.title.string = "胜利!";
        this.PopUpEndFace();
    },
    PopUpFailFace(){
        this.title.string = "失败!";
        this.PopUpEndFace();
    },
    PopUpEndFace(){
        cc.director.pause();
        this.gameEndFace.active = true;
        this.finalGrade.string = this.grade + "分";
    },

    //游戏设置界面
    setGame(){
        cc.director.pause();
        this.gameSetFace.active = true;
        this.currentGrade.string = "当前分数为：" + this.grade + "分";
    },

    resumeGame(){
        cc.director.resume();
        this.gameSetFace.active = false;
    },

    //重新游戏
    resetGame(){
        this.GameController.resetGame();
        cc.director.resume();
        this.gameEndFace.active = false;
        this.gameSetFace.active = false;
    },

    endGame(){
        let blockManager = this.DataManager.blockManager;
        
        blockManager.clearMap();
        cc.director.loadScene("index", function(){
            console.log("加载游戏首页完毕");
        }.bind(this));
        this.gameEndFace.active = false;
        this.gameSetFace.active = false;
        cc.director.resume();
    },
});
