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
	private oldH = 0;
	private updateContent(evt:eui.UIEvent){
		const sp = 333/2;
		if(this.oldH==this.scroller.viewport.scrollH){
			return;
		}
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
			// this.startChildren[i].scaleX=this.startChildren[i].scaleY = scale;
			
			
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
		this.oldH = this.scroller.viewport.scrollH;
	}
	private getRealIndex(j:number){
		var result = 0;
		var i=0;
		for(i=0;i<this.startChildren.length;i++){
			if(this.startChildren[i].name==(""+j)){
				result = i;
				break;
			}
		}
		return result;
	}
}