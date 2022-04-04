//v1.7.1

//variables para imágenes, sprites y grupos
var bg, bgHome, castle, castleImg, castle2Img, castle3Img, castleGroup;
var will, willWlk, willAtk, willGroup, power, powerImg, powerGroup;
var power2, power2Img, power2Group;
var skeleton, skeletonAtk, skeletonGroup;

var wall, wall2, wall3;
var health100Img, health83Img, health66Img, health50Img, health33Img, health16Img;
var start, startImg;
var dragon, dragonImg, dragonGroup;
var life;

var necro, necroImg, necroGroup;
var necFb, necFbImg, necFbGroup;
var armor, armorImg, armorGroup;
var staff, staffImg, staffGroup;
var coins, coinsImg, coinsGroup;


//temprizadores para poderes y vidas 
var timer3 = 3;
var timer4 = 0;
var timer5 = 5;
var lifeTimer = 100;


//artefactos
var armorArtifact = false;
var staffArtifact = false;


//contadores y estado de juego
var gameState = "home";
var game = "notInter";
var lives = 100;
var wave = 1;
var skeletonCount = 5;

var iniciowave = 1;
var necroLives = 100;
var language = "";
var xp = 0;
var pl = 1;

var xpCount = 10;
var SETplayerHP = 100;
var playerHP = SETplayerHP;
var SETmana = 100;
var mana = SETmana;

var speed = 1;
var atkSpeed = 1;
var manaRegen = 0.5;
var statPoints = 0;

var playerHPRegen = 0.5;
var coinsCount = 0;

//precarga de imágenes y animaciones
function preload() {
    //fondo
    bg = loadImage("images/bg.png");
    bgHome = loadImage("images/bgHome.jpg");

    //castillo
    castleImg = loadImage("images/castle1.png");
    castle2Img = loadImage("images/castle2.png");
    castle3Img = loadImage("images/castle3.png");

    //Will y sus poderes
    willWlk = loadAnimation("images/willsonWlk.png", "images/willsonWlk2.png", "images/willsonWlk3.png", 
    "images/willsonWlk4.png", "images/willsonWlk5.png");
    
    willAtk = loadAnimation("images/willsonAtk.png", "images/willsonAtk2.png", "images/willsonAtk3.png", 
    "images/willsonAtk4.png", "images/willsonAtk5.png");

    powerImg = loadImage("images/power.png");

    power2Img = loadAnimation("images/p1.png", "images/p2.png", "images/p3.png", "images/p4.png", "images/p5.png", 
    "images/p6.png", "images/p7.png", "images/p8.png", "images/p9.png", "images/p10.png", "images/p11.png", 
    "images/p12.png", "images/p13.png");


    //enemigos
    skeletonAtk = loadAnimation("images/skeleton1.png", "images/skeleton2.png", "images/skeleton3.png",
    "images/skeleton4.png", "images/skeleton5.png", "images/skeleton6.png", "images/skeleton7.png", 
    "images/skeleton8.png", "images/skeleton9.png", "images/skeleton10.png", "images/skeleton11.png", 
    "images/skeleton12.png", "images/skeleton13.png");

    dragonImg = loadAnimation("images/dragon1.png", "images/dragon2.png", "images/dragon3.png", 
    "images/dragon4.png", "images/dragon5.png", "images/dragon6.png", "images/dragon7.png");

    necroImg = loadAnimation("images/nec1.png", "images/nec2.png", "images/nec3.png", "images/nec4.png",
    "images/nec5.png", "images/nec6.png", "images/nec7.png", "images/nec8.png");

    necFbImg = loadAnimation("images/fireball1.png", "images/fireball2.png", "images/fireball3.png",
    "images/fireball4.png", "images/fireball5.png");

    //vida y botones
    health100Img = loadImage("images/life100.png");
    health83Img = loadImage("images/life83.png");
    health66Img = loadImage("images/life66.png");
    health50Img = loadImage("images/life50.png");
    health33Img = loadImage("images/life33.png");
    health16Img = loadImage("images/life16.png");

    //artifacts
    armorImg = loadImage("images/armor2.png");
    staffImg = loadAnimation("images/staff1.png", "images/staff2.png", "images/staff3.png", "images/staff4.png",
    "images/staff5.png", "images/staff6.png", "images/staff7.png", "images/staff8.png", "images/staff9.png", 
    "images/staff10.png");

    //coins
    coinsImg = loadAnimation("images/coin1.png", "images/coin2.png", "images/coin3.png", "images/coin4.png", 
    "images/coin5.png", "images/coin6.png");
}

//disposición
function setup() {
    willGroup = new Group();
    castleGroup = new Group();

    //sprite castillo
    castle = createSprite(200, 350);
    castle.setCollider("circle", 0, 0, 700);
    castle.visible = false;
    castleGroup.add(castle);

    //sprite Will
    will = createSprite(600, 525);
    will.addAnimation("willCaminando", willWlk);
    will.addAnimation("willAtacando", willAtk);
    will.visible = false;
    willGroup.add(will);

    //paredes invisibles
    wall = createSprite(displayWidth / 2, 355, displayWidth, 1);
    wall.visible = false;
    wall2 = createSprite(displayWidth / 2, displayHeight -40, displayWidth, 20);
    wall2.visible = false;

    //barra de vida
    life = createSprite(displayWidth / 2 -200, displayHeight / 2 -300);
    life.visible = false;

    //grupos
    powerGroup = new Group();
    power2Group = new Group();
    skeletonGroup = new Group();
    dragonGroup = new Group();
    necroGroup = new Group();

    necFbGroup = new Group();
    armorGroup = new Group();
    staffGroup = new Group();
    coinsGroup = new Group();
}

