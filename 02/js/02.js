/* function 키워드로 함수 생성
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("ah1").innerHTML = "Hello javaScript";
});

function hello() {
    console.log("Hello js!");
}
*/

//화살표 함수
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ah1").innerHTML = "Hello javaScript!!";
});

const hello = () => {
    console.log("Hello js!!");
}