cc.Class({
    extends: cc.Component,

    properties: {
        Canvas:{
            type:cc.Node,
            default:null,
        },
        ballPrefab: {
            type: cc.Prefab,
            default: null,
        },
    },

    start () {
        this.DataManager = this.Canvas.getComponent("DataManager");
        this.board = this.DataManager.board;

        this.ballArray = []; 
        this.initOneBall();
    },

    initOneBall() {
        var ball = this.creatorNewBall();
        this.addBall(ball);

        this.board.needShotBall();        
    },
    creatorNewBall() {
        var ball = cc.instantiate(this.ballPrefab);
        return ball;
    },
    addBall(ball) {
        this.ballArray.push(ball);
        this.board.node.addChild(ball)
    },

    //当要发球时，此时只存在一个球
    getFirstBall() {
        var arr = this.ballArray;
        return arr[0];
    },

    getBallsCount() {
        return this.ballArray.length;
    },

    clearBalls(){
        let c = this.getBallsCount();
        for(let i = 0; i < c; i++){
            let ball = this.getFirstBall();
            this.deleteBall(ball);
        }
    },

    deleteBall(ball) {
        var index = this.ballArray.indexOf(ball);
        var ball = this.ballArray[index];
        var ballSrc = ball.getComponent("ball");
        this.ballArray.splice(index, 1);
        ballSrc.destroySelf();
    },
});
