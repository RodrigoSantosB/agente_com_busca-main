var img0;
var img1;
var img2;

function preload(){
    img0 = loadImage("agente_com_busca-main/imgs/1.png");
    img1 = loadImage("agente_com_busca-main/imgs/2.png");
    img2 = loadImage("agente_com_busca-main/imgs/1.png");
}

function menu(){
    background(img)
    fill(200, 150, 250)
    rect(xpos, ypos, width, height)
    textSize(20)

    fill(50,50,50)
    text("Play", x+20, y+20)

    fill(250, 250, 50)
    rect(xpos, ypos+50, width, height)
    textSize(20)
    fill(50,50,50)
    text("Guide", x+20, y+70)


    fill(250, 50, 50)
    rect(xpos, ypos+100, width, height)
    textSize(20)

    fill(50, 50, 50)
    text("Credits",xpos+10, ypos+120)
    textSize(20)
    push()
    circle(mouseX, mouseY, 10)
    text(mouseX+":"+mouseY, 30,20)
}