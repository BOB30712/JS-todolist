let data=[];



function inputdata(arry){
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
function logindata(arry,status){
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
    inputdata(datastatus);
};

/*
比對資料狀態
*/
function checkstatus(arry){
    let tabrange="";
    let tabs = document.querySelectorAll(".tab li");
    let box=document.querySelectorAll('.checkbox  input[type="checkbox"]');
    tabs.forEach(function(i){
        //console.log(i.dataset.range+" "+box);
        tabrange=i.dataset.range;
    });
    console.log(arry);
    console.log(box);
    box.forEach(function(item,index){
        item.checked=arry[index].status;
    });
}

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
    logindata(data,e.target.dataset.range);
});

/*
切換狀態
*/
const test=document.querySelector(".list");
test.addEventListener("click",function(e){
    let id = e.target.closest("li").dataset.id;
    if(e.target.getAttribute("class")=="delete"){
        console.log("刪除資料");
        let index = data.findIndex((i) => i.id == id);
        data.splice(index, 1);
        console.log("刪除資料"+id+index);
    }else{
        data.forEach(function(item){
            if(item.id==id){
                if(item.status==""){
                    item.status="checked";
                }else{
                    item.status="";
                };
            };
        });
    };
    logindata(data,selecttab);
    countdata(data);
});

/*
新增資料
*/
const inputtext=document.querySelector(".input input");
const inputbtn=document.querySelector(".input a");
inputbtn.addEventListener("click",function(){
    if(inputtext.value!=""){
        let inputdata={};
        inputdata.id=new Date().getTime();;
        inputdata.text=inputtext.value;
        inputdata.status="";
        data.push(inputdata);
        inputtext.value="";
    }else{
        alert("請輸入待辦事項");
    };
    logindata(data,selecttab);
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
    data.forEach(function(item,index){
        if(item.status=="checked"){
            data.splice(index, 1);
        };
    });
    logindata(data,selecttab);
});