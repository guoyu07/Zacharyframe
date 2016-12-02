/* ===========================================================
 * zachary.js 0.0.1 (Beta)
 *
 * https://github.com/alvarotrigo/pagePiling.js
 * MIT licensed
 *
 * Copyright (C) 2015 zjresume.com - A frame by Zachary
 *
 * ========================================================== */
var $$ = function() {};
$$.prototype = {
	/*��һ��������������Կ�������һ������*/
	extend:function(tar,source) {
		//��������
		for(var i in source){
			tar[i] = source[i];
		}
		return tar;
	}
}
$$ = new $$();
//����
$$.extend($$,{
	//�����
	random: function (begin, end) {
		return Math.floor(Math.random() * (end - begin)) + begin;
	},
})

/*���������ж�*/
$$.extend($$,{
	//�������ͼ��
	isNumber:function (val){
		return typeof val === 'number' && isFinite(val)
	},
	isBoolean:function (val) {
		return typeof val ==="boolean";
	},
	isString:function (val) {
		return typeof val === "string";
	},
	isUndefined:function (val) {
		return typeof val === "undefined";
	},
	isObj:function (str){
		if(str === null || typeof str === 'undefined'){
			return false;
		}
		return typeof str === 'object';
	},
	isNull:function (val){
		return  val === null;
	},
	isArray:function (arr) {
		if(arr === null || typeof arr === 'undefined'){
			return false;
		}
		return arr.constructor === Array;
	},
})

/*�ַ�������*/
$$.extend($$,{
	//ȥ����߿ո�
	ltrim:function(str){
		return str.replace(/(^\s*)/g,'');
	},
	//ȥ���ұ߿ո�
	rtrim:function(str){
		return str.replace(/(\s*$)/g,'');
	},
	//ȥ���ո�
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	//�򵥵����ݰ�formateString
	formateString:function(str, data){
		return str.replace(/@\((\w+)\)/g, function(match, key){
			return typeof data[key] === "undefined" ? '' : data[key]});
	},
})

/*ajax���*/
$$.extend($$,{
	getAjax:function(URL,fn){
		var xhr = createXHR();	//������һ�������������IE6���ݡ�
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					fn(xhr.responseText);
				}else{
					alert("������ļ���");
				}
			}
		};
		xhr.open("get",URL,true);
		xhr.send();

		//�հ���ʽ����Ϊ�������ֻ������ajax����
		function createXHR() {
			//�����������ڡ�JavaScript�߼�������� ��3�桷��21��
			if (typeof XMLHttpRequest != "undefined") {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != "undefined") {
				if (typeof arguments.callee.activeXString != "string") {
					var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
							"MSXML2.XMLHttp"
						],
						i, len;
					for (i = 0, len = versions.length; i < len; i++) {
						try {
							new ActiveXObject(versions[i]);
							arguments.callee.activeXString = versions[i];
							break;
						} catch (ex) {
						}
					}
				}
				return new ActiveXObject(arguments.callee.activeXString);
			} else {
				throw new Error("No XHR object available.");
			}
		}
	}
})

