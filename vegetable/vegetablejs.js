
axios.get('https://hexschool.github.io/js-filter-data/data.json')
  .then(function (response) {
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

//排序順序
let selectorSeq="";
//篩選條件
let selectorType="";
//用作物名稱搜尋
let searchText="";

/*
載入資料
*/
function renderData(){
  axios.get('https://hexschool.github.io/js-filter-data/data.json')
  .then(function (response) {
    let data=response.data;
    let showList=document.querySelector(".showList");
    let str="";

    //輸入文字搜尋
    if(searchText!=""){
      data=data.filter(function(item){
        return item["作物名稱"]==searchText;
      });
    };

    //改變排列順序
    if(selectorSeq!=""){
    data.sort(function(a,b){
      return a[selectorSeq]-b[selectorSeq];
    });
    };

    //篩選資料
    data.forEach(function(item,index){
        if(item["種類代碼"]==selectorType){
            str=str+`<tr><td>${item["作物名稱"]}</td>\
            <td>${item["市場名稱"]}</td>\
            <td>${item["上價"]}</td>\
            <td>${item["中價"]}</td>\
            <td>${item["下價"]}</td>\
            <td>${item["平均價"]}</td>\
            <td>${item["交易量"]}</td>\
            </tr>`;
            console.log(item["作物名稱"]);  
        }else if(selectorType==""){
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

//篩選條件方法
let btn=document.querySelectorAll(".btn");
btn.forEach(function(item,index){
    item.addEventListener("click",function(e){
      console.log("成功"+e.target.dataset.type);
      selectorType=e.target.dataset.type;
      renderData();
    });
});


//排序順序方法
let selector=document.querySelector(".sort-select");
selector.addEventListener("change",function(e){
  console.log(e.target.value);
  selectorSeq=e.target.value;
  renderData();
})

//用作物名稱搜尋
const searchbtn=document.querySelector(".search");
searchbtn.addEventListener("click",function(){
  let searchText1=document.querySelector(".rounded-end");
  searchText=searchText1.value.trim();
  renderData();
});