function draw() {
    //creación del lienzo
    createCanvas(displayWidth, displayHeight);

    if(gameState == "home") {
        background(bgHome);

        textSize(40);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("En breve empezaremos, pero primero...", displayWidth / 2 -350, displayHeight / 2 -300);
        text("¿prefieres el idioma en inglés o en español?", displayWidth / 2 -400, displayHeight / 2 -250);

        textSize(30);
        text("To choose English press the letter E", displayWidth / 2 -250, displayHeight / 2 -100);
        text("Para elegir español presiona la letra S", displayWidth / 2 -260, displayHeight / 2 +100);

        textSize(40);
        text("We'll begin shortly, but first...", displayWidth / 2 -250, displayHeight / 2 +250);
        text("do you prefer the language to be in English or Spanish?", displayWidth / 2 -500, displayHeight / 2 +300);

        if(keyWentDown("S")) {
            gameState = "SPstart";
        }

        if(keyWentDown("E")) {
            gameState = "ENstart";
        }

        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }


    //estado de juego "inicio"
    //ESPAÑOL =========================================================================================================
    if(gameState == "SPstart") {
        //fondo
        background(bgHome);

        //mensaje de bienvenida
        textSize(40);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("¡Bienvenido al mundo de Ataque a los Esqueletos!", displayWidth / 2 -450, displayHeight / 2);

        textSize(30);
        text("¡Presiona la tecla 'ENTER' para empezar!", displayWidth / 2 -290, displayHeight / 2 +100);

        textSize(20);
        text("Para regresar a la pantalla de inicio presiona la letra B", displayWidth / 2 -250, displayHeight / 2 +250);
        text("P.D.: Si quieres saber más sobre el funcionamiento del juego, ¡presiona la letra 'T'!", 
        displayWidth / 2 -370, displayHeight / 2 +300);
        text("Para ir al panel de atributos presiona la letra 'J'", displayWidth / 2 -215, displayHeight / 2 +350);

        if(keyWentDown("ENTER")) {
            gameState = "fight";
            language = "SP";
        }

        if(keyWentDown("T")) {
            gameState = "SPtutorial";
        }

        if(keyWentDown("B")) {
            gameState = "home";
        }

        if(keyWentDown("J")) {
            gameState = "SPstatPanel";
        }

        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    if(gameState == "SPtutorial") {
        background(bgHome);

        textSize(50);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("TUTORIAL", displayWidth / 2 -125, displayHeight / 2 -300);

        textSize(20);
        text("➼ El funcionamiento es simple: tendrás que eliminar a todos los enemigos antes de que puedan trespasar el castillo.", 
        displayWidth / 2 -650, displayHeight / 2 -240);
        text("Si logran llegar a él, empezará a recibir daño, pero ten cuidado, ya que Will también recibe daño. ¡Cuando llegue al 0% el juego habrá acabado!", 
        displayWidth / 2 -624, displayHeight / 2 -210);

        text("➼ Para contrarrestar a los enemigos, puedes usar 2 poderes pertenecientes a Will. El primero se activa con la barra espacidora.",
        displayWidth / 2 -650, displayHeight / 2 -160);
        text("El segundo (Shockwave) se activa presionando la tecla de la letra O. Sin embargo, este poder cuenta con un temporizador.",
        displayWidth / 2 -624, displayHeight / 2 -130);

        text("➼ Para mover a Will (tu personaje), usa las flechas de arriba y abajo.", displayWidth / 2 -650, 
        displayHeight / 2 -80);

        text("➼ En la esquina superior derecha podrás ver la cantidad de enemigos restantes para pasar a la siguiente Oleada (nivel).",
        displayWidth / 2 -650, displayHeight / 2 -30);

        text("➼ Will puede subir de nivel, y con cada uno recibe una cierta cantidad de puntos de atributos.",
        displayWidth / 2 -650, displayHeight / 2 +20);
        text("Puedes incrementar los atributos de Will en el panel de atributos usando los puntos de atributos.",
        displayWidth / 2 -624, displayHeight / 2 +50);

        text("➼ A partir de la sexta Oleada las cosas se pondrán mas difíciles, los enemigos aumentarán de vlocidad y aparecerán con más frecuencia.",
        displayWidth / 2 -650, displayHeight / 2 +100);
        text("Al llegar a la décima Oleada, tendrás que sobrevivir la mayor cantidad de tiempo y derrotar a los enemigos.",
        displayWidth / 2 -624, displayHeight / 2 +130);
        text("Una vez superada, habrás conseguido llegar a la batalla con el jefe final.", displayWidth / 2 -624, 
        displayHeight / 2 +160);

        textSize(35);
        text(". . . . . ╰──╮ Pero lo más importante... ¡Diviértete! ╭──╯ . . . . .", displayWidth / 2 -500, 
        displayHeight / 2 +300);

        textSize(20);
        text("¡Presiona la tecla 'ENTER' para comenzar a jugar!", displayWidth / 2 -225, displayHeight / 2 +350);

        if(keyWentDown("ENTER")) {
            gameState = "fight";
            language = "SP";
        }
        
        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    if(gameState == "SPstatPanel") {
        background(bgHome);


        fill("black");
        stroke("white");
        strokeWeight(2.5);

        textSize(50);
        text("¡Bienvenido al panel de atributos!", displayWidth / 2 -350, displayHeight / 2 -300);
        
        textSize(40);
        text("HP: " + SETplayerHP, displayWidth / 2 -600, displayHeight / 2 -150);
        text("Maná: " + SETmana, displayWidth / 2 -600, displayHeight / 2 -50);
        text("Regeneración de Maná: " + manaRegen + "/s", displayWidth / 2 -600, displayHeight / 2 +50);

        text("Regeneración de HP: " + playerHPRegen + "/s", displayWidth / 2 +150, displayHeight / 2 -150);
        text("Velocidad: " + speed, displayWidth / 2 +150, displayHeight / 2 -50);
        text("Velocidad de Ataque: " + atkSpeed, displayWidth / 2 +150, displayHeight / 2 +50);

        textSize(25);
        text("Para aumentar tu HP, presiona 'H', Regen de HP: P, Maná: M, Regen de Maná: R, Velocidad: V, Velocidad de Ataque: A", 
        displayWidth / 2 -665, displayHeight / 2 +200);
        text("Para regresar a la página anterior presiona la letra 'B'", displayWidth / 2 -275, displayHeight / 2 +250);

        textSize(20);
        text("Monedas: " + coinsCount, displayWidth / 2 +300, displayHeight / 2 +300);
        text("Puntos de atributos disponibles: " + statPoints, displayWidth / 2 +300, displayHeight / 2 +350);
        if(armorArtifact == true && staffArtifact != true) {
            text("Artefactos: Armadura(+15 HP)", displayWidth / 2 -300, displayHeight / 2 +350);
        }
        if(staffArtifact == true && armorArtifact != true) {
            text("Artefactos: Bastón(+15 Mana)", displayWidth / 2 -250, displayHeight / 2 +350);
        }
        if(staffArtifact == true && armorArtifact == true) {
            text("Artefactos: Armadura(+15 HP), Bastón(+15 Mana)", displayWidth / 2 -200, displayHeight / 2 +350);
        }
        


        if(keyWentDown("H") && statPoints >= 1 && armorArtifact != true) {
            statPoints = statPoints -1;
            SETplayerHP = SETplayerHP +10;
        }
        else if(keyWentDown("H") && statPoints >= 1 && armorArtifact == true) {
            statPoints = statPoints -1;
            SETplayerHP = SETplayerHP +15;
        }

        if(keyWentDown("M") && statPoints >= 1 && staffArtifact != true) {
            statPoints = statPoints -1;
            SETmana = SETmana +10;
        }
        else if(keyWentDown("M") && statPoints >= 1 && staffArtifact == true) {
            statPoints = statPoints -1;
            SETmana = SETmana +15;
        }

        if(keyWentDown("P") && statPoints >= 1 && playerHPRegen <= 14.5) {
            statPoints = statPoints -1;
            playerHPRegen = playerHPRegen +0.5;
        }

        if(keyWentDown("R") && statPoints >= 1 && manaRegen <= 14.5) {
            statPoints = statPoints -1;
            manaRegen = manaRegen +0.5;
        }

        if(keyWentDown("V") && statPoints >= 1 && speed <= 14) {
            statPoints = statPoints -1;
            speed = speed +1;
        }

        if(keyWentDown("A") && statPoints >= 1 && atkSpeed <= 14) {
            statPoints = statPoints -1;
            atkSpeed = atkSpeed +1;
        }

        if(keyWentDown("B")) {
            gameState = "SPstart";
        }


    }

    //ENGLISH =============================================================================================================
    if(gameState == "ENstart") {
        //fondo
        background(bgHome);

        //start.visible = true;

        //mensaje de bienvenida
        textSize(40);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("Welcome to the world of Attack on Skeleton!", displayWidth / 2 -400, displayHeight / 2);

        textSize(30);
        text("Press the ENTER key to start playing!", displayWidth / 2 -270, displayHeight / 2 +100);

        textSize(20);
        text("To go back to the home screen press letter B", displayWidth / 2 -210, displayHeight / 2 +250);
        text("P.D.: If you want to know more about the game press letter 'T'!", 
        displayWidth / 2 -290, displayHeight / 2 +300);
        text("To go to your stat panel press letter 'N'", displayWidth / 2 -180, displayHeight / 2 +350);

        if(keyWentDown("ENTER")) {
            gameState = "fight";
            language = "EN";
        }

        if(keyWentDown("T")) {
            gameState = "ENtutorial";
        }

        if(keyWentDown("B")) {
            gameState = "home";
        }

        if(keyWentDown("N")) {
            gameState = "ENstatPanel";
        }

        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    if(gameState == "ENtutorial") {
        background(bgHome);

        textSize(50);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("TUTORIAL", displayWidth / 2 -125, displayHeight / 2 -300);

        textSize(20);
        text("➼ The functioning is simple: you'll have to destroy all enemies before they get to the castle.", 
        displayWidth / 2 -650, displayHeight / 2 -240);
        text("If they make it, it'll start receiving damage, but be careful since Will can also receive damage. If it gets to 0% the game will have finished!", 
        displayWidth / 2 -624, displayHeight / 2 -210);

        text("➼ To fight back the enemies, you can use 2 of Will's powers. The first one is triggered by the space key.",
        displayWidth / 2 -650, displayHeight / 2 -160);
        text("The second one (Shockwave) is triggered by pressing letter O. This power has a cooldown though.",
        displayWidth / 2 -624, displayHeight / 2 -130);

        text("➼ To move Will (your character), use the up and down arrow keys.", displayWidth / 2 -650, 
        displayHeight / 2 -80);

        text("➼ In the top right corner you'll be able to see the remaining enemies to get to the next wave.",
        displayWidth / 2 -650, displayHeight / 2 -30);

        text("➼ Will can level up, and with each level up you gain a fixed amount of stat points.",
        displayWidth / 2 -650, displayHeight / 2 +20);
        text("You can use stat points to increase his stats in the stat panel.",
        displayWidth / 2 -624, displayHeight / 2 +50);

        text("➼ From the sixth wave on things will get complicated, enemies will appear more frequently and they will speed up.",
        displayWidth / 2 -650, displayHeight / 2 +100);
        text("When getting to the 10th wave, you'll have to survive for the most time you can and beat the enemies.",
        displayWidth / 2 -624, displayHeight / 2 +130);
        text("Once finished, the final stage with the boss will start.", displayWidth / 2 -624, 
        displayHeight / 2 +160);

        textSize(35);
        text(". . . . . ╰──╮ But more importantly... Have fun! ╭──╯ . . . . .", displayWidth / 2 -500, 
        displayHeight / 2 +300);

        textSize(20);
        text("¡Press the ENTER key to start playing!", displayWidth / 2 -225, displayHeight / 2 +350);

        if(keyWentDown("ENTER")) {
            gameState = "fight";
            language = "EN";
        }
        
        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    if(gameState == "ENstatPanel") {
        background(bgHome);


        fill("black");
        stroke("white");
        strokeWeight(2.5);

        textSize(50);
        text("Welcome to the Stat Panel!", displayWidth / 2 -275, displayHeight / 2 -300);
        
        textSize(40);
        text("HP: " + SETplayerHP, displayWidth / 2 -600, displayHeight / 2 -150);
        text("Mana: " + SETmana, displayWidth / 2 -600, displayHeight / 2 -50);
        text("Mana Regeneration: " + manaRegen + "/s", displayWidth / 2 -600, displayHeight / 2 +50);

        text("HP Regeneration: " + playerHPRegen + "/s", displayWidth / 2 +200, displayHeight / 2 -150);
        text("Speed: " + speed, displayWidth / 2 +200, displayHeight / 2 -50);
        text("Attack Speed: " + atkSpeed, displayWidth / 2 +200, displayHeight / 2 +50);

        textSize(30);
        text("To increase HP, press 'H', HP Regen: P, Mana: M, Mana Regen: R, Speed: S, Attack Speed: A", 
        displayWidth / 2 -625, displayHeight / 2 +200);
        text("To go back to the previous page press letter 'B'", displayWidth / 2 -350, displayHeight / 2 +250);

        textSize(20);
        text("Coins: " + coinsCount, displayWidth / 2 +450, displayHeight / 2 +300);
        text("Available Stat Points: " + statPoints, displayWidth / 2 +450, displayHeight / 2 +350);
        if(armorArtifact == true && staffArtifact != true) {
            text("Artifacts: Armor(+15 HP)", displayWidth / 2 -450, displayHeight / 2 +350);
        }
        if(staffArtifact == true && armorArtifact != true) {
            text("Artifacts: Staff(+15 Mana)", displayWidth / 2 -400, displayHeight / 2 +350);
        }
        if(staffArtifact == true && armorArtifact == true) {
            text("Artifacts: Armor(+15 HP), Staff(+15 Mana)", displayWidth / 2 -350, displayHeight / 2 +350);
        }


        if(keyWentDown("H") && statPoints >= 1 && armorArtifact != true) {
            statPoints = statPoints -1;
            SETplayerHP = SETplayerHP +10;
        }
        else if(keyWentDown("H") && statPoints >= 1 && armorArtifact == true) {
            statPoints = statPoints -1;
            SETplayerHP = SETplayerHP +15;
        }

        if(keyWentDown("M") && statPoints >= 1 && staffArtifact != true) {
            statPoints = statPoints -1;
            SETmana = SETmana +10;
        }
        else if(keyWentDown("M") && statPoints >= 1 && staffArtifact == true) {
            statPoints = statPoints -1;
            SETmana = SETmana +15;
        }

        if(keyWentDown("P") && statPoints >= 1 && playerHPRegen <= 14.5) {
            statPoints = statPoints -1;
            playerHPRegen = playerHPRegen +0.5;
        }

        if(keyWentDown("R") && statPoints >= 1 && manaRegen <= 14.5) {
            statPoints = statPoints -1;
            manaRegen = manaRegen +0.5;
        }

        if(keyWentDown("S") && statPoints >= 1 && speed <= 14) {
            statPoints = statPoints -1;
            speed = speed +1;
        }

        if(keyWentDown("A") && statPoints >= 1 && atkSpeed <= 14) {
            statPoints = statPoints -1;
            atkSpeed = atkSpeed +1;
        }

        if(keyWentDown("B")) {
            gameState = "ENstart";
        }


    }

    //estado de juego "jugar"
    if(gameState == "fight") {

        //fondo
        background(bg);

        //start.visible = false;
        will.visible = true;
        castle.visible = true;
        life.visible = true;


        //SPEED =================================================================
        if(speed <= 1) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -1.5;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +1.5;
            }
        }
        else if(speed >= 2 && speed < 3) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -2;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +2;
            }
        }
        else if(speed >= 3 && speed < 4) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -3;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +3;
            }
        }
        else if(speed >= 4 && speed < 5) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -4;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +4;
            }
        }
        else if(speed >= 5 && speed < 6) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -5;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +5;
            }
        }
        else if(speed >= 6 && speed < 7) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -6;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +6;
            }
        }
        else if(speed >= 7 && speed < 8) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -7;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +7;
            }
        }
        else if(speed >= 8 && speed < 9) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -8;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +8;
            }
        }
        else if(speed >= 9 && speed < 10) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -9;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +9;
            }
        }
        else if(speed >= 10 && speed < 11) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -10;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +10;
            }
        }
        else if(speed >= 11 && speed < 12) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -11;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +11;
            }
        }
        else if(speed >= 12 && speed < 13) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -12;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +12;
            }
        }
        else if(speed >= 13 && speed < 14) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -13;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +13;
            }
        }
        else if(speed >= 14 && speed < 15) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -14;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +14;
            }
        }
        else if(speed >= 15) {
            if(keyDown("UP_ARROW")) {
                will.y = will.y -15;
            }
    
            if(keyDown("DOWN_ARROW")) {
                will.y = will.y +15;
            }
        }
        // SPEED =====================================================================================


        // HP REGEN ==================================================================================
        if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen <= 0.5) {
            playerHP = playerHP +0.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 1 && playerHPRegen < 1.5) {
            playerHP = playerHP +1;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 1.5 && playerHPRegen < 2) {
            playerHP = playerHP +1.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 2 && playerHPRegen < 2.5) {
            playerHP = playerHP +2;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 2.5 && playerHPRegen < 3) {
            playerHP = playerHP +2.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 3 && playerHPRegen < 3.5) {
            playerHP = playerHP +3;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 3.5 && playerHPRegen < 4) {
            playerHP = playerHP +3.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 4 && playerHPRegen < 4.5) {
            playerHP = playerHP +4;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 4.5 && playerHPRegen < 5) {
            playerHP = playerHP +4.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 5 && playerHPRegen < 5.5) {
            playerHP = playerHP +5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 5.5 && playerHPRegen < 6) {
            playerHP = playerHP +5.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 6 && playerHPRegen < 6.5) {
            playerHP = playerHP +6;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 6.5 && playerHPRegen < 7) {
            playerHP = playerHP +6.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 7 && playerHPRegen < 7.5) {
            playerHP = playerHP +7;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 7.5 && playerHPRegen < 8) {
            playerHP = playerHP +7.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 8 && playerHPRegen < 8.5) {
            playerHP = playerHP +8;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 8.5 && playerHPRegen < 9) {
            playerHP = playerHP +8.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 9 && playerHPRegen < 9.5) {
            playerHP = playerHP +9;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 9.5 && playerHPRegen < 10) {
            playerHP = playerHP +9.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 10 && playerHPRegen < 10.5) {
            playerHP = playerHP +10;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 10.5 && playerHPRegen < 11) {
            playerHP = playerHP +10.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 11 && playerHPRegen < 11.5) {
            playerHP = playerHP +11;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 11.5 && playerHPRegen < 12) {
            playerHP = playerHP +11.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 12 && playerHPRegen < 12.5) {
            playerHP = playerHP +12;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 12.5 && playerHPRegen < 13) {
            playerHP = playerHP +12.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 13 && playerHPRegen < 13.5) {
            playerHP = playerHP +13;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 13.5 && playerHPRegen < 14) {
            playerHP = playerHP +13.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 14 && playerHPRegen < 14.5) {
            playerHP = playerHP +14;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 14.5 && playerHPRegen < 15) {
            playerHP = playerHP +14.5;
        }
        else if(frameCount % 60 == 0 && playerHP < SETplayerHP && playerHPRegen >= 15) {
            playerHP = playerHP +15;
        }

        if(playerHP > SETplayerHP) {
            playerHP = SETplayerHP;
        }

        if(playerHP < 0) {
            playerHP = 0;
        }
        // HP REGEN ==================================================================================


        //MANA REGEN =================================================================================
        if(frameCount % 60 == 0 && mana < SETmana && manaRegen <= 0.25) {
            mana = mana +0.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 0.5 && manaRegen < 0.75) {
            mana = mana +0.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 0.75 && manaRegen < 1) {
            mana = mana +0.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 1 && manaRegen < 1.25) {
            mana = mana +1;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 1.25 && manaRegen < 1.5) {
            mana = mana +1.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 1.5 && manaRegen < 1.75) {
            mana = mana +1.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 1.75 && manaRegen < 2) {
            mana = mana +1.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 2 && manaRegen < 2.25) {
            mana = mana +2;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 2.25 && manaRegen < 2.5) {
            mana = mana +2.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 2.5 && manaRegen < 2.75) {
            mana = mana +2.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 2.75 && manaRegen < 3) {
            mana = mana +2.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 3 && manaRegen < 3.25) {
            mana = mana +3;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 3.25 && manaRegen < 3.5) {
            mana = mana +3.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 3.5 && manaRegen < 3.75) {
            mana = mana +3.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 3.75 && manaRegen < 4) {
            mana = mana +3.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 4 && manaRegen < 4.25) {
            mana = mana +4;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 4.25 && manaRegen < 4.5) {
            mana = mana +4.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 4.5 && manaRegen < 4.75) {
            mana = mana +4.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 4.75 && manaRegen < 5) {
            mana = mana +4.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 5 && manaRegen < 5.25) {
            mana = mana +5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 5.25 && manaRegen < 5.5) {
            mana = mana +5.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 5.5 && manaRegen < 5.75) {
            mana = mana +5.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 5.75 && manaRegen < 6) {
            mana = mana +5.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 6 && manaRegen < 6.25) {
            mana = mana +6;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 6.25 && manaRegen < 6.5) {
            mana = mana +6.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 6.5 && manaRegen < 6.75) {
            mana = mana +6.5;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 6.75 && manaRegen < 7) {
            mana = mana +6.75;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 7 && manaRegen < 7.25) {
            mana = mana +7;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 7.25 && manaRegen < 8) {
            mana = mana +7.25;
        }
        else if(frameCount % 60 == 0 && mana < SETmana && manaRegen >= 8) {
            mana = mana +8;
        }

        if(mana > SETmana) {
            mana = SETmana;
        }

        if(mana < 0) {
            mana = 0;
        }
        //MANA REGEN =================================================================================


        if(keyWentDown("space") && mana >= 5) {
            power = createSprite(420, 405);
            power.addImage("poder", powerImg);
            power.scale = 0.3;
            power.visible = true;


            //ATTACK SPEED ===========================================================================
            if(atkSpeed <= 1) {
                power.velocityX = +5;
            }
            else if(atkSpeed >= 2 && atkSpeed < 3) {
                power.velocityX = +6;
            }
            else if(atkSpeed >= 3 && atkSpeed < 4) {
                power.velocityX = +7;
            }
            else if(atkSpeed >= 4 && atkSpeed < 5) {
                power.velocityX = +8;
            }
            else if(atkSpeed >= 5 && atkSpeed < 6) {
                power.velocityX = +9;
            }
            else if(atkSpeed >= 6 && atkSpeed < 7) {
                power.velocityX = +10;
            }
            else if(atkSpeed >= 7 && atkSpeed < 8) {
                power.velocityX = +11;
            }
            else if(atkSpeed >= 8 && atkSpeed < 9) {
                power.velocityX = +12;
            }
            else if(atkSpeed >= 9 && atkSpeed < 10) {
                power.velocityX = +13;
            }
            else if(atkSpeed >= 10 && atkSpeed < 11) {
                power.velocityX = +14;
            }
            else if(atkSpeed >= 11 && atkSpeed < 12) {
                power.velocityX = +15;
            }
            else if(atkSpeed >= 12 && atkSpeed < 13) {
                power.velocityX = +16;
            }
            else if(atkSpeed >= 13 && atkSpeed < 14) {
                power.velocityX = +17;
            }
            else if(atkSpeed >= 14 && atkSpeed < 15) {
                power.velocityX = +18;
            }
            else if(atkSpeed >= 15) {
                power.velocityX = +20;
            }
            //ATTACK SPEED ===========================================================================


            power.position.x = will.position.x +25;
            power.position.y = will.position.y;
            power.lifetime = 150;

            power.setCollider("rectangle", 0, 0, 50, 50);
            powerGroup.add(power);
            
            mana = mana -10;

            will.changeAnimation("willAtacando", willAtk);

        }
        else if(keyWentUp("space")){
            will.changeAnimation("willCaminando", willWlk);
        }

        if(keyWentDown("O") && mana >= 20) {
            power2 = createSprite(420, 405);
            power2.addAnimation("poder2", power2Img);
            power2.scale = 3;
            power2.visible = true;

            power2.position.x = mouseX;
            power2.position.y = mouseY;
            power2.lifetime = 50;
            power2Group.add(power2);

            power2.setCollider("circle", 0, -25, 90);

            mana = mana -20;

            will.changeAnimation("willAtacando", willAtk);

        }
        else if(keyWentUp("O")){
            will.changeAnimation("willCaminando", willWlk);
        }


        //detección poder1
        if(skeletonGroup.isTouching(powerGroup)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(powerGroup)) {
                    skeletonGroup[i].destroy();
                    powerGroup.destroyEach();
                    skeletonCount = skeletonCount -1;
                    xpEarnerSk();

                } 
            }
        }

        if(necroGroup.isTouching(powerGroup)) {
            for(var i = 0; i < necroGroup.length; i++) {     
                if(necroGroup[i].isTouching(powerGroup)) {
                    powerGroup.destroyEach();
                    necroLives = necroLives -1;

                } 
            }
        }


        //detección poder2
        if(skeletonGroup.isTouching(power2Group)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(power2Group)) {
                    skeletonGroup[i].destroy();
                    skeletonCount = skeletonCount -1;
                    xpEarnerSk();
                    
                } 
            }
        }

        if(dragonGroup.isTouching(power2Group)) {
            for(var i = 0; i < dragonGroup.length; i++) {     
                if(dragonGroup[i].isTouching(power2Group)) {
                    dragonGroup[i].destroy();
                    skeletonCount = skeletonCount -3;
                    xpEarnerDrg();

                } 
            }
        }

        if(necroGroup.isTouching(power2Group)) {
            for(var i = 0; i < necroGroup.length; i++) {     
                if(necroGroup[i].isTouching(power2Group)) {
                    power2Group.destroyEach();
                    necroLives = necroLives -3;

                } 
            }
        }

        if(necFbGroup.isTouching(power2Group)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(power2Group)) {
                    necFbGroup[i].destroy();

                } 
            }
        }

        //detección sk y will, fb y will, necro y will
        if(skeletonGroup.isTouching(willGroup)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(willGroup)) {
                    if(frameCount % 100 == 0) {
                        playerHP = playerHP -5;
                    }

                }
            }
        }

        if(necFbGroup.isTouching(willGroup)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(willGroup)) {
                    necFbGroup[i].destroy();
                    playerHP = playerHP -10;

                } 
            }
        }

        if(necroGroup.isTouching(willGroup)) {
            for(var i = 0; i < necroGroup.length; i++) {     
                if(necroGroup[i].isTouching(willGroup)) {
                    playerHP = playerHP -20;

                } 
            }
        }

        //detección entre fb y will y castillo y poder1
        if(necFbGroup.isTouching(castleGroup)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(castleGroup)) {
                    necFbGroup[i].destroy();
                    lives = lives -10;

                } 
            }
        }

        if(necFbGroup.isTouching(powerGroup)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(powerGroup)) {
                    necFbGroup[i].destroy();
                    powerGroup.destroyEach();

                } 
            }
        }


        //detección de tacto entre los enemigos y el castillo
        if(skeletonGroup.isTouching(castle)) {
            for(var i = 0; i < skeletonGroup.length; i++){     
                if(skeletonGroup[i].isTouching(castle)){
                    skeletonGroup[i].velocityX = 0;

                    if(frameCount % 100 == 0) {
                        lifeTimer = lifeTimer -1;
                    }

                    lives = lifeTimer;
                }
            }
        }

        if(dragonGroup.isTouching(castle)) {
            for(var i = 0; i < dragonGroup.length; i++){     
                if(dragonGroup[i].isTouching(castle)){
                    dragonGroup[i].velocityX = 0;

                    if(frameCount % 100 == 0) {
                        lifeTimer = lifeTimer -5;
                    }

                    lives = lifeTimer;
                }
            }
        }

        //detección entre poder y artefactos
        if(armorGroup.isTouching(powerGroup)) {
            for(var i = 0; i < armorGroup.length; i++) {     
                if(armorGroup[i].isTouching(powerGroup)) {
                    armorGroup[i].destroy();
                    powerGroup.destroyEach();
                    armorArtifact = true;

                } 
            }
        }
        if(staffGroup.isTouching(powerGroup)) {
            for(var i = 0; i < staffGroup.length; i++) {     
                if(staffGroup[i].isTouching(powerGroup)) {
                    staffGroup[i].destroy();
                    powerGroup.destroyEach();
                    staffArtifact = true;

                } 
            }
        }

        //detección moneda-poder
        if(coinsGroup.isTouching(powerGroup)) {
            for(var i = 0; i < coinsGroup.length; i++) {     
                if(coinsGroup[i].isTouching(powerGroup)) {
                    coinsGroup[i].destroy();
                    powerGroup.destroyEach();
                    coinsCount = +1;

                } 
            }
        }

        //temporizador para intermisión
        if(frameCount % 10 == 0 && game != "inter" && game != "Final_BossInter" && game == "Final_Boss") {
            timer2 = timer2 +1;
        }

        //niveles del jugador y puntos de atributos
        if(xp >= xpCount) {
            xp = 0;
            xpCount = Math.round(xpCount * 1.5);
            pl = pl +1;
            statPointEarner();
        }

        //condición de jefe final
        if(wave == 10 && skeletonCount <= 0) {
            game = "Final_BossInter";
        }
        
        //condiciones de oleadas
        if(skeletonCount <= 0 && wave <= 10 && game != "Final_BossInter") {
            game = "inter";
            wave = wave +1;
            iniciowave = 1;
        }

        if(game == "inter") {
            if(frameCount % 60 == 0) {
                timer3 = timer3 -1;
            }
            
            skeletonGroup.destroyEach();
            dragonGroup.destroyEach();
            powerGroup.destroyEach();
            power2Group.destroyEach();

            textSize(20);
            fill("black");
            stroke("white");
            strokeWeight(2.5);
            if(language == "SP") {
                text("¡Has avanzado de Oleada!, siguiente Oleada en: " + timer3, displayWidth / 2 -100, displayHeight / 2);
            }
            else if(language == "EN") {
                text("You've passed to the next wave!, next one in: " + timer3, displayWidth / 2 -100, displayHeight / 2);
            }

            if(timer3 <= 0) {
                game = "notInter";
                timer3 = 3;
            }
            
        }

        if(wave == 2 && iniciowave == 1) {
            skeletonCount = 10;
            iniciowave = 0;
        }

        if(wave == 3 && iniciowave == 1) {
            skeletonCount = 15;
            iniciowave = 0;
        }

        if(wave == 4 && iniciowave == 1) {
            skeletonCount = 20;
            iniciowave = 0;
        }

        if(wave == 5 && iniciowave == 1) {
            skeletonCount = 25;
            iniciowave = 0;
        }

        if(wave == 6 && iniciowave == 1) {
            skeletonCount = 30;
            iniciowave = 0;
        }

        if(wave == 7 && iniciowave == 1) {
            skeletonCount = 35;
            iniciowave = 0;
        }

        if(wave == 8 && iniciowave == 1) {
            skeletonCount = 40;
            iniciowave = 0;
        }

        if(wave == 9 && iniciowave == 1) {
            skeletonCount = 45;
            iniciowave = 0;
        }

        if(wave == 10 && iniciowave == 1) {
            skeletonCount = 50;
            iniciowave = 0;
        }

        if(game == "Final_BossInter") {
            if(timer5 <= 5 && timer5 > 0) {
                if(frameCount % 60 == 0) {
                    timer5 = timer5 -1;
                }
                
                skeletonGroup.destroyEach();
                dragonGroup.destroyEach();
                powerGroup.destroyEach();
                power2Group.destroyEach();

                textSize(30);
                fill("black");
                stroke("white");
                strokeWeight(2.5);
                if(language == "SP") {
                    text("¡Has llegado a la etapa del Jefe Final!, empezará en: " + timer5, displayWidth / 2 -150, 
                    displayHeight / 2 -200);
                }
                else if(language == "EN") {
                    text("You've got to the final boss stage!, it will start in: " + timer5, displayWidth / 2 -150, 
                    displayHeight / 2 -200);
                }
            }
            else {
                game = "Final_Boss";
            }

        }

        if(game == "Final_Boss") {

            if(timer4 <= 5) {
                if(frameCount % 1 == 0) {
                    timer4 = timer4 +1;
                }
            }

            textSize(20);
            fill("black");
            stroke("white");
            strokeWeight(2.5);
            if(language == "SP") {
                text("Vida Restante del Jefe Final: " + necroLives, displayWidth / 2 +350, displayHeight / 2 -350);
            }
            else if(language == "EN") {
                text("Life Left from the final boss: " + necroLives, displayWidth / 2 +350, displayHeight / 2 -350);
            }
            

            if(necroLives <= 0) {
                gameState = "won";
            }

            lvl11();
        }


        //cambio de imagen para barra de vida
        if(lives <= 100 && lives > 83) {
            life.addImage(health100Img);
            castle.addImage(castleImg);
            castle.scale = 0.5;
        }

        if(lives <= 83 && lives > 66) {
            life.addImage(health83Img);
        }

        if(lives <= 66 && lives > 50) {
            life.addImage(health66Img);
        }

        if(lives <= 50 && lives > 33) {
            life.addImage(health50Img);
            castle.addImage(castle2Img);
            castle.scale = 0.5;
            castle.y = 400;
        }

        if(lives <= 33 && lives > 16) {
            life.addImage(health33Img);
            castle.y = 400;
        }

        if(lives <= 16 && lives > 0) {
            life.addImage(health16Img);
            castle.addImage(castle3Img);
            castle.scale = 0.5;
            castle.y = 500;
        }


        //colisión entre Will y las paredes invisibles
        will.collide(wall);
        will.collide(wall2);

        //porcentaje de vida restante
        textSize(20);
        fill("black");
        stroke("white");
        strokeWeight(0.25);
        text(lives + "%", life.x -20, life.y -20);
        

        if(game != "Final_BossInter" && game != "Final_Boss") {
            //oleadas
            strokeWeight(2.5);
            if(language == "SP") {
                text("Oleada: " + wave, displayWidth / 2 +550, displayHeight / 2 -350);

                //cantidad de enemigos restantes
                textSize(17.5);
                if(wave == 1 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/5", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl1();
                }
    
                if(wave == 2 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/10", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl2();
                }
    
                if(wave == 3 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/15", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl3();
                }
    
                if(wave == 4 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/20", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl4();
                }
    
                if(wave == 5 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/25", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl5();
                }
    
                if(wave == 6 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/30", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl6();
                }
    
                if(wave == 7 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/35", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl7();
                }
    
                if(wave == 8 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/40", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl8();
                }
    
                if(wave == 9 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/45", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl9();
                }
    
                if(wave == 10 && game != "inter") {
                    text("Enemigos Restantes: " + skeletonCount + "/50", displayWidth / 2 +440, displayHeight / 2 -320);
                    lvl10();
                }
            }
            else if(language == "EN") {
                text("Wave: " + wave, displayWidth / 2 +565, displayHeight / 2 -350);

                //cantidad de enemigos restantes
                textSize(17.5);
                if(wave == 1 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/5", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl1();
                }

                if(wave == 2 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/10", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl2();
                }

                if(wave == 3 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/15", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl3();
                }

                if(wave == 4 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/20", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl4();
                }

                if(wave == 5 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/25", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl5();
                }

                if(wave == 6 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/30", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl6();
                }

                if(wave == 7 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/35", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl7();
                }

                if(wave == 8 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/40", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl8();
                }

                if(wave == 9 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/45", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl9();
                }

                if(wave == 10 && game != "inter") {
                    text("Enemies Left: " + skeletonCount + "/50", displayWidth / 2 +500, displayHeight / 2 -320);
                    lvl10();
                }
            }
        }
        
        textSize(20);
        if(language == "EN") {
            text("Mana: " + mana, displayWidth / 2 -30, displayHeight / 2 -350);
            text("HP: " + playerHP, displayWidth / 2 +90, displayHeight / 2 -350);
            text("Player Level: " + pl, displayWidth / 2 +180, displayHeight / 2 -350);
            text("XP: " + xp + "/" + xpCount, displayWidth / 2 +330, displayHeight / 2 -350);
    
            text("Mana Regeneration: " + manaRegen + "/s", displayWidth / 2 -30, displayHeight / 2 -320);
            text("Speed: " + speed, displayWidth / 2 +240, displayHeight / 2 -320);
            text("Attack Speed: " + atkSpeed, displayWidth / 2 -30, displayHeight / 2 -290);

            text("HP Regeneration: " + playerHPRegen + "/s", displayWidth / 2 +150, displayHeight / 2 -290);
        }
        else if(language == "SP") {
            text("Maná: " + mana, displayWidth / 2 -90, displayHeight / 2 -350);
            text("HP: " + playerHP, displayWidth / 2 +30, displayHeight / 2 -350);
            text("Nivel del Juagador: " + pl, displayWidth / 2 +120, displayHeight / 2 -350);
            text("EXP: " + xp + "/" + xpCount, displayWidth / 2 +330, displayHeight / 2 -350);
    
            text("Regeneración de Maná: " + manaRegen + "/s", displayWidth / 2 -90, displayHeight / 2 -320);
            text("Velocidad: " + speed, displayWidth / 2 +220, displayHeight / 2 -320);
            text("Velocidad de Ataque: " + atkSpeed, displayWidth / 2 -90, displayHeight / 2 -290);

            text("Regeneración de HP: " + playerHPRegen + "/s", displayWidth / 2 +180, displayHeight / 2 -290);
        }


        //condición de derrota
        if(lives <= 0 || playerHP <= 0) {
            gameState = "gameOver";
        }
    }

    //estado de juego "victoria"
    if(gameState == "won") {
        will.visible = false;
        life.visible = false;
        castle.visible = false;

        skeletonGroup.destroyEach();
        dragonGroup.destroyEach();
        powerGroup.destroyEach();
        power2Group.destroyEach();
        necro.destroyEach();
        necFb.destroyEach();

        background(bgHome);

        textSize(50);
        fill("red");
        stroke("black");
        strokeWeight(2.5);
        if(language == "SP") {
            text("¡Ganaste!", displayWidth / 2 -120, displayHeight / 2);

            textSize(20);
            fill("white");
            stroke("red");
            text("Presiona la letra 'R' para reiniciar el juego", displayWidth / 2 -200, displayHeight / 2 +80);
        }
        else if(language == "EN") {
            text("You won!", displayWidth / 2 -120, displayHeight / 2);

            textSize(20);
            fill("white");
            stroke("red");
            text("Press the letter R to restart the game", displayWidth / 2 -200, displayHeight / 2 +80);
        }

        restart();
    }

    //estado de juego "derrota"
    if(gameState == "gameOver") {
        will.visible = false;
        life.visible = false;
        castle.visible = false;

        skeletonGroup.destroyEach();
        dragonGroup.destroyEach();
        powerGroup.destroyEach();
        power2Group.destroyEach();
        necroGroup.destroyEach();
        necFbGroup.destroyEach();

        background(bgHome);

        if(language == "SP") {
            textSize(50);
            fill("red");
            stroke("black");
            strokeWeight(2.5);
            text("¡Perdiste!", displayWidth / 2 -120, displayHeight / 2);
    
            if(game != "Final_Boss") {
                textSize(25);
                fill("black");
                stroke("white");
                text("Oleada: " + wave, displayWidth / 2 -65, displayHeight / 2 +50);
            }
            else {
                textSize(25);
                fill("black");
                stroke("white");
                text("Oleada: " + game, displayWidth / 2 -65, displayHeight / 2 +50);
            }
    
            textSize(20);
            fill("white");
            stroke("red");
            text("Presiona la letra 'R' para reiniciar el juego", displayWidth / 2 -200, displayHeight / 2 +80);
        }
        else if(language == "EN") {
            textSize(50);
            fill("red");
            stroke("black");
            strokeWeight(2.5);
            text("You lost!", displayWidth / 2 -120, displayHeight / 2);
    
            if(game != "Final_Boss") {
                textSize(25);
                fill("black");
                stroke("white");
                text("Wave: " + wave, displayWidth / 2 -65, displayHeight / 2 +50);
            }
            else {
                textSize(25);
                fill("black");
                stroke("white");
                text("Wave: " + game, displayWidth / 2 -65, displayHeight / 2 +50);
            }
    
            textSize(20);
            fill("white");
            stroke("red");
            text("Press letter R to restart the game", displayWidth / 2 -180, displayHeight / 2 +80);
        }

        restart();
    }

    drawSprites();
}


