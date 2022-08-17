
let data=[
    {
        dataindex:"",
        text:"新增的代辦事項1",
        class:"checkbox",
        type:false
    },
    {
        dataindex:"",
        text:"新增的代辦事項2",
        class:"checkbox",
        type:true
    },
    {
        dataindex:"",
        text:"新增的代辦事項3",
        class:"checkbox",
        type:false
    },
    {
        dataindex:"",
        text:"新增的代辦事項4",
        class:"checkbox",
        type:false
    },
    {
        dataindex:"",
        text:"新增的代辦事項5",
        class:"checkbox",
        type:true
    }
]

let addnewdata="";

data.forEach(function(item){
    addnewdata=addnewdata+`<li><label class="checkbox" for=""><input type="checkbox" value="完成"  /><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
})

const newdata=document.querySelector(".list");

newdata.innerHTML=newdata.innerHTML+addnewdata;
alert


/*
載入資料
*/
function inputdata(data,table){
    let input="";
    table.innerHTML="";
    data.forEach(function(item){
    input=input+`<li><label class="checkbox" for=""><input type="checkbox" value="完成"  /><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
    table.innerHTML=input;
    let box=document.querySelectorAll('.checkbox  input[type="checkbox"]');
    box.forEach(function(item,index){
        item.checked=data[index].type;
    });
    });
};


/*
資料篩選結果
*/
const checkbox=document.querySelectorAll('.checkbox  input[type="checkbox"]');
//checkbox.checked=true; 改變check狀態
function checkdatatype(){
    checkbox.forEach(function(item,index){
        data[index].dataindex=index;
        if(data[index].type==true){
            item.checked=true;
        }else{
            item.checked=false;
        };
    });
};
checkdatatype();

//刪除資料(透過點擊索引位置)
function del(data){
let deletedata=document.querySelectorAll('.delete');
deletedata.forEach(function(item,index){
    deletedata[index].addEventListener("click",function(){
        console.log("成功"+"刪除第"+index+"資料");
        data.splice(index,1);
        console.log(data);
        inputdata(data,newdata);
        del(data);
    });
});
checktype(data);
};
del(data);

//刪除資料(透過資料名稱比對)
function del2(data1,data2){
let deletedata=document.querySelectorAll('.delete');
let data3=[];
deletedata.forEach(function(item,index){
    deletedata[index].addEventListener("click",function(){
        console.log("成功"+"刪除第"+index+"資料");
        data3=data2[index];
        console.log(data2);
        data1.forEach(function(item2,index2){
            if(item2.text==data3.text){
                data1.splice(index2,1);
                data2.splice(index,1);
            };
        });
        inputdata(data2,newdata);
        del2(data1,data2);
    });
});
};


//確認目前點擊位置
function checktype(arry){
    let box=document.querySelectorAll('.checkbox  input[type="checkbox"]');
    box.forEach(function(item,index){
        box[index].addEventListener("change",function(){
            console.log(index+"被改變");
            arry[index].type=item.checked;
        });
    });
};
checktype(data);

/*
檢視全部、代辦、完成的項目
*/
const tab=document.querySelector(".tab");
tab.addEventListener("click",function(e){
    console.log(e.target.textContent);
   // li標籤無法使用字串，只能使用數字
   if(e.target.textContent=="全部"){
        tab.innerHTML='<li class="active">全部</li><li>待完成</li> <li>已完成</li>';
        addnewdata="";
        newdata.innerHTML="";
        //載入資料
        data.forEach(function(item){
        addnewdata=addnewdata+`<li><label class="checkbox" for=""><input type="checkbox" value="完成"  /><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
        });
        newdata.innerHTML=newdata.innerHTML+addnewdata;
        let checkbox2=document.querySelectorAll('.checkbox  input[type="checkbox"]');
        checkbox2.forEach(function(item,index){
            if(data[index].type==true){
                item.checked=true;
            }else{
                item.checked=false;
            };
        });
        console.log(data);
        //監聽狀態是否有變更
        checktype(data);
        //刪除物件
        del(data);
        count(data);

    }else if(e.target.textContent=="待完成"){
        tab.innerHTML='<li>全部</li><li class="active">待完成</li> <li>已完成</li>';
        addnewdata="";
        newdata.innerHTML="";
        let data2=[];
        data.forEach(function(item){
            if(item.type==false){
            addnewdata=addnewdata+`<li><label class="checkbox" for=""><input type="checkbox" value="完成"  /><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
            data2.push(item);
            };
        });
        newdata.innerHTML=newdata.innerHTML+addnewdata;
        let checkbox2=document.querySelectorAll('.checkbox  input[type="checkbox"]');
        checkbox2.forEach(function(item,index){
            if(data2[index].type==true){
                item.checked=true;
            }else{
                item.checked=false;
            };
        });
        console.log(data2);
        //監聽狀態是否有變更
        checktype(data2);
        /*
        list.addEventListener("click",function(e){
            checkbox2.forEach(function(item,index){
                if(data2[index].type!=checkbox2[index].checked){
                    data2[index].type=checkbox2[index].checked;
                    console.log(`${data2[index].text}的type更換成${checkbox2[index].checked}`);
                }else{
                    return;
                }
            });
        });
        */
        del2(data,data2);
        count(data);
    }else if(e.target.textContent=="已完成"){
        tab.innerHTML='<li >全部</li><li>待完成</li> <li class="active">已完成</li>';
        addnewdata="";
        newdata.innerHTML="";
        let data2=[];
        data.forEach(function(item,index){
            if(item.type==true){
            addnewdata=addnewdata+`<li><label class="checkbox" for=""><input type="checkbox" value="完成"  /><span>${item.text}</span></label><a href="#" class="delete"></a></li>`;
            data2.push(item);
            };
        });
        newdata.innerHTML=newdata.innerHTML+addnewdata;
        let checkbox2=document.querySelectorAll('.checkbox  input[type="checkbox"]');
        checkbox2.forEach(function(item,index){
            if(data2[index].type==true){
                item.checked=true;
            }else{
                item.checked=false;
            };
        });
        console.log(data2);
        //監聽狀態是否有變更
        checktype(data2);
        /*
        list.addEventListener("click",function(e){
            checkbox2.forEach(function(item,index){
                if(data2[index].type!=checkbox2[index].checked){
                    data2[index].type=checkbox2[index].checked;
                    console.log(`${data2[index].text}的type更換成${checkbox2[index].checked}`);
                }else{
                    return;
                }
            });
        });
        */
        del2(data,data2);
        count(data);
    };
});

/*
計算目前顯示的資料總數
*/
function count(data){
    let num=0;
    let list_footer=document.querySelector(".list_footer p");
    data.forEach(function(item){
        if(item.type==false){
            num++;
        }
    });
    list_footer.innerHTML=`${num}個待完成項目`;
};
count(data);

/*
刪除所有已完成資料
*/
const daleteall=document.querySelector(".list_footer a");
daleteall.addEventListener("click",function(){
    data=data.filter(item => item.type==false);
    inputdata(data,newdata);
    del(data);
});


/*
新增資料
*/
const inputtext=document.querySelector(".input input");
const inputbtn=document.querySelector(".input a");
inputbtn.addEventListener("click",function(){
    if(inputtext.value!=""){
        let inputdata={};
        inputdata.dataindex="";
        inputdata.text=inputtext.value;
        inputdata.type=false;
        data.push(inputdata);
        inputtext.value="";
    }else{
        alert("請輸入待辦事項");
    };
    inputdata(data,newdata);
});
