/*�¼����*/
$$.extend($$,{
	/*�¼���*/
	on: function (id, type, fn) {
		var dom = $$.isString(id)?document.getElementById(id):id;
		if(dom.addEventListener ) {
			dom.addEventListener(type, fn, false);
		}else if(dom.attachEvent){
			//���֧�� --IE
			dom.attachEvent('on' + type, fn);
		}
	},
	/*���*/
	click : function(id,fn){
		this.on(id,'click',fn);
	},
	/*�������*/
	mouseover:function(id,fn){
		this.on(id,'mouseover',fn);
	},
	/*����뿪*/
	mouseout:function(id,fn){
		this.on(id,'mouseout',fn);
	},
	/*�������*/
	hover:function (id,fnover,fnout){
		if(fnover){
			$$.on(id,"mouseover",fnover);
		}
		if(fnout){
			$$.on(id,"mouseout",fnout);
		}
	},
	//��ȡ�¼�event����
	getEvent:function (e){
		return e?e:window.event;
	},
	/*��ȡĿ��Ԫ��*/
	getTarget :function (e){
		var event = $$.getEvent(e)
		/*��·����ʽ*/
		return event.target || event.srcElement
	},
	//��ֹĬ����Ϊ
	preventDefault:function(event){
		var event = $$.getEvent(event);
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//��ֹð��
	stopPropagation:function(event){
		var event = $$.getEvent(event);
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
})

/*ѡ����*/
$$.extend($$,{
	$id:function(str){
		return document.getElementById(str)
	},
	/*tagѡ���� ��g���ֱ�ǩѡ��һ��Ԫ��*/
	$tag:function (tag,context){
		if(typeof context == 'string'){
			context = $$.$id(context);
		}

		if(context){
			return context.getElementsByTagName(tag);
		}else{
			return document.getElementsByTagName(tag);
		}
	},
	/*classѡ����������class��ȡԪ��*/
	$class:function (context,className) {
		context = document.getElementById(context);
		if(context.getElementsByClassName){
			return context.getElementsByClassName(className);
		}else{
			var arr=[];
			dom = context.getElementsByTagName('*');
			for(var i,len=dom.length;i<len;i++) {
				if(dom[i].className && dom[i].className ==className ) {
					arr.push(dom[i]);
				}
			}
		}
		return arr;
	},
	//����
	$group:function(content) {
		var result=[],doms=[];
		var arr = $$.trim(content).split(',');
		for(var i=0,len=arr.length;i<len;i++) {
			var item = $$.trim(arr[i])
			var first= item.charAt(0)
			var index = item.indexOf(first)
			if(first === '.') {
				doms=$$.$class(item.slice(index+1))
				pushArray(doms,result)

			}else if(first ==='#'){
				doms=[$$.$id(item.slice(index+1))]
				pushArray(doms,result)
			}else{
				doms = $$.$tag(item)
				pushArray(doms,result)
			}
		}
		return result;

		//��װ�ظ��Ĵ���
		function pushArray(doms,result){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	/*���*/
	$gardation:function (select){
		var sel = $$.trim(select).split(' ');
		var result=[];
		var context=[];
		for(var i = 0, len = sel.length; i < len; i++){
			result=[];
			var item = $$.trim(sel[i]);
			var first = sel[i].charAt(0)
			var index = item.indexOf(first)
			if(first ==='#'){
				//�����#���ҵ���Ԫ�أ�
				pushArray([$$.$id(item.slice(index + 1))]);
				context = result;
			}else if(first ==='.'){

				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$class(item.slice(index + 1), context[j]));
					}
				}else{
					pushArray($$.$class(item.slice(index + 1)));
				}
				context = result;
			}else{
				//����Ǳ�ǩ
				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$tag(item, context[j]));
					}
				}else{
					pushArray($$.$tag(item));
				}
				context = result;
			}
		}
		return context;
		//��װ�ظ��Ĵ���
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//���� + ���
	$select:function(str) {
		var result = [];
		var item = $$.trim(str).split(',');
		for(var i = 0, glen = item.length; i < glen; i++){
			var select = $$.trim(item[i]);
			var context = [];
			context = $$.$cengci(select);
			pushArray(context);
		};
		return result;
		//��װ�ظ��Ĵ���
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//html5ʵ�ֵ�ѡ����
	$all:function(selector,context){
		context = context || document;
		return  context.querySelectorAll(selector);
	},
})

/*css���*/
$$.extend($$,{
	//��ʾ
	show:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'block');
		}
	},

	//����
	hide:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'none');
		}
	},

	/*css*/
	css:function(context, key, value){
		var dom = $$.isString(context)?$$.$all(context) : context;
		//���������
		if(dom.length){
			//���value��Ϊ�գ����ʾ����
			if(value){
				for(var i = dom.length - 1; i >= 0; i--){
					setStyle(dom[i],key, value);
				}
				//���valueΪ�գ����ʾ��ȡ
			}else{
				return getStyle(dom[0]);
			}
			//�����������
		}else{
			if(value){
				setStyle(dom,key, value);
			}else{
				return getStyle(dom);
			}
		}
		function getStyle(dom){
			if(dom.currentStyle){
				return dom.currentStyle[key];
			}else{
				return getComputedStyle(dom,null)[key];
			}
		}
		function setStyle(dom,key,value){
			dom.style[key] = value;
		}
	},
	//Ԫ�ظ߶ȿ��ȸ���
	//���㷽ʽ��clientHeight clientWidth innerWidth innerHeight
	//Ԫ�ص�ʵ�ʸ߶�+border��Ҳ������������
	Width:function (id){
		return $$.$id(id).clientWidth
	},
	Height:function (id){
		return $$.$id(id).clientHeight
	},

	//Ԫ�صĹ����߶ȺͿ���
	//��Ԫ�س��ֹ�����ʱ������ĸ߶������֣���������ĸ߶� ʵ�ʸ߶ȣ����Ӹ߶�+���ɼ��ĸ߶ȣ�
	//���㷽ʽ scrollwidth
	scrollWidth:function (id){
		return $$.$id(id).scrollWidth
	},
	scrollHeight:function (id){
		return $$.$id(id).scrollHeight
	},

	//Ԫ�ع�����ʱ�� ������ֹ����� ��������Ͻǵ�ƫ����
	//���㷽ʽ scrollTop scrollLeft
	scrollTop:function (id){
		return $$.$id(id).scrollTop
	},
	scrollLeft:function (id){
		return $$.$id(id).scrollLeft
	},

	//��ȡ��Ļ�ĸ߶ȺͿ���
	sHeight:function (){
		return  window.screen.height
	},
	sWidth:function (){
		return  window.screen.width
	},

	//�ĵ��ӿڵĸ߶ȺͿ���
	wWidth:function (){
		return document.documentElement.clientWidth
	},
	wHeight:function (){
		return document.documentElement.clientHeight
	},
	//�ĵ��������������ĸߺͿ�
	wScrollHeight:function () {
		return document.body.scrollHeight
	},
	wScrollWidth:function () {
		return document.body.scrollWidth
	},
	//��ȡ������������䶥����ƫ��
	wScrollTop:function () {
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		return scrollTop
	},
	//��ȡ���������������ߵ�ƫ��
	wScrollLeft:function () {
		var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
		return scrollLeft
	}
})

