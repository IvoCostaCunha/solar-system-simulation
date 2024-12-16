/**
 * Class used to create listeners
 */
class Listeners {

    /**
     * Alllows to click on a planet
     * @param {list of the StellarBodies obj} planetList 
     */
    lis_planetClick(planetList){
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
    }

    /**
     * Listener to pause animation by clicking into space key
     * @param {boolean that may stop the animation} play 
     */
    lis_pause(play){
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
    }
}