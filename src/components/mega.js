let inversion = document.getElementById('choice')
let inversion1 = document.getElementById('choice1')
let inversion2 = document.getElementById('choice2')
let inversion3 = document.getElementById('choice3')
let inversion4 = document.getElementById('choice4')
let inversion5 = document.getElementById('choice5')
let entrance = [];


let pop = "Thanks for choosing us!"
let pop2 = `<p class="p" onclick="link1()">1) Current Market Price: USD from Chairlink</p>`
let pop3= `<p class="p" onclick="link2()">2)When price is 10% cheaper: XXX USD - 10%</p>`
let pop4 = `<p class="p" onclick="link3()">3)At fix price: xxx USD (manually typed)</p>`

//enter to option current price //
let actualPrice = 1.25;
let pop5 = "The current Price is : "+ actualPrice
let pop6 = "Do you want to change?"
let pop7 = `<p class="p" onclick="linkyes()">Yes</p>" "<p class="p" onclick="invierte()">No</p>`

//enter to option 10% lower//

let pop8 = "Your money will be hold till the price will be 10% lower"
let pop9 = `<p class="p" onclick="linkcheaper()">Yes</p>" "<p class="p" onclick="invierte()">No</p>`

//enter price manually typed//
let pop10 = "Enter a fixed price"
let pop11 = `<input type="number" id="quantity" name="quantity">`
let pop12 = ``
let quanty = document.getElementById('quantity')
let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let email = document.getElementById('email')

let firstMessage = `<p class="p">How much BTC do you want to change?</p>`
let secondMessage = `<p onclick="popUp()">1-100%</p>`
let thirdMessage =  `<p onclick="specificAmmount()">2-An Specific Ammount</p>`
const invirtiendo = document.querySelector("#inversion");
const mensaje = document.getElementById("inversion")
let emptySpace = "   "

let messageOpt1 = document.getElementById('choice2')
let empty = document.getElementById('choice3')



invirtiendo.addEventListener('dragover', e =>{
    e.preventDefault();
})
invirtiendo.addEventListener('drop', () =>{
    invierte();
    })

let enterAmmount
function specificAmmount(){    
    enterAmmount = prompt("How much do you want to change?: ")
    inversion1.innerHTML = pop2
    inversion2.innerHTML = pop3
    inversion3.innerHTML = pop4
    inversion4.innerHTML = `<p>Your Money entered is ${enterAmmount}</p>`
 }


function popUp(){
    messageOpt1.innerHTML = pop
    empty.innerHTML = emptySpace    
}

function invierte(){   
     inversion.innerHTML = firstMessage 
     inversion1.innerHTML = emptySpace
     inversion2.innerHTML = secondMessage
     inversion3.innerHTML = thirdMessage
     inversion4.innerHTML = emptySpace
     inversion5.innerHTML = emptySpace
 }

function link1(){    
    inversion1.innerHTML = pop5
    inversion2.innerHTML = pop6
    inversion3.innerHTML = pop7
    inversion5.innerHTML = emptySpace
    }

function link2(){
    inversion1.innerHTML = pop8
    inversion2.innerHTML = pop9
    inversion3.innerHTML = emptySpace
    inversion5.innerHTML = emptySpace
    
}
function link3(){
    inversion1.innerHTML = pop10
    inversion2.innerHTML = pop11
    inversion3.innerHTML = emptySpace
    
}
function sendrequire(){
    console.log(fname)
}
