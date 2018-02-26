export default class Picker {
	constructor(options){
		for(let key in options){
			if(Object.prototype.hasOwnProperty.call(key,options)){
				this.options[key] = options[key]
			}
		}
		this.selectIndex = []
	}
	createPicker(){
		this.picker = document.createElement('div')
		let str = `<div class="picker-box">
			<header>
				<div class="cancel">取消</div>
				<span>${this.options.title}</span>
				<div class="confirm">确定</div>
			</header>
			<div class="picker-content"></div>
		</div>`
		this.options.item.forEach(function(i){
			
		})
	}
}