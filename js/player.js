class Player{

    constructor(x,y){

        this.x = x
        this.y = y
        this.width = 16
        this.height = 16
        this.speed = 3

    }

    draw(ctx){

        ctx.fillStyle = "red"
        ctx.fillRect(this.x,this.y,this.width,this.height)

    }

    move(keys, collisions){

        let newX = this.x
        let newY = this.y

        if(keys["w"] || keys["ArrowUp"]) newY -= this.speed
        if(keys["s"] || keys["ArrowDown"]) newY += this.speed
        if(keys["a"] || keys["ArrowLeft"]) newX -= this.speed
        if(keys["d"] || keys["ArrowRight"]) newX += this.speed

        const future = {
            x:newX,
            y:newY,
            width:this.width,
            height:this.height
        }

        for(let wall of collisions){

            if(isColliding(future, wall)){
                return
            }

        }

        this.x = newX
        this.y = newY

    }

}
