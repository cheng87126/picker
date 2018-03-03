export default class Picker {
	constructor(options){
		this.options = {
			itemVal:0
		}
		this.touch = false
		this.lineHeight = 60
		this.events = []
		for(let key in options){
			if(Object.prototype.hasOwnProperty.call(options,key)){
				this.options[key] = options[key]
			}
		}
		this.selectIndex = []
		this.selectVal = []

		this.createPicker()
	}
	createPicker(){
		this.picker = document.createElement('div')
		let str = `<div class="picker-box picker-box-close">
			<header>
				<div class="cancel">取消</div>
				<span>${this.options.title}</span>
				<div class="confirm">确定</div>
			</header>
			<section class="picker-content"></section>
			<div class="line"></div>
		</div>`
		let li = ''
		this.options.itemDis = this.options.itemDis || this.options.item 
		this.options.item.forEach((i)=>{
			li += `<li data-val="${i}">${this.options.itemDis[i]}</li>`
		})
		li = `<ul>${li}</ul>`
		this.picker.innerHTML = str
		document.body.appendChild(this.picker)
		document.querySelector('.picker-content').innerHTML = li

		this.ul = document.querySelector('.picker-content ul')
		this.bindEvent()
		this.setVal(this.options.itemVal)
	}
	bindEvent(){
		let cont = document.querySelector('.picker-content')
		cont.addEventListener('touchstart',this,false)
		document.addEventListener('touchmove',this,false)
		document.addEventListener('touchend',this,false)

		document.querySelector('.picker-box .cancel').addEventListener('touchstart',()=>{
			this.hide()
			this.trigger('cancel')
		},false)
		document.querySelector('.picker-box .confirm').addEventListener('touchstart',()=>{
			this.hide()
			this.trigger('confirm')
		},false)
	}
	handleEvent(e){
		let type = e.type || e.touches[0].type,
			dis
		switch(type){
			case 'touchstart':
				this.touch = true
				this.startY = e.pageY || e.touches[0].pageY
				break
			case 'touchmove':
				if(!this.touch) return
				this.currentY = e.pageY || e.touches[0].pageY
				dis = this.currentY - this.startY
				this.startY = this.currentY
				this.ul.style.transform = this.ul.style.transform.replace(/(-?\d+)/,m => {		
					return parseInt(+m + dis)
				})
				break
			case 'touchend':
				this.touch = false
				this.ul.style.transform = this.ul.style.transform.replace(/(-?\d+)/,m => {		
					let y = Math.round(m / this.lineHeight) * this.lineHeight
					y = y > this.lineHeight * 2 ? this.lineHeight * 2 : y < this.lineHeight * (3 - this.options.item.length) ? this.lineHeight * (3 - this.options.item.length) : y 
					this.selectIndex = 2 - y / this.lineHeight
					this.selectVal = this.options.itemDis[this.selectIndex]
					return y
				})
				break
		}
	}
	setVal(idx){
		let y = (2 - idx) * this.lineHeight
		this.selectIndex = idx
		this.selectVal = this.options.itemDis[idx]
		this.ul.style.cssText = `transform:translateY(${y}px)`
	}
	trigger(type){
		this.events[type] && this.events[type].call(this,{
			idx:this.selectIndex,
			val:this.selectVal
		})
	}
	on(type,cb){
		this.events[type] = cb
	}
	show(){
		document.querySelector('.picker-box').classList.remove('picker-box-close')
	}
	hide(){
		document.querySelector('.picker-box').classList.add('picker-box-close')
	}
}