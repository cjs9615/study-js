//전역변수
//하트와 폭탄의 위치를 결정하는 배열
//하트 : 0 , 폭탄 : 1
let arr = [0,0,0,0,0,0,0,0,1];

//폭탄섞기 확인용 플래그
let flag = true;

//눌러진 박스 수
let cnt = 0;

//초기화
const init = (boxs) => {
    //변수 초기화
    flag = true;
    cnt = 0;
    //박스 숫자 초기화
    boxs.forEach(element => {
        let n = element.getAttribute("id").slice(-1);
        console.log(n);
        element.textContent = n;
    });
}


document.addEventListener("DOMContentLoaded", () => {
    //컴포넌트 가져오기
    const boxs = document.querySelectorAll(".row > div");
    const bt = document.querySelector("button");
    const h2 = document.querySelector("h2");

    

    //폭탄섞기 버튼처리
    bt.addEventListener("click", () => {
        //flag 변수 확인
        if (flag) {
            //배열 셔플
            arr.sort(() => Math.random() - 0.5);
            console.log(arr);
            
            //초기화
            init(boxs);
            h2.textContent = "폭탄을 피해 선택해 주세요";
            h2.style.color = "red";
            flag = false;
        }
    })
    
    //박스 클릭 처리
    boxs.forEach(element => {
        element.addEventListener('click', () => {
            //폭탄섞기가 되지 않았을 경우
            if(flag){
                h2.textContent = "폭탄을 섞어 주세요";
                h2.style.color = "blue";
                return;
            }

            let idx = parseInt(element.textContent);
            //이미지가 이미 있는 경우는 처리 안함
            if (isNaN(idx)) return;

            //해당 위치의 숫자가 0인지 1인지 확인
            if(arr[idx-1] === 0){
                //하트
                element.innerHTML = '<img src="./img/hart.png">';
                //하트선택개수
                cnt++;
                
                //성공처리
                if (cnt == 8) {
                    h2.textContent = "성공!!";
                    h2.style.color = "green";
                    const n = arr.indexOf(1);
                    const box = document.querySelector(`#box${n+1}`)
                    box.innerHTML = '<img src="./img/hart.png">';
                    
                    flag = true;
                    
                }
            }
            else {
                //폭탄
                element.innerHTML = '<img src="./img/boom.png" width = "90%">';
                h2.textContent = "실패! 폭탄을 섞어주세요.";
                h2.style.color = "blue";
                flag = true;
            }
            console.log(element.textContent);
        })
    })
})