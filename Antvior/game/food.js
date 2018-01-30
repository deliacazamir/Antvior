var Food;

(function(){
	
	Food = function(ch, pos, amount){
		this._ch = ch;
		this._amount = amount;
		this._current = {
			'x': pos.x,
			'y': pos.y
		};
	}
	
	Food.prototype = {
		
		'update':function(){

			this.draw(this._ch, this._current, this._amount);
			
		},
		
		'draw':function(ch, pos, amount){
			
			if(!this.isDead()){
				ch.setFillStyle(100, 255, 100, 0.6);
				ch.setStrokeStyle(0, 255, 0, 1);
				ch.drawShape(function(ctx){
					ctx.arc(pos.x, pos.y, amount / 10, 0, Math.PI * 2);
				}, true, true);
			}
			
		},
		
		'isDead':function(){
			return this._amount <= 0;
		},
		
		'getPosition':function(){
			return this._current;	
		},
		
		'getAmount':function(){
			return this._amount;	
		},
		
		'eat':function(){
			this._amount -=0.02;
		}
		
	}

})();