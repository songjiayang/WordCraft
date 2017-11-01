 // 每秒多少帧
 const FPS = 2;
 const SECONDSBETWEENFRAMES = 1 / FPS;
 const WINDOWWITH = window.screen.width;
 const WINDOWHEIGHT = window.screen.height;
 const PEOPLE_START_X = 250;
 const GAME_TIME = 60;
 const TRAVEL_SPEED = (1100-250)*1.0/GAME_TIME;
 var canvas = null;
 var context2D  = null;
 var word_array = null;
 var word = null;
 var meaning =null;
 var starttime = null;
 var nowtime=null;
 var seconds = GAME_TIME;
 var score = 0;
 var isStop = false;
 var peple_position_x = 250;
 var peple_position_y = 505;
 var Steps_style = false;
 var isOver = false;
 var disappear = false;
 var isvoice = true;
 var isStopBUtton_x = WINDOWWITH/9;
 var isStopBUtton_width =30;
 var isStopBUtton_y = 30;
 var isStopBUtton_height = 60;
 var less_time = 60;
 var voice_x =60;
 var voice_width=30;
 var voice_y=35;
 var voice_height = 85;
 var target_char =null;
 var word_and_meaning =null;
 var words;
 var index =0;
 var isok = false;
 var id_ed=null;
 var error_time =0;
 var ispass = false;
 var level = 1;
 var is_welcom = true;
 var over_type="chances";
 var _audio2=null;
 var level_word =[
 		"Easy","Normal","Hard"
];
 var music_list =[
  "data/music/1.mp3"
];

 var easy_word_list = [
                          "able=a.有能力的；出色的","abuse=vt.滥用；虐待 n.滥用",
                          "accent=n.口音，腔调；重音","add=vt.添加，附加，掺加",
                          "alone=a.单独的 ad.单独地","amuse=vt.逗…乐；给…娱乐",
                          "camera=n.照相机，摄影机", "cell=n.细胞；小房间",
                          "cope=vi.对付，应付","cow=n.母牛，奶牛；母兽",
                          "dark=a.暗的；黑色的","death=n.死，死亡；灭亡",
                          "fact=n.事实；实际，实情","drink=vt.饮 vi.喝 n.饮料",
                          "easy=a.容易的；安逸的","farm=n.农场，农庄；饲养场",
                          "fear=n.害怕；担心 vt.害怕", "fun=n.乐趣，娱乐；玩笑",
                          "gain=vt.获得；增加 n.增进","habit=n.习惯；习性",
                          "hard=a.硬的；困难的","heavy=a.重的；大的；充满的",
                          "death=n.死，死亡；灭亡","match=n.比赛，竞赛；对手",
                          "human=a.人的，人类的 n.人","image=n.像；形象；映象",
                          "layer=n.层，层次；铺设者", "match=n.比赛，竞赛；对手",
                          "mercy=n.仁慈，慈悲，恩惠","organ=n.器官；机构；管风琴"];

 var normal_word_list = [
             							"abnormal=a.不正常的；变态的","absolute=a.绝对的；纯粹的",
             							"abstract=a.抽象的 n.摘要","bottom=n.底，底部，根基",
             							"bright=a.明亮的；聪明的","common=a.普通的；共同的",
             							"defeat=vt.战胜，击败；挫败","everyday=a.每天的，日常的",
             							"exhibit=vt.显示；陈列，展览","expose=vt.使暴露；揭露",
             							"flower=n.花，花卉；开花","future=n.将来，未来",
             							"honest a.诚实的；可敬的","horror=n.恐怖；战栗；憎恶",
             							"journey=n.旅行，旅程 n.旅行","kingdom=n.王国；领域，界",
             							"lecture=n.&vi.演讲，讲课","majority=n.多数，大多数",
             							"mountain=n.山，山岳；山脉","movement=n.动作，活动；移动",
             							"nature=n.大自然；本性；性质","nervous=a.神经的；易激动的",
             							"permit=vt.允许 n.执照","quality=n.质量；品质，特性",
             							"quantity=n.量，数量，分量","reality=n.现实；真实",
             							"return=vi.&n.回来，返回","science=n.科学，科学研究",
             							"season=n.季，季节，时节","sleepy=a.想睡的；寂静的" ];

 var hard_word_list = [
               							"accelerate=vt.(使)加快；促进","beautiful=a.美的，美丽的",
               							"breakfast=n.早饭，早餐","childhood n.童年，幼年；早期",
               							"cigarette=n.香烟，纸烟，卷烟","combination=n.结合，联合；化合",
               							"consideration=n.考虑，思考","effective=a.有效的；有影响的",
               							"elevator=n.电梯；升降机","establishment=n.建立，设立，确立",
               							"foreigner=n.外国人","friendly=a.友好的，友谊的",
               							"gentleman=n.绅士；有教养的人","guarantee=n.保证；担保物",
               							"invention=n.发明，创造；捏造","liberation=n.解放",
               							"microcomputer=n.微型计算机","necessary=a.必要的；必然的",
               							"phenomenon=n.现象","playground=n.操场，运动场",
               							"pollution=n.污染","popular=a.民众的；流行的",
               							"recognition=n.认出，识别；承认","significance=n.意义，意味",
               							"temperature=n.温度；体温","transformer=n.变压器，转换器",
               							"underground=a.地下的；秘密的","wonderful=a.惊人的；极好的",
               							"unsatisfactory=a.不能令人满意的","university=n.大学，综合性大学"];

