var AntSim;

(function(){	
	
	var NEST_SIZE = 20;
	var MAX_FOOD = 50;
	var DIST_FOOOD = 10;
	
	AntSim = function(ch){
		
		this._ch = ch;
		
		this._width = ch.getCanvasWidth();
		this._height = ch.getCanvasHeight();
		
		this._unitList = {
			pheromones:[],
			foods:[],
			ants:[]
		};
		
		this._nestPos = {
			'x': this._height /2+400,
			'y': this._width/2+300,
		}
		
	};
        
        
	
	AntSim.prototype = {
		
		'getRandomPos':function(){
                           
                        min = this._height/2;
                        max = this._height-50;
			return {
                                 
				'x': Math.random() * this._width,
				'y': Math.floor(Math.random()*(max-min+1)+min)
			}
		},
		
                'getFoodPos':function(){
                        
			var pos = {
				'x':  window.event.clientX,
				'y':  window.event.clientY
			};
			
			return pos;
			
		},
		
		'generateAnt':function(){
			
			var ant = new Ant(this._ch, this._nestPos);
			this._unitList.ants.push(ant);
				
		},
		
		'generateFood':function(){
			
			var food = new Food(this._ch, this.getFoodPos(), Math.floor(Math.random() * 50) + 25);
			this._unitList.foods.push(food);
				
		},
		
		'generatePheromone':function(pos, strength){
			
			var position = {
				'x':pos.x,
				'y':pos.y
			}
			var pheromone = new Pheromone(this._ch, position, strength);
			this._unitList.pheromones.push(pheromone);
				
		},
		
		'drawNest':function(){
		
			this._ch.setStrokeStyle(116, 79, 36, 0.9);
			this._ch.setFillStyle(116, 79, 36, 0.9);
			this._ch.drawShape(_.bind(function(ctx){
				ctx.arc(this._height /2+400,this._width/2+300, NEST_SIZE, 0, Math.PI * 2);
			}, this), true, true);
                  
                        
                      /*  this._ch.drawImage(_.bind(function(){
                                                    var ctx=this._ch.getContext();
                                                    ctx.beginPath();
                                                    var img=document.getElementById("desert");
                                                    ctx.drawImage(img,this._width/2, this._height/2 );
                                                    },this));
                    */
		},
                
                'saveData':function()
                {
                    
                    var jsonData = JSON.stringify( this._unitList);
                    return jsonData; 
                    
                },
		
		'update':function(delta){
			
			this._ch.clear();
			
			if(Math.random() > 0.98) {
                            for(i=0;i<5;i++)	
                            {
                                this.generateAnt();	
                            }
                        }
			
                         /* if(Math.random() > 0.95 && this._unitList.foods.length < MAX_FOOD) {
				this.generateFood();	
			}
                         */
			
			var that = this;
						
			_.each(this._unitList, function(units, key, list){
				
				_.each(units, function(unit){
					unit.update();
				});
				
				list[key] =  _.reject(units, function(unit){
					return unit.isDead();
				});
								
			});
			
			_.each(this._unitList.ants, function(ant, key, list){
				
				if(!ant.isRunout()){
					
					_.each(that._unitList.foods, function(food){
						ant.temptate(food.getPosition(), 2.5, food.getAmount() * 0.03 + 16);
						if(that._ch.dist(ant.getPosition(), food.getPosition()) < DIST_FOOOD){
							food.eat();
							ant.setPheromoneStrength(1.1);
							ant.putFood(1);
						}
					});
					
					_.each(that._unitList.pheromones, function(pheromone){
						ant.temptate(pheromone.getPosition(), pheromone.getStrength(), pheromone.getStrength() * 20 + 10);
					});
					
				} else {
					
					if(Math.random() > 0.85 &&
						ant.getPheromoneStrength() > 0
					){
						that.generatePheromone(ant.getPosition(), ant.getPheromoneStrength());
					}
					
				}
				
			});
			
			this.drawNest();
			
		}
		
	}
	
})();