//generación de enemigos
function lvl1() {
    if(frameCount % 90 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl2() {
    if(frameCount % 80 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5.5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl3() {
    if(frameCount % 70 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -6;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl4() {
    if(frameCount % 60 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -6.5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl5() {
    if(frameCount % 50 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -7;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    coinSpawn();
}

function lvl6() {
    if(frameCount % 40 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -7.5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 180 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }

    if(frameCount % 360 == 0 && armorArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 5) {
            armor = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            armor.addImage(armorImg);
            armor.scale = 1.8;

            armor.velocityX = -5;
            armor.setCollider("circle", 0, 0, 30);
            armorGroup.add(armor);
        }
    }

    if(frameCount % 360 == 0 && staffArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 5) {
            staff = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            staff.addAnimation("staff", staffImg);
            staff.scale = 1.8;

            staff.velocityX = -5;
            staff.setCollider("circle", 0, 0, 30);
            staffGroup.add(staff);
        }
    }

    coinSpawn();
}

function lvl7() {
    if(frameCount % 30 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -8;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 160 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }

    if(frameCount % 360 == 0 && armorArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 6) {
            armor = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            armor.addImage(armorImg);
            armor.scale = 1.8;

            armor.velocityX = -5;
            armor.setCollider("circle", 0, 0, 30);
            armorGroup.add(armor);
        }
    }

    if(frameCount % 360 == 0 && staffArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 6) {
            staff = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            staff.addAnimation("staff", staffImg);
            staff.scale = 1.8;

            staff.velocityX = -5;
            staff.setCollider("circle", 0, 0, 30);
            staffGroup.add(staff);
        }
    }

    coinSpawn();
}

function lvl8() {
    if(frameCount % 20 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -8.5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 140 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }

    if(frameCount % 360 == 0 && armorArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 7) {
            armor = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            armor.addImage(armorImg);
            armor.scale = 1.8;

            armor.velocityX = -5;
            armor.setCollider("circle", 0, 0, 30);
            armorGroup.add(armor);
        }
    }

    if(frameCount % 360 == 0 && staffArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 7) {
            staff = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            staff.addAnimation("staff", staffImg);
            staff.scale = 1.8;

            staff.velocityX = -5;
            staff.setCollider("circle", 0, 0, 30);
            staffGroup.add(staff);
        }
    }

    coinSpawn();
}

function lvl9() {
    if(frameCount % 10 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -9;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 120 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }

    if(frameCount % 360 == 0 && armorArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 8) {
            armor = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            armor.addImage(armorImg);
            armor.scale = 1.8;

            armor.velocityX = -5;
            armor.setCollider("circle", 0, 0, 30);
            armorGroup.add(armor);
        }
    }

    if(frameCount % 360 == 0 && staffArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 8) {
            staff = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            staff.addAnimation("staff", staffImg);
            staff.scale = 1.8;

            staff.velocityX = -5;
            staff.setCollider("circle", 0, 0, 30);
            staffGroup.add(staff);
        }
    }

    coinSpawn();
}

function lvl10() {
    if(frameCount % 5 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -10;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 100 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }

    if(frameCount % 360 == 0 && armorArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 9) {
            armor = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            armor.addImage(armorImg);
            armor.scale = 1.8;

            armor.velocityX = -5;
            armor.setCollider("circle", 0, 0, 30);
            armorGroup.add(armor);
        }
    }

    if(frameCount % 360 == 0 && staffArtifact != true) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 9) {
            staff = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            staff.addAnimation("staff", staffImg);
            staff.scale = 1.8;

            staff.velocityX = -5;
            staff.setCollider("circle", 0, 0, 30);
            staffGroup.add(staff);
        }
    }

    coinSpawn();
}