var welcome_word = "你还在为背诵四六级词汇而苦恼吗？你还在为没过四六级而郁闷吗？我将告诉你,以后这一切都再不是问题，因为有它--词汇大战,一款英语单词记忆帮助小游戏,有了它,你将享受背诵单词的乐趣！";

window.onload = init;
//对外接口函数
function init() {
    canvas = document.getElementById('canvas');
    context2D = canvas.getContext('2d');    //得到当前画布的上线文
    canvas.width=WINDOWWITH;        //设置画布宽度
    canvas.height = WINDOWHEIGHT;  //设置画布高度
    canvas.addEventListener('mousedown', this.mousedown, false);
    document.addEventListener('keypress', this.keypress, false);
    random_char();
    starttime = new Date();			//设置游戏开始时间
    _audio2 = document.createElement('audio') ;
    draw_welcome();
    play_sound();
    setTimeout(function(){
      setInterval(draw, SECONDSBETWEENFRAMES * 1200);   //屏幕刷新频率
    }, 3000);

}

//封装画方法
 function draw() {
	 if (!isOver) {
	 		if (!ispass) {
		     context2D.clearRect(0, 0, canvas.width, canvas.height);
		     context2D.save();
		     drawland();
		     drawpeople();
		     drawtree();
		     draw_word_border();
		     draw_words();
		     draw_timeer()
		     drawscore();
		     draw_stop_mark();
		     draw_game_level();
		     if (isStop) {
		     	draw_stop_targe();
		     }
		     draw_voice();
		     is_ok_do();
		     dorw_error_time();
		     context2D.restore();
	 		} else {
	 			pass_game();
	 		}
	 } else {
   	gameover();
   }
 }

//绘制地面
function drawland() {
    context2D.strokeStyle = "#000000";
    context2D.lineWidth = 10; //设置直线的宽度
    context2D.beginPath();  //开始绘画
    context2D.moveTo(0, 600);//设置起点
    context2D.lineTo(300, 600);//画线
    context2D.moveTo(300, 602);//设置起点
    context2D.lineCap = "round";
    context2D.lineTo(1100, 602);//画线
    context2D.moveTo(1100, 604);//设置起点
    context2D.lineTo(1100, 800);//画线
    context2D.closePath();  //结束画线
    context2D.stroke();
}

