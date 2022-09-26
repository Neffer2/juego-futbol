let ball; 
let grass;
let textureLeft1;
let textureLeft2;
let textureRight1;
let textureRight2;
let player1;
let player2;
let score;


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
        this.load.image("background", "./assets/img/Environment/backgroundjpg.jpg");
        /* --- */
    
        /* Sprites */ 
        this.load.image("ball", "./assets/img/Ball/ball1.png");
        this.load.spritesheet("player1-run", "./assets/img/player_1/player_1_run.png", {frameWidth: 363, frameHeight: 458});
        this.load.spritesheet("player1-jump", "./assets/img/player_1/player_1_jump.png", {frameWidth: 360, frameHeight: 431});
        this.load.spritesheet("player1-idle", "./assets/img/player_1/player_1_idle.png", {frameWidth: 232, frameHeight: 439});

        this.load.spritesheet("player2-run", "./assets/img/player_2/player_2_run.png", {frameWidth: 285, frameHeight: 465});
        this.load.spritesheet("player2-jump", "./assets/img/player_2/player_2_jump.png", {frameWidth: 285, frameHeight: 465});
        this.load.spritesheet("player2-idle", "./assets/img/player_2/player_2_idle.png", {frameWidth: 285, frameHeight: 465});

        /* --- */ 
    }
 
    create(){

        /* texture */ 
            let rect = this.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, 250, 10);
            rect.generateTexture('horizontal-line', 250, 10);
            rect.destroy();

            let rect2 = this.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, 10, 250);
            rect2.generateTexture('vertical-line', 10, 250);
            rect2.destroy();
        /* --- */

        /* Enviroment */ 
        this.add.image(400, 400, 'background').setScale(1.1, 1);

        grass =  this.physics.add.image(200, 570, 'grass').setScale(10, 1);
        grass.body.allowGravity = false;
        grass.setImmovable();
        this.add.image(68, 442, 'goal_2').setScale(1, .8);
        this.add.image(732, 442, 'goal_1').setScale(1, .8);

        textureLeft1 = this.physics.add.image(72, 350, 'horizontal-line').setScale(.5, 1);
        textureLeft1.setImmovable(true);
        textureLeft1.body.allowGravity = false;
        textureLeft1.setVisible(false);

        textureRight1 = this.physics.add.image(730, 350, 'horizontal-line').setScale(.5, 1);
        textureRight1.setImmovable(true);
        textureRight1.body.allowGravity = false;         
        textureRight1.setVisible(false);

        textureLeft2 = this.physics.add.image(120, 450, 'vertical-line').setScale(1, .7);
        textureLeft2.setImmovable(true);
        textureLeft2.body.allowGravity = false;
        textureLeft2.setData('side', 'left');
        textureLeft2.setData('score', 0);
        textureLeft2.setVisible(false);

        textureRight2 = this.physics.add.image(680, 450, 'vertical-line').setScale(1, .7);
        textureRight2.setImmovable(true);
        textureRight2.body.allowGravity = false; 
        textureRight2.setData('side', 'right');
        textureRight2.setData('score', 0);
        textureRight2.setVisible(false);


        /* Marcador */
            score = this.add.text(350, 50, "0 - 0", {fontSize: "32px", fill: '#fff'});
        /* */

        /* --- */

        /* Ball */
        ball = this.physics.add.sprite(400, 250, 'ball').setScale(.8).setBounce(1);
        ball.setCollideWorldBounds(true);
        /* --- */ 

        /* Player 1 */
        player1 = this.physics.add.sprite(168, 442, "player1").setScale(.25);
        player1.setCollideWorldBounds(true);
        player1.setBounce(0.2);
        player1.setSize(220, 450, false);
        /* --- */  

        /* Player 2 */
        player2 = this.physics.add.sprite(632, 442, "player2").setScale(.25);
        player2.setCollideWorldBounds(true);
        player2.setBounce(0.2);
        player2.setSize(220, 450, false);
        /* --- */  


        /* Animations player 1*/
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


        /* Animations player 2*/
        this.anims.create({
            key: 'right_player2',
            frames: this.anims.generateFrameNumbers('player2-run', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump_player2',
            frames: this.anims.generateFrameNumbers('player2-jump', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_player2',
            frames: this.anims.generateFrameNumbers('player2-idle', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1 
        });
        /* --- */

        // Collide
        this.physics.add.collider(ball, grass);
        this.physics.add.collider(player1, grass);
        this.physics.add.collider(player1, ball);
        this.physics.add.collider(player2, grass);
        this.physics.add.collider(player2, ball);
        this.physics.add.collider(player1, player2);
        this.physics.add.collider(ball, textureLeft1);
        this.physics.add.collider(ball, textureRight1);
        this.physics.add.overlap(ball, textureLeft2, goal, null, this);
        this.physics.add.overlap(ball, textureRight2, goal, null, this);

        function goal (ball, texture){
            this.physics.pause();
            texture.setData('score', texture.getData('score') + 1);

            var timer = this.time.addEvent({
                delay: 1000,                // ms
                callback: () => {
                    this.physics.resume();
                    ball.setPosition(400, 300);
                    player1.setPosition(168, 442);
                    player2.setPosition(632, 442);
                    score.setText(textureLeft2.getData('score')+" - "+textureRight2.getData('score'));
                },
                loop: false
            });

        }
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

        /* player 2 */
        let KeyLeft = this.input.keyboard.addKey('A');
        let KeyRight = this.input.keyboard.addKey('D');
        let KeyUp = this.input.keyboard.addKey('W');

        if (KeyLeft.isDown){
            player2.setVelocityX(-160);
            player2.anims.play('right_player2', true);
            player2.flipX = true;
        }else if (KeyRight.isDown){
            player2.setVelocityX(160);
            player2.anims.play('right_player2', true);
            player2.flipX = false;
        }else {
            player2.setVelocityX(0);
            player2.anims.play('idle_player2', true);
        }

        if (KeyUp.isDown && player2.body.touching.down){
            player2.setVelocityY(-450);
            player2.anims.play('jump_player2', true);   
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
            debug: false,
            gravity: { y: 500 }
        }
    }
}

// Inicializacion del objeto
game = new Phaser.Game(config)