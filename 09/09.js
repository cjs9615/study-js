let juso;       //전체주소
let si;         //시
let gu;         //구
let dong;       //동

//시설유형
let equptype = {
    "노인시설":"001",
    "복지회관":"002",
    "마을회관":"003", 
    "보건소":"004",
    "주민센터":"005",
    "면동사모소":"006",
    "종교시설":"007",
    "금융기관":"008", 
    "정자":"009", 
    "공원":"010", 
    "정자 파고라":"011",
    "공원":"012", 
    "교량하부":"013", 
    "나무그늘":"014", 
    "하천둔치":"015", 
    "기타":"099"
};

//select박스 지우기
const removeOption = (s, first) => {
    while (s.hasChildNodes()){
        s.removeChild(s.firstChild);
    }
    const option = document.createElement("option");
    option.value = "";
    option.text = first;
    s.appendChild(option);
}

//select박스 채우기
//d : data, s: select box
const addOption = (d, s) => {
    for(let [k, v] of Object.entries(d)){
        const option = document.createElement("option");
        option.value = v;
        option.text = k;
        s.appendChild(option);
    }
}

//주소정보 가져오기
const getJuso = async (sel1) => {
    const resp = await fetch("juso2023.json");
    const data = await resp.json();

    juso = data;

    si = {};

    juso.forEach(element => {
        let {시도명칭, 시도코드} = element;

        if(!si[시도명칭]){
            si[시도명칭] = 시도코드;
        }
    });

    addOption(si, sel1);   
}

//무더위 쉼터 정보가져오기
const getData = async(cd, etype, h2, viewTb) => {
    let key = "ewEZSCK5Wyu9bQtvqiyfNO7gZQ097cEFt4Vf7SYjop4Ba3etdnHJdvXHv4sEg0AcsMhQzVCOLocFZw5yhgnrgg%3D%3D";
    let pageNo = 1;
    let numOfRows = 10;
    let type = "json";
    let year = 2023;
    let url = `https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2`;
    url = url + `?serviceKey=${key}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=${type}&year=${year}&areaCd=${cd}&equptype=${etype}`;
    
    const resp = await fetch(url);
    const data = await resp.json();

    if(data["RESULT"] !== undefined){
        h2.innerHTML = `<span class='h2Sel1'>${data["RESULT"]["resultMsg"]}</span>`;
        return;
    }
    let HeatWaveShelterList = data.HeatWaveShelter[1].row;
    let conTag = `<table>
            <thead>
                <tr>
                    <th scope="col">쉼터명</th>
                    <th scope="col">주소</th>
                    <th scope="col">이용가능인원수</th>
                </tr>
            </thead>`;
    conTag = conTag + '<tbody>';
    for (let item of HeatWaveShelterList) {
        conTag = conTag + '<tr>';
        conTag = conTag + `<td>${item.restname}</td>`;
        conTag = conTag + `<td>${item.restaddr}</td>`;
        conTag = conTag + `<td>${item.usePsblNmpr}</td>`;
        conTag = conTag + '</tr>';
    }
    conTag = conTag + "</tbody></table>";
    viewTb.innerHTML = conTag;
} 

document.addEventListener("DOMContentLoaded", () => {
    const sel1 = document.querySelector("#sel1");
    const sel2 = document.querySelector("#sel2");
    const sel3 = document.querySelector("#sel3");
    const sel4 = document.querySelector("#sel4");
    const bt = document.querySelector("#bt");
    const h2 = document.querySelector("h2");
    const viewTb = document.querySelector("#viewTb");

    //시 정보
    getJuso(sel1);

    //구 정보
    sel1.addEventListener("change", () => {
        gu = {};

        juso
        .filter(item => item["시도코드"] === sel1.value)
        .map(item => {
            let {시군구코드, 시군구명칭} = item;
            if (!gu[시군구명칭]) 
                gu[시군구명칭] = 시군구코드;
        })

        removeOption(sel2, "--구선택--");
        removeOption(sel3, "--동선택--");
        removeOption(sel4, "--시설유형--");      
        addOption(gu, sel2);
         
    })
    
    //동 정보
    sel2.addEventListener("change", () => {
        dong = {};

        juso
        .filter(item => item["시도코드"] === sel1.value &&
                        item["시군구코드"] === sel2.value)
        .map(item => {
            let {읍면동코드, 읍면동명칭} = item;
            if (!dong[읍면동명칭]) 
                dong[읍면동명칭] = 읍면동코드;
        })
        removeOption(sel3, "--동선택--");
        removeOption(sel4, "--시설유형--");   
        addOption(dong, sel3);  
    })

    //시설 유형 정보
    sel3.addEventListener("change", () => {

        removeOption(sel4, "--시설유형--");  
        addOption(equptype, sel4);   
    })

    //확인 버튼
    bt.addEventListener("click", (e) => {
        //form 기본 이벤트 처리 안함
        e.preventDefault();

        if(sel1.value == ""){
            h2.innerHTML = `<span class='h2Sel1'>시를 선택해 주세요.</span>`;
            return;
        }
        if(sel2.value == ""){
            h2.innerHTML = `<span class='h2Sel1'>구를 선택해 주세요.</span>`;
            return;
        }
        if(sel3.value == ""){
            h2.innerHTML = `<span class='h2Sel1'>동을 선택해 주세요.</span>`;
            return;
        }
        if(sel4.value == ""){
            h2.innerHTML = `<span class='h2Sel1'>시설유형을 선택해 주세요.</span>`;
            return;
        }

        //지역코드

        let areaCd = `${sel1.value}${sel2.value}${sel3.value}00`;
        h2.innerHTML = "";
        viewTb.innerHTML = "";
        getData(areaCd, sel4.value, h2, viewTb);

    })

    
})