//绘制小人使其看上去在动
function drawpeople(){
  if (!isOver&&!isStop) {
    context2D.save();
    context2D.fillStyle='rgb(255,0,0)'; //设置画笔颜色
    context2D.beginPath();
    context2D.arc(peple_position_x, peple_position_y, 18, 0, 2 * Math.PI, false);
    context2D.closePath();
    context2D.fill();
    context2D.strokeStyle='rgb(255,0,0)'; //设置画笔颜色
    context2D.beginPath();
    context2D.lineWidth = 10; //设置直线的宽度
    context2D.lineCap = 'round';
    context2D.moveTo(peple_position_x, peple_position_y+14);//设置起点
    context2D.lineTo(peple_position_x, peple_position_y+45);//画线
    if (Steps_style) {
      context2D.moveTo(peple_position_x, peple_position_y+25);//设置起点
      context2D.lineTo(peple_position_x-30, peple_position_y+55);//画线
      context2D.moveTo(peple_position_x, peple_position_y+25);//设置起点
      context2D.lineTo(peple_position_x+30, peple_position_y+55);//画线
      context2D.moveTo(peple_position_x, peple_position_y+55);//设置起点
      context2D.lineTo(peple_position_x-15, peple_position_y+85);//画线
      context2D.moveTo(peple_position_x, peple_position_y+55);//设置起点
      context2D.lineTo(peple_position_x+30,peple_position_y+85);//画线
      Steps_style=!Steps_style;
    } else {
      context2D.moveTo(peple_position_x, peple_position_y+25);//设置起点
      context2D.lineTo(peple_position_x-20, peple_position_y+45);//画线
      context2D.moveTo(peple_position_x, peple_position_y+25);//设置起点
      context2D.lineTo(peple_position_x+15, peple_position_y+45);//画线
      context2D.moveTo(peple_position_x, peple_position_y+55);//设置起点
      context2D.lineTo(peple_position_x-5, peple_position_y+85);//画线
      context2D.moveTo(peple_position_x, peple_position_y+55);//设置起点
      context2D.lineTo(peple_position_x+15,peple_position_y+85);//画线
      Steps_style=!Steps_style;
    }
    context2D.closePath();
    context2D.stroke();
    context2D.restore();
  }
}

//绘制树木
 function drawtree() {
    context2D.save();
    //画叶子
    context2D.fillStyle='rgb(0,255,0)';
    context2D.beginPath();
    context2D.moveTo(100,250);
    context2D.lineTo(30,320);
    context2D.lineTo(170,320);
    context2D.moveTo(100,320);
    context2D.lineTo(0,420);
    context2D.lineTo(200,420);
    context2D.fill();
    context2D.closePath();
    //画树干
    context2D.beginPath();
    context2D.strokeStyle='#CC9966'; //设置画笔颜色
    context2D.lineWidth = 20; //设置直线的宽度
    context2D.moveTo(93,430);
    context2D.lineTo(90,585);
    context2D.moveTo(90,585);
    context2D.lineTo(110,585);
    context2D.moveTo(110,585);
    context2D.lineTo(107,430);
    context2D.moveTo(107,430);
    context2D.lineTo(93,430);
    context2D.fill();
    context2D.closePath();
    context2D.stroke();
    context2D.restore();
 }

//绘制单词框
function draw_word_border() {
    context2D.save();
    context2D.beginPath();
    context2D.strokeStyle='#33CCFF'; //设置画笔颜色
    context2D.strokeRect(WINDOWWITH/4,200, WINDOWWITH/2, 100);
    context2D.closePath();
    context2D.stroke();
    context2D.restore();
}

//绘制单词
 function draw_words() {
    context2D.save();
    context2D.fillStyle = "#00f";
    context2D.font = '40px 微软雅黑';
    context2D.textAlign = 'left';
    context2D.textBaseline = 'top';
    context2D.fillText(word, WINDOWWITH/4+50, 225, 140);
    context2D.fillText(meaning, WINDOWWITH/4+250, 225, 500);
    context2D.restore();
}

//绘制倒计时计数器
function draw_timeer() {
  if(!isStop&&seconds>0) {
 		showtime();
 		nowtime = new Date();
 		seconds = less_time-Math.round((nowtime.getTime()-starttime.getTime())/1000);
 		peple_position_x = PEOPLE_START_X+(GAME_TIME-seconds)*TRAVEL_SPEED;
  } else if(isStop) {
 		showtime();
 	} else {
 		seconds =0;
 		showtime();
 		isOver = true;
 		over_type = "time";
 	}
}

//显示分数
function drawscore() {
 	context2D.save();
 	context2D.fillStyle = "#00f";
  context2D.font = '  50px 微软雅黑';
  context2D.textAlign = 'left';
  context2D.textBaseline = 'top';
 	context2D.fillText("Score:" + score, 2*WINDOWWITH/3+200, 30, 140);
 	context2D.restore();
}

