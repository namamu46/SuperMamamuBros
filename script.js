'use strict';

//ctx1 背景描画用
var can1 = document.getElementById('can1');
var ctx1 = can1.getContext('2d');

//ctx2 キャラクタ動作用
var can2 = document.getElementById('can2');
var ctx2 = can2.getContext('2d');

let logger = document.getElementById('logger');
let keydown = "";

var i,j;
var keyCode = false;
var block={
    x:10,
    y:10,
    xx:10,
    yy:10,
    bcolor:[
        'skyblue',
        'darkslategray',
        'gold',
        'brown',
        'green',
    ]
}

for (i = 0; i < map1.length; i++) {
    for (j = 0; j < map1[i].length; j++) {
        ctx1.fillStyle = block.bcolor[map1[i][j]];
        ctx1.fillRect(j * block.x, i * block.y, block.xx, block.yy);
        }
    }

let nama ={
    x: 20,
    y: 20,
    xx: 10,
    yy: 10,
    bcolor:'red',
    grav:2,
    namaValX: 0,
    namaValY: 0,
    namaVal2X: 0,
    namaVal2Y: 0,
    MoveVolX:1,
    MoveVolY:1,
    Lsw:0,
    Rsw:0,
    RmoveSw:1,
    LmoveSw:1,
    UpmoveSw:1,//上に壁あり移動できない0　壁なし移動できる1
    jumpNow:0,
    jumpVol:1,
    jumpZY:10,

        draw:function(){
            ctx2.fillStyle = nama.bcolor;
            ctx2.fillRect(nama.x , nama.y += nama.grav , nama.xx , nama.yy);
            if (nama.Rsw == 1) { nama.x += nama.MoveVolX; };
            if (nama.Lsw == 1) { nama.x -= nama.MoveVolX; };
        },

        coli: function () {
            //地面にぶつかると止まるシステム
            this.namaValX = Math.floor(nama.x / 10);
            this.namaValY = Math.floor(nama.y / 10);

            if (map1[nama.namaValY + 1][nama.namaValX] >= 1){
                    nama.grav = 0; //地面で止まる
                } else {
                    nama.grav = 1; 
            }

            if (map1[nama.namaValY + 1][nama.namaValX] == 0 && map1[nama.namaValY + 1][nama.namaValX +1 ] >= 1){
                nama.grav = 0;
            }else
            if (map1[nama.namaValY + 1][nama.namaValX] == 0 && map1[nama.namaValY + 1][nama.namaValX + 1] >= 1 && map1[nama.namaValY + 1][nama.namaValX - 1] >= 1) {
                nama.grav = 1;
            }
        
                //壁が右にあっていけなーい
            if (map1[nama.namaValY][nama.namaValX + 1] >= 1) {
                if (nama.x + nama.xx >= nama.namaValX * 10 || (nama.namaValX * 10) <= nama.x) { nama.Rsw = 0; nama.RmoveSw = 0;}//右にいけない
                } else {
                        nama.RmoveSw = 1;//右に行ける
                        }

                //壁が左にあっていけなーい
            if (map1[nama.namaValY][nama.namaValX ] >= 1) {
                if (nama.x + nama.xx >= nama.namaValX * 10 || (nama.namaValX * 10) <= nama.x) { nama.Lsw = 0; nama.LmoveSw = 0;}    
                } else {
                        nama.LmoveSw = 1;
                        }

                //天井でエラーをださなーい
            if (map1[nama.namaValY][nama.namaValX-1] === undefined) {
                console.log('tennjyou');
            }

        },

        jump:function(){
            if(nama.jumpNow==1){
                nama.y -= nama.jumpZY;
                nama.jumpZY-= 0.6;
              
                if(nama.jumpZY < 0){
                    nama.jumpNow = 0;
                    nama.grav = 1;
                    }
            }
        },



        namaEvent:

            function(e){
               

                document.addEventListener("keydown", (e) => {
                    keydown = e.key;
                    // console.log(e.key);
                });
                document.addEventListener("keyup", (e) => {
                    keydown = "";
                });
                
                if (keydown == 'ArrowUp') {
                                    // nama.y -= nama.MoveVolY;
                                    if(nama.jumpNow==0 && nama.grav==0){
                                        nama.jumpNow = 1;
                                        nama.grav = 0;
                                        nama.jumpZY=6.5;
                                    }
                                nama.jump();
                                // console.log('UP');
                                }else if (keydown == 'ArrowLeft' && nama.LmoveSw == 1) {
                                nama.Lsw = 1;
                                // console.log('left');
                                } else if (keydown == 'ArrowRight' && nama.RmoveSw==1) {
                                nama.Rsw = 1;            
                                // console.log('right');
                }

                if (keydown == "") {
                    nama.Lsw = 0;
                    nama.Rsw = 0;
                }
     
            },

    }

//main loop 
function main(){

    ctx1.clearRect(0, 0, can1.width, can1.height);
    ctx2.clearRect(0, 0, can2.width, can2.height);
    
    for (i = 0; i < map1.length; i++) {
        for (j = 0; j < map1[i].length; j++) {
            ctx1.fillStyle = block.bcolor[map1[i][j]];
            ctx1.fillRect(j * block.x, i * block.y, block.xx, block.yy);
        }
    }
    nama.draw();
    nama.jump();
    nama.coli();
   
    nama.namaEvent();

    logger.innerHTML =
    '下:' + map1[nama.namaValY + 1][nama.namaValX] + ',' +
    '上:' + map1[nama.namaValY - 1][nama.namaValX] +
    '右:' + map1[nama.namaValY][nama.namaValX + 1] +
    '左:' + map1[nama.namaValY][nama.namaValX - 1] +
    '_nama.x:' + +nama.x
    + '_nama.y:' + +nama.y
    + '_nama.namaValX:' + (nama.namaValX * 10)
    + '_nama.namaValY:' + nama.namaValY * 10;

    // console.log(map1[nama.namaValY][nama.namaValX]);

requestAnimationFrame(main);
}

main();
