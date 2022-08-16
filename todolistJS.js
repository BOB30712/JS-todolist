
const data=[
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

/*
資料篩選結果
*/

const list=document.querySelector(".list");
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

function changetype(inputdata,inputcheckbox){
    
}

//確認目前點擊位置
function checktype(arry){
list.addEventListener("click",function(e){
    console.log(e.target.checked);
    checkbox.forEach(function(item,index){
        if(arry[index].type!=checkbox[index].checked){
            arry[index].type=checkbox[index].checked;
            console.log(arry[index]);
        }else{
            return;
        };
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
        list.addEventListener("click",function(e){
            checkbox2.forEach(function(item,index){
                if(data[index].type!=checkbox2[index].checked){
                    data[index].type=checkbox2[index].checked;
                    console.log(`${data[index].text}的type更換程${checkbox2[index].checked}`);
                }else{
                    console.log("失敗");
                }
            });
        });
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
        list.addEventListener("click",function(e){
            checkbox2.forEach(function(item,index){
                if(data2[index].type!=checkbox2[index].checked){
                    data2[index].type=checkbox2[index].checked;
                    console.log(`${data2[index].text}的type更換程${checkbox2[index].checked}`);
                }else{
                    console.log("失敗");
                }
            });
        });
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
        list.addEventListener("click",function(e){
            checkbox2.forEach(function(item,index){
                if(data2[index].type!=checkbox2[index].checked){
                    data2[index].type=checkbox2[index].checked;
                    console.log(`${data2[index].text}的type更換程${checkbox2[index].checked}`);
                }else{
                    console.log("失敗");
                }
            });
        });
    }
});














