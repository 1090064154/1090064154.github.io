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
      var source_array=new Array(18);
      $.each(source_array,function(index,val){
        if(index<6){
           source_array[index]=Math.ceil(Math.random()*3);
        }else if(index>12){
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
           	isAbsend="none";
            console.log(Clocklist);
           }
      	});
        //发生缺页中断时执行
      	if (isAbsend=="block") {
	        	/*
               遍历访问符数组，若当前访问符为0则直接弹出
               若当前访问符为1，把当前访问符改为0，继续循环。  
             */
              //curr_array.push(source_array[index]);
              /*定义一个标识符,判断是否存在遍历一圈都为1的情况
              默认为flase,若有0表示发生了中断，设置为true
              若最后仍为true,则把栈顶元素弹出
              */
              var isBreak=true;
              console.log(Clocklist);
              for(var i=0;i<Clocklist.length;i++){
                if(Clocklist[i]==1){
                   console.log("发生替换了")
                   Clocklist[i]=0;
                }else{
                   curr_array.splice(i,1)
                   console.log("发生替换,跳出循环");
                   isBreak=false;
                   break;
                }
              }
              if(isBreak){
                curr_array.shift();
              }
              curr_array.push(source_array[index]);
              console.log("当前数组元素为"+curr_array);
              
     
          
           
	          absendNum=absendNum+1;
        }
            var showlistone=$("<div class=\"showlistone\">\r\n" + 
				"	       		<div class=\"enter\">\r\n" + 
				"	       			"+source_array[index]+"\r\n" + 
				"	       		</div>\r\n" + 
				"	       		<div class=\"list-one\">\r\n" + 
				"	       		"+curr_array[0]+"\r\n" + 
				"	       		</div>\r\n" + 
				"                <div class=\"list-one\">\r\n" + 
				"	       		"+curr_array[1]+"\r\n" + 
				"	       		</div>\r\n" + 
				"	       		<div class=\"list-one\">\r\n" + 
				"	       		"+curr_array[2]+"\r\n" + 
				"	       		</div>\r\n" + 
				"	       		<div class=\"quit\" style=\"display:"+isAbsend+"\">\r\n" + 
				"	       		   x\r\n" + 
				"	       		</div>\r\n" + 
				"	       </div>");
		  $(".showerea").append(showlistone);
		 },index*3000);
       
        //console.log(curr_array);

  });
      //输出演绎结果
      setTimeout(function(){
      var absendpercent=(absendNum/18)*100+"%"
      $(".result").html("本次演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"")
      },62000);
});
  





})