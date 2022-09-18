let ball; 
let grass;
let player1;


class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    } 

    preload(){
        this.load.image("ball", "./assets/img/Ball/ball1.png");

        /* Enviroment */ 
        this.load.image("grass", "./assets/img/Environment/grass.png");
        this.load.image("goal_1", "./assets/img/Environment/goal_1.png");
        this.load.image("goal_2", "./assets/img/Environment/goal_2.png");
        /* --- */ 
    
        /* Sprites */ 
        this.load.image("ball", "./assets/img/Ball/ball1.png");
        this.load.spritesheet("player1-run", "./assets/img/player_1/player_1_run.png", {frameWidth: 363, frameHeight: 458});
        this.load.spritesheet("player1-jump", "./assets/img/player_1/player_1_jump.png", {frameWidth: 360, frameHeight: 431});
        this.load.spritesheet("player1-idle", "./assets/img/player_1/player_1_idle.png", {frameWidth: 232, frameHeight: 439});
        /* --- */ 
    }
 
    create(){
        /* Enviroment */ 
       grass =  this.physics.add.image(200, 570, 'grass').setScale(10, 1);
       grass.body.allowGravity = false;
       grass.setImmovable();

        this.add.image(68, 442, 'goal_2').setScale(1, .8);
        this.add.image(732, 442, 'goal_1').setScale(1, .8);
        /* --- */ 

        /* Ball */
        ball = this.physics.add.sprite(400, 300, 'ball').setBounce(1);
        ball.setCollideWorldBounds(true);
        /* --- */ 

        /* Player 1 */
        player1 = this.physics.add.sprite(168, 442, "player1").setScale(.1);
        player1.setCollideWorldBounds(true);
        player1.setBounce(0.2);
        player1.setSize(220, 450, false);
        /* --- */  


        /* Animations */
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player1-run', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player1-jump', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player1-idle', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });
        /* --- */

        // Collide
        this.physics.add.collider(ball, grass);
        this.physics.add.collider(player1, grass);
        this.physics.add.collider(player1, ball);
    }

    update(){
        /* player 1 */
        var scanner = this.input.keyboard.createCursorKeys();

        if (scanner.left.isDown){
            player1.setVelocityX(-160);
            player1.anims.play('right', true);
            player1.flipX = true;
        }else if (scanner.right.isDown){
            player1.setVelocityX(160);
            player1.anims.play('right', true);
            player1.flipX = false;
        }else {
            player1.setVelocityX(0);
            player1.anims.play('idle', true);
        }

        if (scanner.up.isDown && player1.body.touching.down){
            player1.setVelocityY(-450);
            player1.anims.play('jump', true);   
        }
        /* --- */

    }
}

// Configuracion general
const config = {
    // Phaser.AUTO, intenta usa WebGL y si el navegador no lo tiene, usa canva.
    type: Phaser.AUTO,
    parent: 'container',
    width: 800,
    height: 600,
    scene: [MainScene],
    scale: {
        // mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 500 }
        }
    }
}

// Inicializacion del objeto
game = new Phaser.Game(config)