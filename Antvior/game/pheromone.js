var Pheromone;

(function(){	
	
	Pheromone = function(ch, pos, strength){
		
		this._ch = ch;
		this._current = pos;
		this._strength = strength;
	};
	
	Pheromone.prototype = {
		
		'update':function(){
			this._strength -= 0.003;
			this.draw(this._ch, this._current, this._strength);
		},
		
		'draw':function(ch, pos, amount){
			
			if(!this.isDead()){
				ch.setFillStyle(211, 209, 4, 0.03);
				ch.setStrokeStyle(211, 209, 4, 0.03);
				ch.drawShape(function(ctx){
					ctx.arc(pos.x, pos.y, amount * 50, 0, Math.PI * 2);
				}, true, true);
			}
			
		},
		
		'isDead':function(){
			return this._strength <= 0;
		},
		
		'getPosition':function(){
			return this._current;
		},
		
		'getStrength':function(){
			return this._strength;
		}
		
	}
	
})();