function lvl11() {
    if(timer4 == 1) {
        necro = createSprite(displayWidth -50, random(displayHeight / 2 +50, displayHeight / 2 +225));
        necro.addAnimation("finalBoss", necroImg);
        necro.scale = 1.8;

        necro.velocityX = random(-0.5, -1);
        necro.velocityY = random(-0.1, 0.1);
        necro.setCollider("circle", 10, -5, 25);
        necroGroup.add(necro);
        
    }

    necro.bounceOff(wall);
    necro.bounceOff(wall2);

    if(frameCount % 80 == 0) {
        necFb = createSprite(displayWidth -50, random(displayHeight / 2 +50, displayHeight / 2 +225));
        necFb.addAnimation("fireball", necFbImg);
        necFb.scale = 1;
        necFb.velocityX = -20;

        necFb.position.x = necro.position.x;
        necFb.setCollider("rectangle", -10, 0, 50, 50);
        necFbGroup.add(necFb);

    }
}

function xpEarnerSk() {
    if(pl <= 5) {
        xp = xp +1;
    }
    else if(pl >= 6 && pl <= 10) {
        xp = xp +2;
    }
    else if(pl >= 11) {
        xp = xp +3;
    }

}

function xpEarnerDrg() {
    if(pl <= 5) {
        xp = xp +2;
    }
    else if(pl >= 6 && pl <= 10) {
        xp = xp +4;
    }
    else if(pl >= 11) {
        xp = xp +6;
    }

}

function statPointEarner() {
    if(pl <= 5) {
        statPoints = statPoints +1;
    }
    else if(pl >= 6 && pl <= 10) {
        statPoints = statPoints +2;
    }
    else if(pl >= 11) {
        statPoints = statPoints +3;
    }

}

function coinSpawn() {
    if(frameCount % 420 == 0) {
        var randomizer = Math.round(random(1,100));

        if(randomizer <= 2) {
            coins = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
            coins.addAnimation("coins", coinsImg);
            coins.scale = 1.8;

            coins.velocityX = -5;
            coins.setCollider("circle", 0, 0, 30);
            coinsGroup.add(coins);
        }
    }
}

//reinicio de juego
function restart() {
    if(keyWentDown("R")) {
        wave = 1;
        timer1 = 30;
        lives = 100;
        lifeTimer = 100;
        playerHP = 100;

        necroLives = 100;
        timer4 = 0;
        timer5 = 5;
        skeletonCount = 5;
        mana = 100;

        castle.y = 350;

        if(language == "SP") {
            gameState = "SPstart";
        }
        else if(language == "EN") {
            gameState = "ENstart";
        }
        
        game = "notInter";
    }
}
