cc.Class({
    extends: cc.Component,

    properties: {
        createNewBallTime: 1, //生成球 的时间
    },

    start() {
        //数据对象
        this.DataManager = this.node.getComponent("DataManager");
        this.board = this.DataManager.board;
        this.gameUIM = this.DataManager.gameUIM;
        this.blockManager = this.DataManager.blockManager;

        //事件监听
        this.listenScreenTouchEvent();
        this.listenBoardTouchEvent();
    },

    //重置游戏
    resetGame(){
        console.log("#resetGame!");

        let DataManager = this.DataManager;
        let gameUIM = this.gameUIM;
        let ballsManager = DataManager.ballsManager;
        let blockManager = this.blockManager;

        let c = ballsManager.getBallsCount();
        if(c > 0)
            ballsManager.clearBalls();

        gameUIM.initHP();
        gameUIM.initGrade();
        gameUIM.updateHPLabel();
        gameUIM.updateGradeLabel();

        this.board.initBoard();
        ballsManager.initOneBall();
        blockManager.clearMap();
        blockManager.resetBlockMap();

        if(gameUIM.gameEndFace.active == true)
        gameUIM.gameEndFace.active = false;
    },

    judgeGameWin(){
        if(this.blockManager.getBlockCount() > 0)
            return;
        
        this.gameUIM.PopUpSuccessFace();
    },

    judgeGameFail(){
        var ballsManager = this.DataManager.ballsManager;
        let c = ballsManager.getBallsCount();
        if(c > 0)
            return;
        this.gameUIM.subHP();
        if(this.gameUIM.getHP() >= 1)
            this.scheduleOnce(ballsManager.initOneBall.bind(ballsManager), this.createNewBallTime);
        else
            this.gameUIM.PopUpFailFace();
    },

    listenScreenTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.boardMoveToPos, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.boardMoveToPos, this);

        // console.log("#开启全屏触摸监听");
    },
    listenBoardTouchEvent() {
        this.board.node.on(cc.Node.EventType.TOUCH_START, this.shotBallDeal, this);

        // console.log("#开启弹板触摸监听");
    },
    //触摸事件处理回调函数
    boardMoveToPos(e) {
        var posX = this.toNodePos(e.getLocation()).x;
        this.board.padgeMove(posX);

        // console.log("#触摸点：", posX);
    },
    shotBallDeal() {
        if (!this.board.needShot)
            return;
        var ball = this.DataManager.ballsManager.getFirstBall();
        var ballScr = ball.getComponent("ball");
        ballScr.InitVel();
        this.board.notNeedShotBall();

        console.log("发球时球的个数：", this.DataManager.ballsManager.getBallsCount());
    },

    //世界坐标转化为节点坐标
    toNodePos(pos) {
        return this.node.convertToNodeSpaceAR(pos);
    },

    update(dt) {
        if (this.board.isNeedMove()) {
            this.board.move(dt);
            if (this.board.needShot) {
                var ballScr = this.DataManager.ballsManager.getFirstBall().getComponent("ball");
                ballScr.initPos();
            }
        }
    },
});
