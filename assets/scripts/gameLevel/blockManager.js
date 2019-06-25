cc.Class({
    extends: cc.Component,

    properties: {
        blockPrefab: {
            type: cc.Prefab,
            default: null,
        },
        Canvas:{
            type:cc.Node,
            default:null,
        },
    },

    start () {

        this.DataManager = this.Canvas.getComponent("DataManager");

        this.blockInfoArray = [];
        this.blockNodeArray = this.node.children;
        
        // let JsonTxt = JSON.stringify(blockInfoArray);
        
        this.getBlockNodeInfo(this.blockInfoArray, this.blockNodeArray);
    },

    clearMap(){
        let len = this.blockNodeArray.length;
        for(let i = len - 1; i >= 0; i--){
            let blockScr = this.blockNodeArray[i].getComponent("block");
            blockScr.destroySelf();
        }
    },

    resetBlockMap(){
        console.log("#create block map");

        let len = this.blockInfoArray.length;
        for(let i = 0; i < len; i++){
            let blockInfo = this.blockInfoArray[i];
            let block = cc.instantiate(this.blockPrefab);
            let blockScr = block.getComponent("block");
            blockScr.init(blockInfo.position, blockInfo.color, blockInfo.propNum);
            blockScr.addToBlockRoot(this.node);
        }
    },

    getBlockNodeInfo(InfoArray, NodeArray){
        for(let i in NodeArray){
            let blockScr = NodeArray[i].getComponent("block");
            let info = blockScr.getBlockInfo(); 
            InfoArray.push(info);
        }
    },

    getBlockCount(){
        var c = this.node.children.length;
        return c;
    },
    


});




