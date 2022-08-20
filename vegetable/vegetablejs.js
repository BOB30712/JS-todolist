

const test =document.querySelector(".search");

test.addEventListener("click",function(e){
    alert("測試成功");
})

let d=[];
d.forEach(function(){
    
})

axios.get('https://hexschool.github.io/js-filter-data/data.json')
  .then(function (response) {
    //console.log(response.data);
    //console.log(response.status);
    //console.log(response.statusText);
    //console.log(response.headers);
    //console.log(response.config);
    let data=response.data;
    let showList=document.querySelector(".showList");
    let str="";
    data.forEach(function(item,index){
        if(item["種類代碼"]!="椰子"){
            str=str+`<tr><td>${item["作物名稱"]}</td>\
            <td>${item["市場名稱"]}</td>\
            <td>${item["上價"]}</td>\
            <td>${item["中價"]}</td>\
            <td>${item["下價"]}</td>\
            <td>${item["平均價"]}</td>\
            <td>${item["交易量"]}</td>\
            </tr>`;
            console.log(item["作物名稱"]);  
        };
    })
    showList.innerHTML=str;
  });

/*
載入資料
type辨識種類代碼
*/
function enterdata(type){
  axios.get('https://hexschool.github.io/js-filter-data/data.json')
  .then(function (response) {
    //console.log(response.data);
    //console.log(response.status);
    //console.log(response.statusText);
    //console.log(response.headers);
    //console.log(response.config);
    let data=response.data;
    let showList=document.querySelector(".showList");
    let str="";

    //改變排列順序
    data.sort(function(a,b){
      return a["上價"]-b["上價"];
    });
    //篩選資料
    data.forEach(function(item,index){
        if(item["種類代碼"]==type){
            str=str+`<tr><td>${item["作物名稱"]}</td>\
            <td>${item["市場名稱"]}</td>\
            <td>${item["上價"]}</td>\
            <td>${item["中價"]}</td>\
            <td>${item["下價"]}</td>\
            <td>${item["平均價"]}</td>\
            <td>${item["交易量"]}</td>\
            </tr>`;
            console.log(item["作物名稱"]);  
        }else if(type==""){
          str=str+`<tr><td>${item["作物名稱"]}</td>\
            <td>${item["市場名稱"]}</td>\
            <td>${item["上價"]}</td>\
            <td>${item["中價"]}</td>\
            <td>${item["下價"]}</td>\
            <td>${item["平均價"]}</td>\
            <td>${item["交易量"]}</td>\
            </tr>`;
            console.log(item["作物名稱"]);  
        };
    });
    showList.innerHTML=str;
  });

}

let btn=document.querySelectorAll(".btn");
btn.forEach(function(item,index){
    item.addEventListener("click",function(e){
      console.log("成功"+e.target.dataset.type);
      enterdata(e.target.dataset.type);
    });
});

let selector=document.querySelector(".sort-select");

selector.addEventListener("change",function(e){
  console.log(e.target.value);
})