let data=[];



function renderData(arry){
    let newdata=document.querySelector(".list");
    let addnewdata="";
    arry.forEach(function(item){
        addnewdata=addnewdata+`<li data-id=${item.id}><label class="checkbox"><input type="checkbox"  data-status=${item.status} ${item.status}/><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
    });
    newdata.innerHTML=addnewdata;
}
/*
載入資料
*/
function filterData(arry,status){
    let datastatus=[];
    if(status=="all"){
        arry.forEach(function(item){
            datastatus.push(item);
            //addnewdata=addnewdata+`<li data-id=${item.id}><label class="checkbox"><input type="checkbox"  data-status=${item.status} ${item.status}/><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
        });
    }else if(status=="undone"){
        arry.forEach(function(item){
            if(item.status==""){
                datastatus.push(item);
                //addnewdata=addnewdata+`<li data-id=${item.id}><label class="checkbox"><input type="checkbox" data-status=${item.status} ${item.status}/><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
            };
        });
    }else if(status=="finish"){
        arry.forEach(function(item){
            if(item.status=="checked"){
                datastatus.push(item);
                //ddnewdata=addnewdata+`<li data-id=${item.id}><label class="checkbox"><input type="checkbox" data-status=${item.status} ${item.status}/><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
            };
        });
    };
    renderData(datastatus);
};

/*
切換tab
*/
let selecttab="all";
const tab=document.querySelector(".tab");
tab.addEventListener("click",function(e){
    selecttab=e.target.dataset.range;
    let tabs = document.querySelectorAll(".tab li");
    tabs.forEach((i) => {
        i.classList.remove("active");
      });
    e.target.classList.add("active");
    filterData(data,e.target.dataset.range);
});

/*
切換狀態
*/
const list=document.querySelector(".list");
list.addEventListener("click",function(e){
    let id = e.target.closest("li").dataset.id;
    if(e.target.getAttribute("class")=="delete"){
        let index = data.findIndex((i) => i.id == id);
        data.splice(index, 1);
    }else{
        data.forEach(function(item){
            if(item.id!=id){
                return;
            };

            if(item.status==""){
                item.status="checked";
            }else{
                item.status="";
            };
        });
    };
    filterData(data,selecttab);
    countdata(data);
});

/*
新增資料
*/
const inputtext=document.querySelector(".input input");
const inputbtn=document.querySelector(".input a");
inputbtn.addEventListener("click",function(){
    if(inputtext.value.trim()!=""){
        let inputdata={};
        inputdata.id=new Date().getTime();;
        inputdata.text=inputtext.value.trim();
        inputdata.status="";
        data.push(inputdata);
        inputtext.value="";
    }else{
        alert("請輸入待辦事項");
    };
    
    //將頁籤切回全部
    let tabs2 = document.querySelectorAll(".tab li");
    tabs2.forEach((i) => {
        if(i.dataset.range!="all"){
            i.classList.remove("active");
        }else{
            i.classList.add("active");
        }
      });
    selecttab="all";
    filterData(data,selecttab);
    countdata(data);
});

/*
顯示待辦事項數量
*/
const count=document.querySelector(".list_footer p");
function countdata(arry){
    let num=0;
    arry.forEach(function(item){
        if(item.status==""){
            num++;
        }
    })
    count.textContent=num+"個待完成事項";
};
countdata(data);

/*
刪除所有已完成資料
*/
const delfinishdata=document.querySelector(".list_footer a");
delfinishdata.addEventListener("click",function(e){

    data=data.filter(function(i){
        return i.status=="";
    });
    
    filterData(data,selecttab);
});