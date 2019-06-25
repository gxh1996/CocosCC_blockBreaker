cc.Class({
    extends: cc.Component,

    properties: {
        propNum: 0,
    },
    start () {
    },

    getBlockInfo(){
        return {
            position : this.node.getPosition(),
            color : this.getColor(),
            propNum : this.propNum,
        };
    },
    getColor(){
        let _color = this.node.color;
        let color = {
            a : _color.getA(),
            b : _color.getB(),
            g : _color.getG(),
            r : _color.getR(),
        };
        return color;
    },

    init(position, color, propNum){
        this.node.setPosition(position);
        this.setColor(color);
        this.propNum = propNum;
    },
    //修改block的color
    setColor(color){
        let _color = this.node.color;
        _color.setA(color.a);
        _color.setB(color.b);
        _color.setG(color.g);
        _color.setR(color.r);
    },

    destroySelf(){
        // console.log("#开始移除该节点");

        var parent = this.node.parent;
        parent.removeChild(this.node);
        this.destroy();

        // console.log("#移除该节点成功");
    },  

    addToBlockRoot(parent){
        parent.addChild(this.node);
    }
});
