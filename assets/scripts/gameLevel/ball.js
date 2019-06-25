cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        
        this.speed = 400;
        this.height = 30; //初始离弹板的高度
        this.maxRandomFator = Math.PI / 3;
        this.minRandomFator = Math.PI / 6;

        this.initPos();

        console.log("ball speed:", this.speed);
    },

    getPos(){
        return this.node.getPosition();
    },

    //设置初始速度
    InitVel(){
        this.rigidBody.linearVelocity = cc.v2(0, this.speed);

        console.log("#发射球，速度为：", this.rigidBody.linearVelocity, this.speed);
    },

    initPos(){
        this.node.setPosition(0, this.height);
    },

    onEndContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.group === "BOARD")
            this.collideBoard(otherCollider.node);
        else if(otherCollider.node.group === "BLOCK")
            this.collideBlock(otherCollider.node);
    },

    //弹球与弹板有摩擦用于改变球移动方向，为保持球线速度，修正球速度
    collideBoard(board){
        
        var boardScr = board.getComponent("board");
        if(boardScr.moveDir == 0 || this.rigidBody.linearVelocity.x != 0)
            return;
        
        this.changeBallVel(boardScr);
    },
    changeBallVel(boardScr){
        var v = this.createRandomVel(this.speed);
        v.x = v.x * boardScr.moveDir;
        this.rigidBody.linearVelocity = v;

    },
    createRandomVel(vel){
        var radian = this.createRandomNum(this.minRandomFator, this.maxRandomFator);
        var newV = cc.v2(vel * Math.cos(radian), vel * Math.sin(radian));
        return newV;
    },
    createRandomNum(min, max){
        return min + Math.random() * (max - min)
    },

    collideBlock(blockNode){
        
        var blockScr = blockNode.getComponent("block");
        blockScr.destroySelf();
        // console.log(this.node.parent);
        var boardScr = this.node.parent.getComponent("board");
        console.log(boardScr);
        var DataManager = boardScr.DataManager;

        DataManager.gameUIM.addGrade(1);
        DataManager.GameController.judgeGameWin();
    },


    destroySelf(){
        this.node.active = false;
        var parent = this.node.parent;
        parent.removeChild(this.node);
        this.destroy();
    },  
});
