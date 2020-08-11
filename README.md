# egret-swiper

#### 功能介紹
基于egret eui框架实现的模拟swiper卡片滑动效果。

#### 使用框架
以下是实现细节既然用到滑动，egret的eui库有scroll，game库有scrollview。这里用的是scroll。如果你用的是game库，可能有差异。


#### 代码实现
> 主要的难点有2个，中间大两边小，两边遮挡。

1. 中间大两边小：这里的333是我们项目的卡牌宽度，大家根据自己的实际情况修改。
```
const sp = 333/2;
var center = Math.round((this.scroller.viewport.scrollH+333)/(333/2));
var i=0;
for(i=0;i<this.group.numChildren;i++){
    var child = this.group.getChildAt(i);
    var offset = child.x-this.scroller.viewport.scrollH-333;
    
    var scale = 0;
    if(offset<=-sp*2){
        scale = 0.8;
    } else if(offset<=-sp*1){
        if(offset==-sp*1){
            scale = 0.9
        } else {
            scale =0.9-Math.abs((sp*1+offset)/sp)*0.1;
        }
    } else if(offset<-sp*0){
        scale = 0.9+0.1-Math.abs(offset/sp)*0.1;
    } else if(offset<=sp*1){
        scale= 1-Math.abs(offset/sp)*0.1;
    } else if(offset<=sp*2){
        scale = 1-Math.abs(offset/sp)*0.1;
    } else {
        scale = 0.8;
    }

    child.scaleX=child.scaleY = scale;
}
```
2. 这里有一点需要注意，当使用setChildIndex修改子物体的层级的时候，改的并不是zindex，在节点的位置会变，如果直接用getChildAt获取位置和实际看到的不一样 。所以在初始化的时候先便利一下保存在startchildren里。
```
if(this.oldCenter!=center){
    const max = this.group.numChildren;
    var i=0;
    for(i=0;i<max;i++){
        var older = i;
        if(i<center){
            older = i+1;
        } else if(i==center){
            older = max+1;
        } else{
            older = max-i;
        }
        this.group.setChildIndex(this.startChildren[i],older);
    }
}
this.oldCenter = center;
```
3. 新增滑动结束后自动居中
4. 新增无限循环