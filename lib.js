class StellarBody {
    constructor(name,radius,ctx,orbitDistance,orbitalspeedMult = 1,basedOnStellarBody = null){
        this.name = name;
        this.radius = radius;
        this.orbitDistance = orbitDistance;
        this.orbitalSpeedMult = orbitalspeedMult;
        this.ctx = ctx;

        if(name == "sun"){
            this.basePosX = 750;
            this.basePosY = 360;
            this.newPosX = 750;
            this.newPosY = 360;
        }
        else if(basedOnStellarBody != null){
            this.basedOnStellarBody = basedOnStellarBody;
            this.basePosX = basedOnStellarBody.basePosX+orbitDistance;
            this.basePosY = basedOnStellarBody.basePosY+orbitDistance;
            this.newPosX = basedOnStellarBody.basePosX+orbitDistance;
            this.newPosY = basedOnStellarBody.basePosY+orbitDistance;
        }
        
        this.textObjectName = new TextZone(this.name+"Text",this.name,this.newPosX,this.newPosY-this.r,this.ctx,"");
        this.textObjectName.setFont("12px Arial");

        // basePosX & basePosY are original position of StellarBody
        // newPosX & newPosY are future position of StellarBody
        // But to draw the object futute position is needed aswell
        // basedOnStellarBody is the object on which this one actes as a sattelite if it's a sattelite
        // orbitDistance is the radius at which the StellarBody will orbit the parent assuming one
    }

    setOrbitalSpeedMult(nb){this.orbitalSpeedMult = nb;}

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.newPosX,this.newPosY,this.radius,0,2*Math.PI);
        this.ctx.stroke();
        this.textObjectName.setPosX(this.newPosX-11);
        this.textObjectName.setPosY(this.newPosY-this.radius-5);
        this.textObjectName.draw();
    }
    move(radiant){
        if(this.name != "sun"){
            this.newPosX = this.basedOnStellarBody.newPosX+this.orbitDistance*Math.cos(radiant*this.orbitalSpeedMult);
            this.newPosY = this.basedOnStellarBody.newPosY+this.orbitDistance*Math.sin(radiant*this.orbitalSpeedMult);
        }
    }
}

class TextZone{ 
    constructor(name,value,posX,posY,ctx,prefix = ""){
        this.prefix = prefix;
        this.name = name;
        this.value = value;
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.font = "15px Arial";
        this.round = false;
    }

    draw(){
        this.ctx.font = this.font;
        try{
            if(this.round){
                this.ctx.strokeText(this.prefix+Math.floor(this.value),this.posX,this.posY); 
            }
            else{
                this.ctx.strokeText(this.prefix+this.value,this.posX,this.posY); 
            }   
        }
        catch(error){
            console.log("OnDrawingTextZone -> " + error);
        }
    }

    setRound(bool){this.round = bool;}
    setFont(font){this.font = font;}
    setValue(value){this.value = value;}
    setPosX(newPosX){this.posX = newPosX;}
    setPosY(newPosY){this.posY = newPosY;}
}

class CanvasObjects {
    constructor (){this.objectsList = new Array();}

    draw(){
        for(let i = 0; i < this.objectsList.length; i++){
            this.objectsList[i].draw();
        }
    }

    addObject(...args){
        args.forEach(element => {
            this.objectsList.push(element)
        });
    }

    moveObject(radiant){
        this.objectsList.forEach(element => {
            try{
                if(!(element instanceof TextZone)){
                    element.move(radiant);
                }
            }
            catch(error){
                console.log(element.name+" - "+error);
            }
        });
    }

    setValue(name,value){
        this.objectsList.forEach(element => {
            try{
                if(element.name === name){
                    element.setValue(value);
                }
            }
            catch(error){
                console.log(element.name+" - "+ error);
            }
        });
    }

    getList(){
        return this.objectsList;
    }
}