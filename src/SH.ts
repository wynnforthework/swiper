class SH extends eui.Component implements  eui.UIComponent {
	private group:eui.Group;
	private scroller:eui.Scroller;
	public constructor() {
		super();
	}
	private startChildren = [];

	private initScroll(){
		const gap = 333/2;
		var i=0;
		for(i=0;i<this.group.numChildren;i++){
			var child = this.group.getChildAt(i);
			child.name = ""+i;
			child.x = gap*i;
			this.startChildren.push(child);
		}
		this.scroller.width = gap*6;
		this.scroller.addEventListener(eui.UIEvent.CHANGE,this.updateContent,this);
		this.scroller.addEventListener(eui.UIEvent.CHANGE_END,this.onScrollEnd,this);
		egret.Ticker.getInstance().unregister(this.onTick, this);
	}
	
	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.initScroll();
		this.updateContent(null);
	}
	private oldCenter:number = 0;
	private updateContent(evt:eui.UIEvent){
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
	}
	private autoScrolling=false;
    private targetScrollH = 0;
	private onScrollEnd(evt:eui.UIEvent):void{
		const gap = 333/2;
        var a = Math.round(this.scroller.viewport.scrollH/gap);
		this.targetScrollH = a*gap;
		this.oldCenterIndex += 8-this.oldCenter;
        this.autoScrolling = true;
	}
	private moveLeft():void{
        this.oldCenterIndex++;
        this.targetScrollH = this.scroller.viewport.scrollH - 333/2;;
        this.autoScrolling = true;
    }
	private moveRight():void{
        this.oldCenterIndex--;
        this.targetScrollH = this.scroller.viewport.scrollH + 333/2;;
        this.autoScrolling = true;
    }
	private oldCenterIndex = 0;
    private onTick(frameTime: number) {
        if (this.autoScrolling) {
            this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            if(this.scroller.viewport.scrollH>this.targetScrollH+10){
                this.scroller.viewport.scrollH -= 10;
            } else if(this.scroller.viewport.scrollH<this.targetScrollH-10){
                this.scroller.viewport.scrollH += 10;
            } else {
                this.scroller.viewport.scrollH = this.targetScrollH;
                this.autoScrolling = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
                const max = this.group.numChildren;
                // const dataCount = this.dataArr.length;
		        const gap = 333/2;
                this.scroller.viewport.scrollH = gap*6;
                for(var i=0;i<max;i++){
                    var child:any = this.startChildren[i];
                    // var ind = (dataCount+i-this.oldCenterIndex%dataCount)%dataCount;
                    // child.card.source = this.dataArr[ind].image;
                }
		        this.updateContent(null);
            }
        }
    }
}