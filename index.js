const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const colors = [green, red, yellow, blue];
const btnStart = document.getElementById('btn-start');
const bg = document.getElementById('bg');
const win = document.getElementById('win');
const lose = document.getElementById('lose');
const count = document.getElementById('countDown');


const FINAL_LEVEL = 10;
const sound = {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
}

class Game{
    constructor(){
        this.initialize();
        this.color = {
            green,
            red,
            yellow,
            blue
        }
        this.generateSequence();
        this.countDownSequence(3);
    }
    initialize(){
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.toggleBtnStart();
        this.currentLevel = 1;
    }
    toggleBtnStart(){
        if(btnStart.classList.contains('hide')){
            btnStart.classList.remove('hide')
        }else{
            btnStart.classList.add('hide')
        }
    }
    generateSequence(){
        this.sequence = new Array(FINAL_LEVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }
    countDownSequence(i){
        count.classList.remove('hide')
        count.style.animation = `bigToSmall 1s ${i+1} ease-in forwards`;
        count.innerHTML = i--;
        const countUpdate = setInterval(() => {
            if (i === 0){
                count.innerHTML = 'Go!';
                clearInterval(countUpdate);
                setTimeout(this.nextLevel,1250);
            }else{
                count.innerHTML = i--;
            }
        },1000)
    }
    nextLevel(){
        this.subLevel = 0;
        this.lightSequence();
        this.addEvent();
    }
    lightSequence(){
        for(let i = 0; i < this.currentLevel; i++){
            setTimeout(() => this.turnOnColor(this.sequence[i]),500*i)
        }
    }
    turnOnColor(color){
        colors[color].classList.add('light');
        switch(color){
            case 0 : sound.green.play(); break;
            case 1 : sound.red.play(); break;
            case 2 : sound.yellow.play(); break;
            case 3 : sound.blue.play(); break;
        }
        setTimeout(() => this.turnOfColor(color),200)
    }
    turnOfColor(color){
        colors[color].classList.remove('light');
    }
    addEvent(){
        this.color.green.addEventListener('click',this.chooseColor)
        this.color.red.addEventListener('click',this.chooseColor)
        this.color.yellow.addEventListener('click',this.chooseColor)
        this.color.blue.addEventListener('click',this.chooseColor)
    }
    removeEvent(){
        this.color.green.removeEventListener('click',this.chooseColor)
        this.color.red.removeEventListener('click',this.chooseColor)
        this.color.yellow.removeEventListener('click',this.chooseColor)
        this.color.blue.removeEventListener('click',this.chooseColor)
    }
    chooseColor(ev){
        let numberColor = 0;
        switch(ev.target.dataset.color){
            case 'green' : numberColor = 0; break;
            case 'red' : numberColor = 1; break;
            case 'yellow' : numberColor = 2; break;
            case 'blue' : numberColor = 3; break;
        }
        this.turnOnColor(numberColor)
        if(numberColor === this.sequence[this.subLevel]){
            //subnivel superado
            this.subLevel++;
            if(this.subLevel === this.currentLevel){
                //sig nivel
                this.currentLevel++;
                if(this.currentLevel === (FINAL_LEVEL + 1)){
                    //gano
                    this.gameOver(win);
                }else{
                    setTimeout(this.nextLevel,1500);
                }
            }
        }else{
            //perdio
            bg.style.animation = '0.5s bgLose';
            setTimeout(()=>{
                bg.style.animation = 'none'
            },500);
            this.gameOver(lose);
        }
    }
    gameOver(result){
        this.removeEvent();
        result.classList.remove('hide');
        setTimeout(()=>{
            result.classList.add('hide')
            //new game
            this.initialize()
        },3000);
    }
}

function startGame(){
    const game = new Game()
}