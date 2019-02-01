$(function(){
   //定义20位随机数组
   var source_array=new Array(20);
   //定义进入内存的数组
   var curr_array=new Array("","","");
   $(".footer").click(function(){
      //点击演绎先把页面清空
      $(".array-area span").empty();
      $(".showerea").empty();
      $(".footer h1").html("重新演绎")
      $(".result").html("");
      //定义全局变量缺页次数
      var absendNum=0;
      //生成一个20位的随机数组
      $.each(source_array,function(index,val){
        var arrayarea=$(".array-area span").text();
        source_array[index]=Math.ceil(Math.random()*10);
        $(".array-area span").text(arrayarea+source_array[index]+",");
      });
      //开始演绎替换
      $.each(source_array,function(index,val){
        /*先判断数组中是否有将要添加的值,如果有则不添加
          数组前三位直接添加
          超过三位从数组头部弹出一位
          置换最先进入的数值
         */
        /*
           添加信号量isAbsend 判断是否缺页
           若不缺页则把缺页标志隐藏
         */
      setTimeout(function(){
        var isAbsend="block";
        $.each(curr_array,function(curindex,curval){
           if(source_array[index]==curr_array[curindex]){
            isAbsend="none";
           }
        });
        if (isAbsend=="block") {
            /*
              发生缺页时，调用最佳置换算法选择要淘汰的页码
             */
            //console.log(source_array[index]);
            var spliceIndex=Optimal(index);
            //console.log(spliceIndex);
            curr_array.splice(spliceIndex,1);
            curr_array.push(source_array[index]);
           // curr_array.shift();
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
      var absendpercent=Math.ceil((absendNum/20)*100)+"%"
      $(".result").html("本次演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"")
      },62000);
   })
    //最佳置换算法
    function Optimal(currentIndex){
      //分别获取当前数组中在后面最早出现的索引值
      var remain_array=source_array.slice(currentIndex);
      var first_index=$.inArray(curr_array[0],remain_array);
      var second_index=$.inArray(curr_array[1],remain_array);
      var three_index=$.inArray(curr_array[2],remain_array);
      var indexlist=new Array(first_index,second_index,three_index);
      //定义要替换的索引值
      var replacevalue;
      //console.log(curr_array);
      if(first_index==-1|| second_index==-1 || three_index==-1){
       replacevalue=-1;
      }else{
      replacevalue=Math.max.apply(null,indexlist);
      }
      //找到要替换的索引值在curr_array中的索引值
      //console.log("要替换的值"+replacevalue);
     // console.log(indexlist);
      var finalIndex=$.inArray(Number(replacevalue),indexlist);
      //console.log("最总索引值"+finalIndex);

      return finalIndex;
    }




})