function draw_stop_mark() {
 	context2D.save();
 	context2D.beginPath();
 	context2D.strokeStyle='#00f'; //设置画笔颜色
 	context2D.lineWidth = 10; //设置直线的宽度
 	context2D.lineCap = 'square';
 	context2D.moveTo(WINDOWWITH/9,30);
 	context2D.lineTo(WINDOWWITH/9,80);
 	context2D.moveTo(WINDOWWITH/9+20,25);
 	context2D.lineTo(WINDOWWITH/9+20,85);
	context2D.closePath();
	context2D.stroke();
 	context2D.restore();
}

function draw_voice() {
 	context2D.save();
 	context2D.beginPath();
 	context2D.strokeStyle='#00f'; //设置画笔颜色
 	context2D.lineWidth = 10; //设置直线的宽度
 	context2D.lineCap = 'round';
 	context2D.moveTo(80,35);
 	context2D.quadraticCurveTo(50,60,80,75);
 	context2D.closePath();
	context2D.stroke();
 	context2D.restore();
 	if (!isvoice) {
 	 	draw_X();
 	}
}

function draw_X() {
 	 context2D.save();
 	 context2D.beginPath();
 	 context2D.strokeStyle='#FF0000'; //设置画笔颜色
 	 context2D.lineWidth = 10; //设置直线的宽度
 	 context2D.lineCap = 'square';
 	 context2D.moveTo(50,30);
 	 context2D.lineTo(100,80);
 	 context2D.moveTo(100,30);
 	 context2D.lineTo(50,80);
 	 context2D.closePath();
	 context2D.stroke();
 	 context2D.restore();
}


function draw_stop_targe() {
 	context2D.save();
 	context2D.fillStyle = "#00f";
 	context2D.font = '50px 微软雅黑';
  context2D.textAlign = 'left';
  context2D.textBaseline = 'top';
	context2D.fillText("游戏暂停中...", WINDOWWITH/6, 100, 140);
	context2D.restore();
}

//绘制时间
 function showtime() {
    context2D.save();
    context2D.fillStyle = "#00f";
    context2D.clearRect(3*WINDOWWITH/4,80,WINDOWWITH/4,40);
    context2D.font = '50px 微软雅黑';
    context2D.textAlign = 'left';
    context2D.textBaseline = 'top';
    context2D.fillText("Time:" + seconds, 2*WINDOWWITH/3-50, 30, 140);
    context2D.restore();
 }

function dorw_error_time() {
	if (error_time>0) {
    context2D.save();
    context2D.fillStyle = "#FF0000";
    context2D.clearRect(3*WINDOWWITH/4,90, WINDOWWITH/4,40);
    context2D.font = '  50px 微软雅黑';
    context2D.textAlign = 'left';
    context2D.textBaseline = 'top';
    context2D.fillText("Error:" + error_time, 2*WINDOWWITH/3+200, 100, 140);
    context2D.restore();
	} if (error_time==5) {
		isOver=true;
		over_type = "chances";
	}
}

//绘制结束画面
function gameover() {
  context2D.clearRect(0, 0, canvas.width, canvas.height);
  context2D.save();
  draw_sad_face();
  draw_end_word();
  context2D.restore();
}

function pass_game() {
  context2D.clearRect(0, 0, canvas.width, canvas.height);
  context2D.save();
  draw_happy_face();
  draw_pass_word();
  context2D.restore();
}

//暂停操作
function stop() {
 	isStop =!isStop;
 	if (isStop) {
 		less_time = seconds;
 		document.removeEventListener('keypress',this.keypress,false);
 	} else {
 		starttime = new Date();
 		document.addEventListener('keypress',this.keypress,false);
 	}
}


