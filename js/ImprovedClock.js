$(function(){
   
   $(".footer").click(function(){
      /*
       定义一个初始队列,记录当前页面中各值的访问位，默认都为0，
       当页面请求不发生缺页中断时，将相应数值改为1
       当发生缺页中断时按FIFO算法从头到尾遍历若为0直接替换
       若为1则把访问位改为0，暂不替换，继续向下循环
       若循环到队尾还没有访问位为0的则重新从头循环，即弹出队首即可
       */
      var Clocklist=new Array(0,0,0);
      /*
        定义一个模拟内存当前页面中各页的修改状态的数组
        当访问内存中已存在的页面时，随机产生一个0或1
        来记录当前值是否被修改
       */
      var Modifylist=new Array(0,0,0);
      //点击演绎先把页面清空
      $(".array-area span").empty();
      $(".showerea").empty();
      $(".footer h1").html("重新演绎")
      $(".result").html("");
      //定义进入内存的数组
      var curr_array=new Array("","","");
      //定义全局变量缺页次数
      var absendNum=0;
      /*
        根据局部性原理，生成三块元素,每块六个元素
        分别在6,12,18附近
       */
      var source_array=new Array(21);
      $.each(source_array,function(index,val){
        if(index<7){
           source_array[index]=Math.ceil(Math.random()*3);
        }else if(index>14){
           source_array[index]=Math.ceil(21-(Math.random()*3));
        }else{
           source_array[index]=Math.ceil(14-(Math.random()*3));
        }
        var arrayarea=$(".array-area span").text();
        $(".array-area span").text(arrayarea+source_array[index]+",");
      });
      //开始演绎替换
      $.each(source_array,function(index,val){
        /*先判断数组中是否有将要添加的值,如果有则不添加
           添加信号量isAbsend 判断是否缺页
           若不缺页则把缺页标志隐藏
         */
      setTimeout(function(){
        var isAbsend="block";
        //判断是否发生缺页中断
        $.each(curr_array,function(curindex,curval){
           if(source_array[index]==curr_array[curindex]){
            //找到已有数值的索引把相应的访问位设为1
            Clocklist[curindex]=1;  
            //随机生成一个0和1，模拟该页面是否被修改
            Modifylist[curindex]=Math.round(Math.random());
            isAbsend="none";
            //console.log(Clocklist);
           }
        });
        //发生缺页中断时执行
        if (isAbsend=="block") {
            /*
               改进型Clock算法需要遍历四次数组
               第一次寻找未访问并未修改的，第一次访问不修改数组
               若第一次未找到
               第二次寻找最近未访问但被修了的页面，第二次扫描后把所有的访问符都设为0
               第三次重新未访问未修改的
               第四次寻找未访问但被修改的就一定能找到
              */
             console.log("当前访问对列为"+Clocklist);
             console.log("当前修改对列为"+Modifylist);
             //第一次访问
              var First=true;
              var Second=true;
              var Three=true;
              for(var i=0;i<Clocklist.length;i++){
                console.log("执行第一次循环")
                if(Clocklist[i]==0&&Modifylist[i]==0){
                   console.log("第一次找到了")
                   curr_array.splice(i,1)
                   First=false;  
                   break;
                } 
              }
              //第二次访问
              if(First){
                 console.log("执行第二次循环")
                 for(var i=0;i<Clocklist.length;i++){
                  if(Clocklist[i]==0&&Modifylist[i]==1){
                    console.log("第二次找到了")
                     curr_array.splice(i,1)
                     Second=false;
                     break;
                  } else{
                     Clocklist[i]=0;
                  }
                }
              }
              //仍不满足第三次访问
              if(Second&First){
                console.log("执行第三次循环")
                for(var i=0;i<Clocklist.length;i++){
                  if(Clocklist[i]==0&&Modifylist[i]==0){
                     console.log("第三次找到了")
                     curr_array.splice(i,1)
                     Three=false;  
                     break;
                  } 
                }
              }
              //若都不满足执行第四次循环则一定能找到答案
              if(First&Second&Three){
                 console.log("执行第四次循环");
                 for(var i=0;i<Clocklist.length;i++){
                  if(Clocklist[i]==0&&Modifylist[i]==1){
                     console.log("第四次循环找到了")
                     curr_array.splice(i,1)
                     break;
                  } 
                }
              }
              curr_array.push(source_array[index]);
              console.log("当前数组元素为"+curr_array);
              
     
          
           
            absendNum=absendNum+1;
        }
            var showlistone=$("<div class=\"showlistone\">\r\n" + 
        "           <div class=\"enter\">\r\n" + 
        "             "+source_array[index]+"\r\n" + 
        "           </div>\r\n" + 
        "           <div class=\"list-one\">\r\n" + 
        "           "+curr_array[0]+"\r\n" + 
        "           </div>\r\n" + 
        "                <div class=\"list-one\">\r\n" + 
        "           "+curr_array[1]+"\r\n" + 
        "           </div>\r\n" + 
        "           <div class=\"list-one\">\r\n" + 
        "           "+curr_array[2]+"\r\n" + 
        "           </div>\r\n" + 
        "           <div class=\"quit\" style=\"display:"+isAbsend+"\">\r\n" + 
        "              x\r\n" + 
        "           </div>\r\n" + 
        "        </div>");
      $(".showerea").append(showlistone);
     },index*3000);
       
        //console.log(curr_array);

  });
      //输出演绎结果
      setTimeout(function(){
      var absendpercent=(absendNum/21)*100+"%"
      $(".result").html("本次演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"")
      },62000);
});

})