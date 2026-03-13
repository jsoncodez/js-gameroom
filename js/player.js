class Player{

    constructor(x,y){

        this.x = x
        this.y = y
        this.width = 48
        this.height = 48
        this.speed = 3
        
        this.direction = 0
        this.frame = 0
        this.frameTimer = 0

        this.sprite = new Image()
        this.sprite.src = "assets/char.png"

        this.spriteSize = 48

    }

    draw(ctx){

        const sx = this.frame * this.spriteSize
        const sy = this.direction * this.spriteSize

        ctx.drawImage(
        this.sprite,
        sx,
        sy,
        this.spriteSize,
        this.spriteSize,
        this.x,
        this.y,
        this.width,
        this.height
        )

    }

    move(keys, collisions){

        let newX = this.x
        let newY = this.y
        let moving = false
        

        if(keys["s"] || keys["ArrowDown"]){

            newY += this.speed
            this.direction = 0
            moving = true

        }

        if(keys["a"] || keys["ArrowLeft"]){

            newX -= this.speed
            this.direction = 1
            moving = true

        }

        if(keys["d"] || keys["ArrowRight"]){

            newX += this.speed
            this.direction = 2
            moving = true

        }

        if(keys["w"] || keys["ArrowUp"]){

            newY -= this.speed
            this.direction = 3
            moving = true

        }


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


        /* animation */

        if(moving){

            this.frameTimer++

            if(this.frameTimer > 10){

                this.frame = (this.frame + 1) % 4
                this.frameTimer = 0

            }
        
        }else{

            this.frame = 1

        }

        }

    }
