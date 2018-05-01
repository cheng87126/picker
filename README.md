# picker

[demo](https://cheng87126.github.io/timer-PWA/)

### 引用

http://7xsdpp.com1.z0.glb.clouddn.com/picker.css

http://7xsdpp.com1.z0.glb.clouddn.com/picker.js

	var test = new picker({
		title:'请选择',
		item:[[0,1,2,3,4,5,6,7,8],[1,3,5,7,9]],
		itemDis:[['零','一','二','三','四','五','六','七','八'],
		['一','三','五','七','九']]
	})

	test.on('cancel',function(idx){
		console.log(idx)
	})

	test.on('confirm',function(idx){
		console.log(idx)
	})

### options

options.title 标题

options.item 值

options.itemDis	用于显示的值

### 事件

cancel 点击取消的时候发生

confirm 点击确定的时候发生
