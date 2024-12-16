class FpsCounter {
    constructor(refreshTime){
        this.refreshTime = refreshTime;
        this.t0 = performance.now();
        this.t1 = 0;
        this.fps = 0;
    }

    // Calculate average fps in set refreshTime
    calculateFps(){
        if((this.t1-this.t0)>this.refreshTime){
            let returnFps = this.fps/(this.refreshTime/1000);
            this.fps = 0;
            this.t0 = performance.now();
            return returnFps;
        }
        else{
            return null;
        }

    }

    setT1(){
        this.t1 = performance.now();
        this.fps++;
    }
}