/*����*/
$$.extend($$,{
	attr:function (context,key,value){
		var doms = $$.$all(context)
		//����ģʽ
		if(value){
			for(var i =0;i<doms.length;i++){
				doms[i].setAttribute(key,value)
			}
		}else{
			//��ȡģʽ
			return doms[0].getAttribute(key)
		}
	},
	//��̬���Ӻ��Ƴ�class
	addClass:function (context, name){
		var doms = $$.$all(context);
		//�����ȡ���Ǽ���
		if(doms.length){
			for(var i= 0,len=doms.length;i<len;i++){
				addName(doms[i]);
			}
			//�����ȡ�Ĳ��Ǽ���
		}else{
			addName(doms);
		}
		function addName(dom){
			dom.className = dom.className + ' ' + name;
		}
	},
	removeClass:function (context, name){
		var doms = $$.$all(context);
		for(var i= 0,len=doms.length;i<len;i++){
			removeName(doms[i],name);
		}
		function removeName(dom,name){
			dom.className =  dom.className.replace(name,'')
		}
	},
	hasClass: function (context,name){
		var doms = $$.$all(context)
		var flag = true;
		for(var i= 0,len=doms.length;i<len;i++){
			flag = flag && check(doms[i],name)
		}
		return flag;
		//�ж�����Ԫ��
		function check(element,name){
			return -1<(" "+element.className+" ").indexOf(" "+name+" ")
		}
	}
})

/*���ݿ��*/
$$.extend($$,{
	/*���û��߻�ȡԪ�ص�����*/
	html:function (context,value){
		var doms = $$.$all(context)
		//����ģʽ
		if(value){
			for(var i = 0;i<doms.length;i++){
				doms[i].innerHTML = value
			}
		}else{
			/*��ȡģʽ*/
			return doms[0].innerHTML
		}
	}
})

/*�������*/
$$.extend($$,{
	animate:function(obj,json,fn) {
        clearInterval(obj.timer);
        function getStyle(obj,attr){  
	        if(obj.currentStyle){
	            return obj.currentStyle[attr];  
	        }
	        else{
	            return window.getComputedStyle(obj,null)[attr];  
	        }
	    };
        obj.timer = setInterval(function() {
            var flag = true;  
            for(var attr in json){  
                var current = 0;
                if(attr == "opacity"){
                    current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                }
                else{
                    current = parseInt(getStyle(obj,attr)); 
                }
                var step = ( json[attr] - current) / 10;  
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if(attr == "opacity"){
                    if("opacity" in obj.style){
                        obj.style.opacity = (current + step) /100;
                    }
                    else{ 
                        obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                    }
                }
                else if(attr == "zIndex"){
                    obj.style.zIndex = json[attr];
                }
                else{
                    obj.style[attr] = current  + step + "px" ;
                }
                if(current != json[attr]){
                    flag =  false;
                }
            }
            if(flag)  
            {
                clearInterval(obj.timer);
                if(fn)  
                {
                    fn(); 
                }
            }
        },10)
    }
})