//鼠标点击事件
this.mousedown = function(ev) {
 	var mx = 0;
 	var my = 0;
 	if (ev.layerX || ev.layerX ==0) {
 		mx = ev.layerX;
 		my = ev.layerY;
 	} else if (ev.offsetX ||ev.offsetX==0) {
 		mx = ev.offsetX;
 		my = ev.offsetY;
 	}

  if (mx>isStopBUtton_x && mx<(isStopBUtton_x+isStopBUtton_width) && my>isStopBUtton_y && my<(isStopBUtton_y+isStopBUtton_height)) {
   	stop();
  }

  if (mx>voice_x && mx<(voice_x+voice_width) && my>voice_y && my<(voice_y+voice_height)) {
 		isvoice=!isvoice;
 		play_sound();
  }

  if (isOver) {
   	if (mx>2*WINDOWWITH/5-45&&mx<2*WINDOWWITH/5+170&&my>370&&my<400) {
   		isOver = false;
   		error_time=0;
   		score=0;
   		starttime=new Date();
   		less_time=60;
   		seconds = 60;
   		if (level==2) {
   			less_time=50;
   			seconds = 50;
   		} else if (level==3) {
   			less_time=40;
   			seconds = 40;
   		}
   		random_char();
   	}
  }

  if (ispass) {
   	if (mx>2*WINDOWWITH/5-45&&mx<2*WINDOWWITH/5+170&&my>370&&my<400) {
   		ispass = false;
   		level++;
   		if (level>3) {
   			level=1;
   		}
   		error_time=0;
   		score=0;
   		starttime=new Date();
   		if (level==2)
   			less_time=50;
   		if (level==3)
   			less_time=40;
   		random_char();
   	}
  }
}

//键盘点击事件
this.keypress = function(evt) {
 	if (!isok) {
 		error_time++;

	 	if (evt.keyCode == target_char.charCodeAt() || (evt.keyCode == (target_char.charCodeAt()-32))) {
	 		error_time--;
	 		word_array[id_ed[index]]=target_char;
	 		word = word_array.join("");

	 		if (index<id_ed.length-1) {
	 			index++;
	 			target_char = words[index];
	 		} else if (index==id_ed.length-1) {
	 			isok = true;
	 		}
	 	}
	 	if (error_time>5) {
	 		error_time=5;
	 	}
 	}
 }

//字符随机生成
function random_char() {
 	var all_word = null;
 	if (level==1)
 		all_word = easy_word_list;
 	else if (level==2)
 		all_word = normal_word_list;
 	else
 		all_word = hard_word_list;

  word_and_meaning=all_word[parseInt(Math.random()*30)];
 	word = word_and_meaning.split("=")[0];
 	meaning = word_and_meaning.split("=")[1];
 	var word_lenth = word.length;
 	var number = parseInt(word_lenth/2);

 	words = new Array();
 	word_array = new Array();
  id_ed =new Array();
 	var id;
 	for (var i = 0; i < number; i++) {
 		id = parseInt(Math.random()*2+i*2);
 		if (id>word_lenth) {
 			id = word_lenth;
 		}
 		if (id_ed.length<number) {
 			id_ed[i]=id;
 			words[i]=word.charAt(id);
 		}
 	}

 	for (var i = 0; i < word_lenth; i++) {
 		word_array[i]=word.charAt(i);
 	}

 	for (var i = 0; i < id_ed.length; i++) {
 		word_array[id_ed[i]]='_';
 	}

 	word =word_array.join("");
 	target_char = words[index];
}

function is_ok_do() {
 	if (isok) {
 		isok=!isok;
 		score+=10;
 		index=0;
 		random_char();
 	}

  if (score==100) {
 		ispass = true;
 	}
}

function draw_happy_face() {
 	context2D.beginPath();
	context2D.arc(WINDOWWITH/2,200,100,0,Math.PI*2,true);
	var grd=context2D.createRadialGradient(25,50,0,50,50,150);
	grd.addColorStop(0,"#ffff33");
	grd.addColorStop(1,"#ff6600");
	context2D.fillStyle=grd;
	context2D.fill();
	context2D.beginPath();
	context2D.strokeStyle='#fff';
	context2D.lineWidth=4;
	context2D.arc(WINDOWWITH/2,220,40,Math.PI/180*20,Math.PI/180*160,false);
	context2D.stroke();
	context2D.beginPath();
	context2D.fillStyle='#fff';
	context2D.arc(WINDOWWITH/2-40,180,10,0,Math.PI*2,true);
	context2D.fill();
	context2D.moveTo(WINDOWWITH/2+40,180);
	context2D.arc(WINDOWWITH/2+40,180,10,0,Math.PI*2,true);
	context2D.fill();
	context2D.stroke()
}

