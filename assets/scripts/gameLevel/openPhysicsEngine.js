cc.Class({
    extends: cc.Component,

    properties: {
        is_debug:false,//是否调试
        gravity:cc.v2(0,-320),//系统默认
    },
    onLoad () {
        //开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
        if(this.is_debug){
            //开启调试信息
            var Bits = cc.PhysicsManager.DrawBits;//这是我们要显示的类型信息
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit | Bits.e_centerOfMassBit;
        }
        else{
            //关闭调试
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        cc.director.getPhysicsManager().gravity = this.gravity;
    },
});
