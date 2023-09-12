const show = (movieCd) => {
    console.log(movieCd);
    const detail = document.querySelector(".detail");
    let apikey = "f5eef3421c602c6cb7ea224104795888";
    let url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json"
    url = url + `?key=${apikey}`;
    url = url + `&movieCd=${movieCd}`;

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            //let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            const info = data.movieInfoResult.movieInfo;
            let conTag = `<table>
                    <thead>
                        <tr>
                            <th scope="col">영화명</th>
                            <th scope="col">제작연도</th>
                            <th scope="col">상영시간</th>
                            <th scope="col">개봉연도</th>
                            <th scope="col">영화유형명</th>
                        </tr>
                    </thead>`;

            conTag = conTag + '<tbody>';
            conTag = conTag + '<tr>';
            conTag = conTag + `<td>${info.movieNm}</td>`;
            conTag = conTag + `<td>${info.prdtYear}</td>`;
            conTag = conTag + `<td>${info.showTm}</td>`;
            conTag = conTag + `<td>${info.openDt}</td>`;
            conTag = conTag + `<td>${info.typeNm}</td>`;
            conTag = conTag + '</tr>';
            conTag = conTag + "</tbody></table>";
            detail.innerHTML = conTag;
        })
        .catch((err) => console.log(err));
}

const getData = (dt, divCon, sel1) => {
    //데이터가져오기
    let apikey = "f5eef3421c602c6cb7ea224104795888";
    let tDt = dt.value.replaceAll("-", "");
    let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
    url = url + `?key=${apikey}`;
    url = url + `&targetDt=${tDt}`;

    if (sel1.value !== "A") {
        url = url + `&multiMovieYn=${sel1.value}`;
    }

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            // let conTag = "<ul>";
            // for(let item of dailyBoxOfficeList) {
            //     conTag = conTag + `<li>${item.movieNm}</li>`;
            //     console.log(item.movieNm);
            // }
            // conTag = conTag + "</ul>";
            // divCon.innerHTML = conTag;
            let conTag = `<table>
                    <thead>
                        <tr>
                            <th scope="col">순위</th>
                            <th scope="col">영화명</th>
                            <th scope="col">개봉일</th>
                            <th scope="col">매출액</th>
                            <th scope="col">누적매출액</th>
                            <th scope="col">관객수</th>
                            <th scope="col">누적관객수</th>
                        </tr>
                    </thead>`;

            conTag = conTag + '<tbody>';
            for (let item of dailyBoxOfficeList) {
                conTag = conTag + '<tr>';
                conTag = conTag + `<td>${item.rank}</td>`;
                conTag = conTag + `<td><div class = "grid"><div><a href="#" onclick="show(${item.movieCd})">${item.movieNm}</a></div>`;
                if (parseInt(item.rankInten) === 0) {
                    conTag = conTag + `<div class = "rankzero">-</div></div>`;
                }
                else if (parseInt(item.rankInten) > 0) {
                    conTag = conTag + `<div class = "rankplus">+${item.rankInten}</div></div>`;
                }
                else {
                    conTag = conTag + `<div class = "rankminus">${item.rankInten}</div></div>`;
                }
                conTag = conTag + `</td>`;
                conTag = conTag + `<td>${item.openDt}</td>`;
                conTag = conTag + `<td>${item.salesAmt}</td>`;
                conTag = conTag + `<td>${item.salesAcc}</td>`;
                conTag = conTag + `<td>${item.audiCnt}</td>`;
                conTag = conTag + `<td>${item.audiAcc}</td>`;
                conTag = conTag + '</tr>';
            }
            conTag = conTag + "</tbody></table>";
            divCon.innerHTML = conTag;


        })
        .catch((err) => console.log(err));
}


document.addEventListener("DOMContentLoaded", () => {
    const dt = document.querySelector("#dt1");
    const divCon = document.querySelector("#divCon");
    const sel1 = document.querySelector("#sel1");

    //날짜 변경시 날짜 가져오기
    dt.addEventListener("change", () => {
        getData(dt, divCon, sel1);
    })

    //영화구분
    sel1.addEventListener("change", () => {
        if (!dt.value) return;
        getData(dt, divCon, sel1);
        let url = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2";
        let key = "?serviceKey=ewEZSCK5Wyu9bQtvqiyfNO7gZQ097cEFt4Vf7SYjop4Ba3etdnHJdvXHv4sEg0AcsMhQzVCOLocFZw5yhgnrgg%3D%3D";
        let option = "&pageNo=1&numOfRows=10&type=json&year=2023";
        let areaCd = "&areaCd=";
        url = url + key + option;
        &equptype=001
    })
})

