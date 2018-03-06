export default class Picker {
	constructor(options){
		this.options = {
			itemVal:[]
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
		this.options.item.forEach((i,idx)=>{
			this.options.itemDis[idx] = this.options.itemDis[idx] || i//this.options.item[idx]
			this.options.itemVal[idx] = this.options.itemVal[idx] || 0
			li += `<ul data-idx="${idx}">`
			i.forEach((j,jIdx)=>{
				li += `<li data-val="${j}">${this.options.itemDis[idx][jIdx]}</li>`
			})
			li += '</ul>'
		})
		this.picker.innerHTML = str
		document.body.appendChild(this.picker)
		document.querySelector('.picker-content').innerHTML = li

		this.ul = document.querySelectorAll('.picker-content ul')
		this.bindEvent()
		this.options.itemVal.forEach((i,idx)=>{
			this.setVal(idx,i)
		})
	}
	bindEvent(){
		let cont = document.querySelector('.picker-content')
		;[].slice.call(this.ul).forEach(i=>{
			i.addEventListener('touchstart',this,false)
		})
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
				this.actvieCol = e.touches[0].target.parentNode.getAttribute('data-idx')
				this.startY = e.pageY || e.touches[0].pageY
				break
			case 'touchmove':
				if(!this.touch) return
				this.currentY = e.pageY || e.touches[0].pageY
				dis = this.currentY - this.startY
				this.startY = this.currentY
				this.ul[this.actvieCol].style.transform = this.ul[this.actvieCol].style.transform.replace(/(-?\d+)/,m => {		
					return parseInt(+m + dis)
				})
				break
			case 'touchend':
				if(!this.touch) return
				this.touch = false
				this.ul[this.actvieCol].style.transform = this.ul[this.actvieCol].style.transform.replace(/(-?\d+)/,m => {		
					let y = Math.round(m / this.lineHeight) * this.lineHeight
					y = y > this.lineHeight * 2 ? this.lineHeight * 2 : y < this.lineHeight * (3 - this.options.item[this.actvieCol].length) ? this.lineHeight * (3 - this.options.item[this.actvieCol].length) : y 
					this.selectIndex[this.actvieCol] = 2 - y / this.lineHeight
					this.selectVal[this.actvieCol] = this.options.itemDis[this.actvieCol][this.selectIndex[this.actvieCol]]
					return y
				})
				break
		}
	}
	setVal(col,idx){
		let y = (2 - idx) * this.lineHeight
		this.selectIndex[col] = idx
		this.selectVal[col] = this.options.itemDis[idx][idx]
		;[].slice.call(this.ul).forEach(i=>{
			i.style.cssText = `transform:translateY(${y}px)`
		})
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