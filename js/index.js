$(function(){
	var source_array;
	//用户自定义数组长度
	var arraylength;
	//用户自定义速度
	var velocity;
	/*
	  定义一个演绎过程的信号量
	  使在演绎过程中不能切断演绎，只能有一个算法在演绎
	 */
	var course_Timeout=0;
	//生成数组
	$("#createdata").click(function(){  
	  //获取数组长度
	  arraylength=$("#length").val();
	  source_array=new Array(Number(arraylength));
	 // console.log(source_array.length/2);
      //生成数组前先把上回生成的数组清空
   	  $(".array-area span").empty();
      /*
        根据局部性原理，生成两块元素
       */
      $.each(source_array,function(index,val){
        if(index<source_array.length/2){
           source_array[index]=Math.ceil(Math.random()*10);
        }else{
           source_array[index]=Math.ceil((Math.random()*10)+10);
        }
        var arrayarea=$(".array-area span").text();
        $(".array-area span").text(arrayarea+source_array[index]+",");
      });
      //按钮文本改为重新生成
      $(this).html("重新生成");
	});
	$(".footer").click(function(){
		/*
		  如果此时正有算法在演绎，必须等上一个算法演绎完毕才能开始新的演绎
		 */
		 console.log(course_Timeout);
         if(course_Timeout>0){
           clearTimeout(course_Timeout)
           return;
         }

		//获取用户自定义速度
		velocity=(10-$("#velocity").val())*1000;
        //console.log(velocity);
	    //判断此时是否已生成数组
	   var Isarray=$(".array-area span").html();
	   if(Isarray){
	       var arithmetic=$("#arithmetic").val();
	       switch(arithmetic){
	       	case "Optimal":
	       	   Optimal();
	       	break;
	       	case "FIFO":
	       	   FIFO();
	       	break;
            case "LRU":
	       	   LRU();
	       	break;
	       	case "Clock":
	       	   Clock();
	       	break;
            case "ImprovedClock":
	       	   ImprovedClock();
	       	break;
	       }
	   }
	});

    //最佳置换方法
     function Optimal(){
	     //先把页面清空
	     $(".showerea").empty();
	     $(".result").html("");
	     //定义进入内存的数组
	     var curr_array=new Array("","","");
	     //定义全局变量缺页次数
	     var absendNum=0;
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
		     course_Timeout=setTimeout(function(){
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
		            var spliceIndex=OptimalContent(index);
		            //console.log(spliceIndex);
		            curr_array.splice(spliceIndex,1);
		            curr_array.push(source_array[index]);
		           // curr_array.shift();
		          absendNum=absendNum+1;
		        }
		            appendlist(source_array[index],curr_array[0],curr_array[1],curr_array[2],isAbsend);
		     },index*velocity);
	     });
		  //输出演绎结果
		  setTimeout(function(){
		  var absendpercent=Math.ceil((absendNum/arraylength)*100)+"%";
		  $(".result").html("本次最佳置换算法演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"");
		  course_Timeout=0;
		 },(velocity*arraylength)+1000);
         //最佳置换算法
	     function OptimalContent(currentIndex){
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
     }


	 //先进先出算法
	 function FIFO(){
	     //先把页面清空
	     $(".showerea").empty();
	     $(".result").html("");
	     //定义进入内存的数组
	     var curr_array=new Array("","","");
	     //定义全局变量缺页次数
	     var absendNum=0;
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
	        course_Timeout=setTimeout(function(){
		      	var isAbsend="block";
		      	$.each(curr_array,function(curindex,curval){
		           if(source_array[index]==curr_array[curindex]){
		           	isAbsend="none";
		           }
		      	});
		      	if (isAbsend=="block") {
		        	curr_array.push(source_array[index]);
		        	curr_array.shift();
			        absendNum=absendNum+1;
		        }
		         appendlist(source_array[index],curr_array[0],curr_array[1],curr_array[2],isAbsend);
			 },index*velocity);

	          //输出演绎结果
		      setTimeout(function(){
		      var absendpercent=Math.ceil((absendNum/arraylength)*100)+"%";
		      $(".result").html("本次先进先出算法演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"");
		      //演绎结束修改信号量通知其他算法可以演绎
		      course_Timeout=0;
		      },(velocity*arraylength)+1000);
	        //console.log(curr_array);
	             
	      });
	 } 

   
     //最近最久未使用算法
     function LRU(){
	   	  //点击演绎先把页面清空
	      $(".showerea").empty();
	      $(".result").html("");
	      //定义进入内存的数组
	      var curr_array=new Array("","","");
	      //定义全局变量缺页次数
	      var absendNum=0;
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
		      course_Timeout=setTimeout(function(){
			      	var isAbsend="block";
			      	$.each(curr_array,function(curindex,curval){
			           if(source_array[index]==curr_array[curindex]){
			            switch(curindex){
			                 //若第一个已存在则把第一个和第二个置换，再把第二个跟第三个置换
			                 case 0:
			                    var temp=curr_array[0];
			                    curr_array[0]=curr_array[1];
			                    curr_array[1]=curr_array[2];
			                    curr_array[2]=temp;
			                 break;
			                 //若第二个已存在，则直接把第二个和第三个置换
			                 case 1:
			                    var temp=curr_array[1];
			                    curr_array[1]=curr_array[2];
			                    curr_array[2]=temp;
			                 break;
			                
			            }
			           	isAbsend="none";
			           }
			      	});
			      	if (isAbsend=="block") {
				        curr_array.push(source_array[index]);
				        curr_array.shift();
				        absendNum=absendNum+1;
			        }
			            appendlist(source_array[index],curr_array[0],curr_array[1],curr_array[2],isAbsend);
					 },index*velocity);
			       
			        //console.log(curr_array);

			      });
			      //输出演绎结果
			      setTimeout(function(){
			      var absendpercent=Math.ceil((absendNum/arraylength)*100)+"%"
			      $(".result").html("本次最近最久未使用算法演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"");
			       course_Timeout=0;
			      },(velocity*arraylength)+1000);
     }


     //Clock算法
     function Clock(){
     	  //点击演绎先把页面清空
	      $(".showerea").empty();
	      $(".result").html("");
	      //定义进入内存的数组
	      var curr_array=new Array("","","");
		      /*
	       定义一个初始队列,记录当前页面中各值的访问位，默认都为0，
	       当页面请求不发生缺页中断时，将相应数值改为1
	       当发生缺页中断时按FIFO算法从头到尾遍历若为0直接替换
	       若为1则把访问位改为0，暂不替换，继续向下循环
	       若循环到队尾还没有访问位为0的则重新从头循环，即弹出队首即可
	       */
	      var Clocklist=new Array(0,0,0);
	      //定义全局变量缺页次数
	      var absendNum=0;
	            //开始演绎替换
	      $.each(source_array,function(index,val){
	      	/*先判断数组中是否有将要添加的值,如果有则不添加
	      	   添加信号量isAbsend 判断是否缺页
	      	   若不缺页则把缺页标志隐藏
	      	 */
	      course_Timeout=setTimeout(function(){
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
		          absendNum=absendNum+1;
	            }
	             appendlist(source_array[index],curr_array[0],curr_array[1],curr_array[2],isAbsend);
			 },index*velocity);
	       
	        //console.log(curr_array);

	       });
	      //输出演绎结果
	      setTimeout(function(){
	      var absendpercent=Math.ceil((absendNum/arraylength)*100)+"%"
	      $(".result").html("本次Clock算法演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"");
	      course_Timeout=0;
	      },(velocity*arraylength)+1000);
     }

    
     //改进型Clock
     function ImprovedClock(){
	 	   //点击演绎先把页面清空
	      $(".showerea").empty();
	      $(".result").html("");
	      //定义进入内存的数组
	      var curr_array=new Array("","","");
	      //定义全局变量缺页次数
	      var absendNum=0;
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

		     //开始演绎替换
	      $.each(source_array,function(index,val){
		        /*先判断数组中是否有将要添加的值,如果有则不添加
		           添加信号量isAbsend 判断是否缺页
		           若不缺页则把缺页标志隐藏
		         */
		      course_Timeout=setTimeout(function(){
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
			        appendlist(source_array[index],curr_array[0],curr_array[1],curr_array[2],isAbsend);
		     },index*velocity);
	       });
	       ///输出演绎结果
	      setTimeout(function(){
	      var absendpercent=Math.ceil((absendNum/arraylength)*100)+"%"
	      $(".result").html("本次改进型Clock算法演绎缺页次数为"+absendNum+",缺页率为"+absendpercent+"")
	      course_Timeout=0;
	      },(velocity*arraylength)+1000);
     }


     //提取重复的公共方法
     //添加演绎过程
     function appendlist(sourcearray,currarray0,currarray1,currarray2,isAbsend){
           var showlistone=$("<div class=\"showlistone\">\r\n" + 
	        "           <div class=\"enter\">\r\n" + 
	        "             "+sourcearray+"\r\n" + 
	        "           </div>\r\n" + 
	        "           <div class=\"list-one\">\r\n" + 
	        "           "+currarray0+"\r\n" + 
	        "           </div>\r\n" + 
	        "                <div class=\"list-one\">\r\n" + 
	        "           "+currarray1+"\r\n" + 
	        "           </div>\r\n" + 
	        "           <div class=\"list-one\">\r\n" + 
	        "           "+currarray2+"\r\n" + 
	        "           </div>\r\n" + 
	        "           <div class=\"quit\" style=\"display:"+isAbsend+"\">\r\n" + 
	        "              x\r\n" + 
	        "           </div>\r\n" + 
	        "        </div>");
	      $(".showerea").append(showlistone);
     }
})