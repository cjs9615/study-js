
const init = () => {
    const divs = document.querySelectorAll(".row > div");
    const result = document.querySelector("h2");

    result.textContent = "";
    divs.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            item.textContent = index+1;
        })
    } )
}

document.addEventListener("DOMContentLoaded", () => {
    let arr = [];
    const bt = document.querySelector("button");
    const divs = document.querySelectorAll(".row > div");
    const result = document.querySelector("h2");

    bt.addEventListener("click", () => {
      
        arr = [0,0,0,0,0,0,0,0,0];
        let n = Math.floor(Math.random() * 9);
        arr[n] = 1;
        console.log(arr);
    })
    
    divs.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            if(arr.length == 0){
                result.textContent = "폭탄섞기를 해주세요.";
                return;
            }
            if(result.textContent == "실패"){
                return;
            }
            if(arr[parseInt(item.textContent)-1] == 0){
                item.innerHTML = "<img src='./img/hart.png'></img>";
            }
            else {
                item.innerHTML = "<img src='./img/boom.png'></img>";
                result.textContent = "실패";
                return;
            }
        })
    } )
})