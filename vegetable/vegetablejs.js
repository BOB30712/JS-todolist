let data=[];


axios.get('https://hexschool.github.io/js-filter-data/data.json')
  .then(function (response) {
    //經過此步驟才能使用match方法去篩選搜尋文字，避免出現null
    //data = response.data.filter((i) => i["種類代碼"] && i["作物名稱"].trim());
    data = response.data.filter(function(item){
      return item["作物名稱"]!=null;
    })
    let showList=document.querySelector(".showList");
    let str="";

    data.sort(function(a,b){
      return a["交易量"]-b["交易量"];
    });

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
        };
    })
    showList.innerHTML=str;
  });

//排序順序
let selectorSeq="交易量";
//篩選條件
let selectorType="";
//用作物名稱搜尋
let searchText="";

/*
載入資料
*/
function renderData(data){
    //let data=response.data;
    let showList=document.querySelector(".showList");
    let str="";

    //輸入文字搜尋
    if(searchText!=""){
      data = data.filter((i) => i["作物名稱"].match(searchText));
    };

    //改變排列順序
    if(selectorSeq==""){
      data.sort(function(a,b){
      return a["交易量"]-b["交易量"];
    })}else{
      data.sort(function(a,b){
      return a[selectorSeq]-b[selectorSeq];
    })};

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
        }else if(selectorType==""){
          str=str+`<tr><td>${item["作物名稱"]}</td>\
            <td>${item["市場名稱"]}</td>\
            <td>${item["上價"]}</td>\
            <td>${item["中價"]}</td>\
            <td>${item["下價"]}</td>\
            <td>${item["平均價"]}</td>\
            <td>${item["交易量"]}</td>\
            </tr>`;
        };
    });
    showList.innerHTML=str;
  
};

//篩選條件方法
const btn=document.querySelectorAll(".btn");
btn.forEach(function(item,index){
    item.addEventListener("click",function(e){
      let btns = document.querySelectorAll(".button-group button");
      btns.forEach((i) => {
        i.classList.remove("active");
      });
      selectorType=e.target.dataset.type;
      e.target.classList.add("active");

      /*
      let searchText1=document.querySelector(".rounded-end");
      searchText1.value="";
      searchText="";
      */

      //重置順序排序改回由交易量排序
      const select = document.querySelector('.sort-select');
      select.value = "交易量";
      selectorSeq = "交易量";

      renderData(data);
    });
});


//排序順序方法
const selector=document.querySelector(".sort-select");
selector.addEventListener("change",function(e){
  selectorSeq=e.target.value;
  renderData(data);
})

//用作物名稱搜尋
const searchbtn=document.querySelector(".search");
searchbtn.addEventListener("click",function(){
  let searchText1=document.querySelector(".rounded-end");
  searchText=searchText1.value.trim();

  //重置順序排序改回由交易量排序
  const select = document.querySelector('.sort-select');
  select.value = "交易量";
  selectorSeq = "交易量";

  renderData(data);
});


//透過js-sort-advanced區域去進行排序
const advanced=document.querySelector(".js-sort-advanced tr");
advanced.addEventListener("click",function(e){
  changeSelect(e.target.dataset.select);  
})


//改變js-select選單
function changeSelect(item){
  let selects= document.querySelectorAll(".sort-select option");
  selects.forEach((i) => {
    if(i.value==item){
      const select = document.querySelector('.sort-select');
      select.value = item;
      selectorSeq=item;
      renderData(data);
    };
  });
};

