cc.Class({
    extends: cc.Component,

    properties: {
        Canvas:{
            type:cc.Node,
            default:null,
        },
    },
    start () {
        this.DataManager = this.Canvas.getComponent("DataManager");
        this.ballsManager = this.DataManager.ballsManager;
        this.GameController = this.DataManager.GameController;
    },

    onBeginContact(contact, selfCollider, otherCollider){
        console.log("#floor发生碰撞,碰撞者：", otherCollider.node.group);
        if(otherCollider.node.group === "BALL")
            this.collideBall(otherCollider.node);
        
    },
    collideBall(ball){
        this.ballsManager.deleteBall(ball);
        this.GameController.judgeGameFail();
    },
});
