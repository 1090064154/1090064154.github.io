$(function(){
   
   $(".footer").click(function(){
   	  //点击演绎先把页面清空
   	  $(".array-area span").empty();
      $(".showerea").empty();
      $(".footer h1").html("重新演绎")
      $(".result").html("");
   	  //定义进入内存的数组
      var curr_array=new Array("","","");
      //定义全局变量缺页次数
      var absendNum=0;
      //生成一个25位的随机数组
      var source_array=new Array(20);
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
	      	if(curr_array.length<3){
	            curr_array.push(source_array[index]);
	      	}else{
	        	curr_array.push(source_array[index]);
	        	curr_array.shift();
	        }
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
      var absendpercent=(absendNum/20)*100+"%"
      $(".result").html("本次演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"")
      },62000);
   })
  





})