function draw_sad_face() {
 	context2D.beginPath();
	context2D.arc(WINDOWWITH/2,200,100,0,Math.PI*2,true);
	var grd=context2D.createRadialGradient(25,50,0,50,50,150);
	grd.addColorStop(0,"#000000");
	grd.addColorStop(1,"#000000");
	context2D.fillStyle=grd;
	context2D.fill();
	context2D.beginPath();
	context2D.strokeStyle='#fff';
	context2D.lineWidth=4;
	context2D.arc(WINDOWWITH/2,280,40,Math.PI/180*220,Math.PI/180*320,false);
	context2D.stroke();
	context2D.beginPath();
	context2D.fillStyle='#fff';
	context2D.arc(WINDOWWITH/2-40,180,10,0,Math.PI*2,true);
	context2D.fill();
	context2D.moveTo(WINDOWWITH/2+40,180);
	context2D.arc(WINDOWWITH/2+40,180,10,0,Math.PI*2,true);
	context2D.fill();
	context2D.stroke()
}

function draw_end_word() {
 	context2D.save();
 	context2D.fillStyle = "#000";
 	context2D.clearRect(3*WINDOWWITH/4,80,WINDOWWITH/4, 140);
  context2D.font = '25px 微软雅黑';
  context2D.textAlign = 'left';
  context2D.textBaseline = 'top';
 	context2D.fillText("No more "+over_type+" to try, you have died ! ", 2*WINDOWWITH/5-60, 330, 500);
 	context2D.fillText("Thanks to use word craft, your score is "+ score+".", 2*WINDOWWITH/5-60, 365, 500);
 	context2D.fillStyle = "#FF0000";
 	context2D.fillText("Click me to again", 2*WINDOWWITH/5+60, 400, 500);
 	context2D.restore();
 }

function draw_pass_word() {
 	context2D.save();
 	context2D.fillStyle = "#ff6600";
 	context2D.clearRect(3*WINDOWWITH/4,80,WINDOWWITH/4, 40);
  context2D.font = '25px 微软雅黑';
  context2D.textAlign = 'left';
  context2D.textBaseline = 'top';
 	context2D.fillText("Congratulation, you pass "+level_word[level-1]+" Level ", 2*WINDOWWITH/5-60, 300, 500);
 	context2D.fillText("Thanks to use word craft, your score is "+ score+".", 2*WINDOWWITH/5-60, 335, 500);
 	context2D.fillStyle = "#009900";
 	context2D.fillText("Click me to next", 2*WINDOWWITH/5-45, 370, 500);
 	context2D.restore();
 }

function draw_game_level() {
 	context2D.save();
 	context2D.fillStyle = "#00f";
  context2D.font = '50px 微软雅黑';
  context2D.textAlign = 'left';
  context2D.textBaseline = 'top';
 	context2D.fillText(level_word[level-1]+" Level", WINDOWWITH/4, 30, 300);
 	context2D.restore();
 }

function draw_welcome() {
 	context2D.clearRect(0, 0, canvas.width, canvas.height);
 	context2D.save();
 	context2D.beginPath();
	context2D.fillStyle = "#f00";
  context2D.font = '  25px 微软雅黑';
  context2D.textAlign = 'left';
  context2D.textBaseline = 'top';
  var word_height =200;
  var word_width = WINDOWWITH/5;
  for (var i =0; i <= welcome_word.length; i++) {
  	context2D.fillText(welcome_word.charAt(i), word_width, word_height, 140);
  	word_width +=25;
  	if (word_width>2*WINDOWWITH/5+420) {
    	word_width = WINDOWWITH/5;
    	word_height +=35;
  	}
  }
	context2D.stroke();
  context2D.restore();
}

function delate() {
	var time1 = new Date();
  var time2 = new Date();
   while(time2.getTime()-time1.getTime()<3000){
  	time2 = new Date();
  }
}

function play_sound() {
  var music_src =music_list[parseInt(Math.random()*1)];
  _audio2.src = music_src;
  if (isvoice) {
  	_audio2.loop=true;
  	_audio2.play() ;
  } else {
  	_audio2.pause() ;
  }
}
