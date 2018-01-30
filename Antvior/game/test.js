$(function(){
    
    
        function download(text, name, type) {
            var a = document.createElement("a");
            var file = new Blob([text], {type: type});
            a.href = URL.createObjectURL(file);
            a.download = name;
            a.click();
        }
    
        
        //se init canvasul si furnicile
	var ch = new CanvasHandler($('#contMainCanvas').get(0));
        
	var antSim = new AntSim(ch);
	$("#contMainCanvas").click(ch.handleMouseDown);
	var lastTime;
	
        $("#addfood").click( function (){
            antSim.generateFood();
        }
        );

        $("#addant").click( function (){
            for(i=0;i<10;i++){
               antSim.generateAnt();
           }
        }
        );

        $("#save").click( function (){
            var data = antSim.saveData();
            download(data, 'state_save.json', 'text/plain');
        }
        );

        $("#saveImage").click( function (){
            ch.saveFrame();
        }
        );

        $("#load").click( function (){
            ch.resetFrame();
        }
        );
        
        
        
	this.timer = setInterval(_.bind(antSim.update, antSim), 1000 / 24);
        
        $(document).ready( function(){
            //Get the canvas &
             var c = $('#contMainCanvas');
            var ct = c.get(0).getContext('2d');
            var container = $(c).parent();

            //Run function when browser resizes
            $(window).resize( respondCanvas );

            function respondCanvas(){
                c.attr('width', $(container).width() ); //max width
                c.attr('height', $(container).height() ); //max height

                //Call a function to redraw other content (texts, images etc)
            }

            //Initial call
            respondCanvas();

        }); 
});