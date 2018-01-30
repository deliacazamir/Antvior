var CanvasHandler;


(function(){
	
	var pad = function (num, size, fill) {
		if(_.isEmpty(fill)){fill = '0';}
		var str = num + '';
		while (str.length < size) str = fill.toString() + str;
		return str;
	}
	
	CanvasHandler = function(canvas){
		
                
		this._canvas = {};
		this._context = {};
		this._surface = {};
		this._frame = 0;
		
		if(!canvas){
			canvas = $('.canvas').get(0);
			if(!canvas){
				canvas = $('canvas').get(0);
			}
		}
		    
		this.setCanvas(canvas);
		
	}
		
	CanvasHandler.prototype = {
		
                'handleMouseDown':function(e){
                    
                    $("#addfood").trigger("click");
                    
                },
           
		'dist':function(a, b){
			return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
		},
		
		'distX':function(a, b){
			return a.x - b.x;
		},
		
		'distY':function(a, b){
			return a.y - b.y;
		},
		
		'mdist':function(a, b){
			return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
		},
	
		getRandomColorHexString:function(minR, maxR, minG, maxG, minB, maxB){
			
			return this.getColorHexString(
				Math.floor(Math.random() * (maxR - minR) + minR),
				Math.floor(Math.random() * (maxG - minG) + minG),
				Math.floor(Math.random() * (maxB - minB) + minB)
			);
			
		},
		
		getColorHexString:function(r, g, b){
			
			var c = '#';
			c += pad(r.toString(16), 2);
			c += pad(g.toString(16), 2);
			c += pad(b.toString(16), 2);
			return c;
			
		},
		
		rgbas:function(r, g, b, a){
			if(!_.isUndefined(a)){
				a = a.toString();
				if(a.length > 10){a = a.slice(0, 10);}
			} else {
				a = 1;
			}
			return 'rgba(' + Math.floor(r) + ', ' + Math.floor(g) + ', ' + Math.floor(b) + ', ' + a + ')';
		},
					
		destruct:function(){
			
			$(this._canvas).remove();
			this._canvas = null;
		
		},
		
		getCenterX:function(){
			return this.getCanvasWidth() / 2;
		},
	
		getCenterY:function(){
			return this.getCanvasHeight() / 2;
		},
	
		getCanvas:function(){
			return this._canvas;
		},
		
		setCanvas:function(val){
			this._canvas = val;
                      // this._canvas.width  = window.innerWidth;
                     // this._canvas.height = window.innerHeight;
			this._context = this._canvas.getContext('2d');
                       
		},
		
		
		getCanvasWidth:function(){
			return parseInt($(this._canvas).attr('width'));
		},
		
		getCanvasHeight:function(){
			return parseInt($(this._canvas).attr('height'));
		},
		
		setCanvasWidth:function(v){
			return parseInt($(this._canvas).attr('width', v));
		},
		
		setCanvasHeight:function(v){
			return parseInt($(this._canvas).attr('height', v));
		},
		
		clear:function(){
			this._context.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
		},
			
		setFillStyle:function(color, g, b, a){
			
			var r;
			
			if(_.isObject(color)){
				r = color.r;
				g = color.g;
				b = color.b;
				if(color.a) {a = color.a;}
			} else {
				r = color;
			}
			
			return this._context.fillStyle = this.rgbas(r, g, b, a);
		},
			
		setStrokeStyle:function(r, g, b, a){
			return this._context.strokeStyle = this.rgbas(r, g, b, a);
		},
			
		setWidth:function(w){
			return this._context.lineWidth = w;
		},
			
		toImg:function(img){
			
			var url = this._canvas.toDataURL();
			$(img).attr('src', url);
	
		},
		
		getRatio:function(){
			return $(this._canvas).attr('height') / $(this._canvas).attr('width');
		},
		
		fitCanvas:function(){
			
			var pos = DisplayUtil.getStageRect();
			
			$(this._canvas).attr({
				'width': DisplayUtil.RATIO_X,
				'height': DisplayUtil.RATIO_Y
			}).css({
				'position':'fixed',
				'width': pos.width,
				'height': pos.height,
				'top': pos.top,
				'left': pos.left
			});
	
		},
		
		saveSurface:function(){
			
			this._surface = this._context.getImageData(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
			
		},
			
		loadSurface:function(){
			
			this._context.putImageData(this._surface, 0, 0);
			
		},
			
		saveFrame:function(){
			
			var url = this._canvas.toDataURL();
			var dl = $('<a class="downloader" download="frame' + this._frame + '"><p class="anchor">a</p></a>')
			.attr('href', url)
			.appendTo('body');
			
			$('.anchor').trigger('click');
			
			$(dl).remove();
			
			this._frame++;
	
		},
		
		resetFrame:function(){
                    this._frame = 0;
                    this.destruct()
		},
		
		drawShape:function(f, stroke, fill, clip){
			
			if(stroke === undefined){
				stroke = true;
			}
			
			var ctx = this._context;
                      
                  
                         ctx.beginPath();
			f(ctx);
			
			if(stroke){
				ctx.stroke();
			}
			if(fill){
				ctx.fill();
			}
	
		},
                
                drawImage:function(dest)
                {
                    var img=document.getElementById("ant");
                    var ctx= this._canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.drawImage(img,dest.x,dest.y,10,10);
                },
                
		getLiner:function(points){
			
			return function(ctx){
				
				var y = points.pop();	
				var x = points.pop();
				
				ctx.moveTo(x, y);
						
				while(points.length > 0){
					var dy = points.pop();	
					var dx = points.pop();
					ctx.lineTo(dx, dy);
					x = dx;
					y = dy;
				}
			}
			
		},
                
                
                getContext:function(){
                   return this._canvas.getContext("2d");
                }
		
                
                
	}
	
})();