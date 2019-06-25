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

        this.speed = 500;
        this.height = 150;//弹板离地面的距离
        this.needShot = true;
        this.moveToX = null;
        this.moveDir = 0; //移动方向 
        this.ScreenH = cc.view.getVisibleSize().height;
        this.initPosY = -this.ScreenH / 2 + this.height; 

        //弹板可移动范围
        var ScreenW = this.Canvas.width;
        this.moveRangeMaxX = ScreenW / 2 - this.node.width / 2;
        this.moveRangeMinX = -this.moveRangeMaxX;
        
        this.initBoard();
    },

    initBoard(){
        this.node.setPosition(0, this.initPosY);

        console.log("#初始化弹板坐标：", this.node.getPosition());
    },

    padgeMove(x){
        this.padgeDirection(x);
        if(this.moveDir == 0)
            return;
        this.moveToX = this.amendX(x);
    },

    //修正移动坐标
    amendX(x){
        if(this.moveDir > 0 && x > this.moveRangeMaxX)
            return this.moveRangeMaxX;
        if(this.moveDir < 0 && x < this.moveRangeMinX)
            return this.moveRangeMinX;
        return x;
    },

    padgeDirection(x){
        var cx = this.getPosX();
        var d = cx - x;
        if(d > 0)
            this.moveDir = -1;
        else if(d < 0)
            this.moveDir = 1;
        else
            this.moveDir = 0; 
    },

    isNeedMove(){
        return this.moveDir !== 0;
    },
    stopMove(){
        this.moveDir = 0;
    },

    notNeedShotBall(){
        this.needShot = false;
    },
    needShotBall(){
        this.needShot = true;
    },

    move(dt){
        var dst = this.speed * dt * this.moveDir + this.getPosX();
        if(this.moveDir > 0 && dst > this.moveToX || this.moveDir < 0 && dst < this.moveToX){
            dst = this.moveToX;
            this.node.setPosition(dst, this.initPosY);
            this.moveEnd();
            return;
        }

        this.node.setPosition(dst, this.initPosY);

    },

    //移动结束处理
    moveEnd(){
        this.stopMove();
        this.moveToX = null;
    },

    getPosX(){
        return this.node.getPosition().x;
    },

});
