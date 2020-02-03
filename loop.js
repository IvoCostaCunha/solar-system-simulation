// To make sure document is loaded
document.addEventListener('DOMContentLoaded', function() {start();}, false);

function start(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let errors = new Array();
    let radiant = 0;

     // To allow to pause animation
    let play = true;
    
    document.addEventListener('keypress',function(event){
        if(event.code == "Space"){
            if(play){
                play = !play;
                console.log("Paused !")
            }
            else{
                play = !play;
                window.requestAnimationFrame(animation);
                console.log("Unpaused !");
            }
        }
    },false);

    // imprecise on edges
    document.addEventListener('click',function(event){
        let clickX = event.clientX+scrollX;
        let clickY = event.clientY+scrollY;
        //console.log(clickX+"/"+clickY);
        drawList.getList().forEach(element => {
            try{
                if((clickX < element.newPosX+element.radius && clickX > element.newPosX-element.radius)
                && (clickY < element.newPosY+element.radius && clickY > element.newPosY-element.radius)){
                    if(!(element instanceof TextZone)){
                        console.log(element.name);
                    }       
                }
            }
            catch(error){
                console.log("onClickDetection " + error);
            }
            
        });
    },false);

    // FpsCounter start
    let fps = new FpsCounter(3000);
    
    // TextZone objects instanciation
    let daysDisplay = new TextZone("days",0,30,30,ctx,"day: ");
    daysDisplay.setRound(true);
    let fpsDisplay = new TextZone("fps",0,30,60,ctx,"fps: ");


    // Initial radiand var value
    let sun = new StellarBody("sun",50,ctx,0);
    //let mercury = new StellarBody("mercury",1,ctx,8.97,0.24,sun);
    let venus = new StellarBody("venus",1,ctx,16.74,-(224.67/360),sun);

    //let earth = new StellarBody("earth",1,ctx,23.069,1,sun);
    let moon = new StellarBody("moon");
    //let mars = new StellarBody("mars",1,ctx,34.96,687/360,sun);
    let phobos = new StellarBody("phobos",);
    let deimos = new StellarBody("deimos")

    //let jupiter = new StellarBody("jupiter",1,ctx,119.6,398.88/360,sun);
    let ganymede = new StellarBody("ganymede",);
    let callispto = new StellarBody("callisto",);
    let io = new StellarBody("io",);
    let europa = new StellarBody("europa",); 

    //let saturn = new StellarBody("saturn",1,ctx,219.42,360/10754,sun);
    let titan = new StellarBody("titan",);
    let rhea = new StellarBody("rhea",);
    let japet = new StellarBody("japet",);
    let dione = new StellarBody("dione",);
    let tethis = new StellarBody("tethis",);

    //let uranus = new StellarBody("uranus",1,ctx,442.29,369.66/365,sun);
    let miranda = new StellarBody("miranda",);
    let ariel = new StellarBody("ariel",);
    let umbriel = new StellarBody("umbriel",);
    let titania = new StellarBody("titania",);
    let oberon =new StellarBody("oberon",);

    let neptune = new StellarBody("neptune",10,ctx,692.3,0.671/360,sun);
    let thalassa = new StellarBody("thalassa",);
    let hippocamp = new StellarBody("hippocamp",);
    let proteus = new StellarBody("proteus",);

    // Adding objects to draw
    let drawList = new CanvasObjects();
    drawList.addObject(sun,neptune,daysDisplay,fpsDisplay);
    for(let i=0;i<drawList.length;i++){console.log(drawList[i] + "added !");}

    // Initial objects drawing
    try{
        drawList.draw();
    }

    catch(error){"OnDrawingInitialObjects -> " + errors.push(error);}

    let animation = function(){

        // Set new t1 for FpsCounter at end of a frame animation
        fps.setT1();

        let fps2 = 0;
        // Calculate fps if refreshTime passed
        if((fps2 = fps.calculateFps()) != null){
            drawList.setValue("fps",fps2);
        }

        if(play){

            // Ending loop after reaching 2PI ???
            /**if(radiant > 2*Math.PI){
                if(errors.length > 0){
                    this.console.log(errors);
                }
                else{
                    console.log("No errors to report")
                }
                //radiant = 0;
                return 0;
            }*/
            
            // Reset Canvas
            ctx.clearRect(0,0,1500,720);

            // Allow to count days based on radiant increase speed
            drawList.setValue("days",daysDisplay.value+(1/60));

            
            // Moving Stellar objects to new position
            drawList.moveObject(radiant);
            //console.log("Planet x : " + planet.newPosX + "| y : " + planet.newPosY);
            //console.log("Moon x : " + moon.newPosX + "| y : " + moon.newPosY)
    
            // Redraw objects
            try{
                drawList.draw();
            }
            catch(error){errors.push("OnRedrawingObjects -> "+ error);}
            // Incrementing radiant var
            radiant += (2*Math.PI)/21900;

            // If animation is paused no callback
            if(!play){return 0;}
            else{
                // Callback
                window.requestAnimationFrame(animation);
            }
        }
    }
    window.requestAnimationFrame(animation);
}