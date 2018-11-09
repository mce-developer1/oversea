(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.LB_DIV_0199_00_AC = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{introduction:1,menu:136,activity1:142,a1start:347,a1m1:352,a1m2:392,a1m3:448,a1end:499,activity2:869,a2start:1141,a2m1:1148,a2m2:1187,a2m3:1245,a2end:1299,activity3:1451,a3start:1721,a3m1:1725,a3m2:1762,a3m3:1816,a3end:1867,"final":2017});

	// timeline functions:
	this.frame_0 = function() {
		var me = this;
			this.playBtn.removeAllEventListeners();
		 	this.playBtn.addEventListener("click",function(event){
				webAudio.playSound("lightclick");
				me.gotoAndPlay(1);
			});
			if(!window.fullScreenApi.supportsFullScreen){
				this.fullScreenImage.visible = false;
				this.fullScreenBtn.visible = false;
				this.normalScreenImage.visible = false;
				this.normalScreenBtn.visible = false;
				this.screenBg.visible = false;
			}else{
				this.fullScreenImage.visible = true;
				this.fullScreenBtn.visible = true;
				this.normalScreenImage.visible = false;
				this.normalScreenBtn.visible = false;
				this.fullScreenBtn.removeAllEventListeners();
				this.fullScreenBtn.addEventListener("click",function(){
					webAudio.playSound("lightclick");
					goFullScreen();
					me.fullScreenImage.visible = false;
					me.fullScreenBtn.visible = false;
					me.normalScreenImage.visible = true;
					me.normalScreenBtn.visible = true;
				});
				this.normalScreenBtn.removeAllEventListeners();
				this.normalScreenBtn.addEventListener("click",function(){
					webAudio.playSound("lightclick");
					gooutFullScreen();
					me.fullScreenImage.visible = true;
					me.fullScreenBtn.visible = true;
					me.normalScreenImage.visible = false;
					me.normalScreenBtn.visible = false;
				});
			}
		
			this.stop();
	}
	this.frame_1 = function() {
		webAudio.playSound("1helloeveryonehas");
	}
	this.frame_79 = function() {
		var me = this;
			this.count = 0;
			webAudio.playSound("4clickononeofthetabs");
			this.activity1Click.removeAllEventListeners();
			this.activity1Click.addEventListener("click",function(event){
				webAudio.stopAllSounds();
				webAudio.playSound("lightclick");
				me.gotoAndPlay("activity1");
			});
		
			this.activity2Click.removeAllEventListeners();
			this.activity2Click.addEventListener("click",function(){
				webAudio.stopAllSounds();
				webAudio.playSound("lightclick");
				if(Math.random()>0.5){
					me.gotoAndPlay("activity2");
				}else{
					me.gotoAndPlay("activity3");
				}
				
			});
			this.finalClick.removeAllEventListeners();
			this.finalClick.addEventListener("click",function(){
				webAudio.stopAllSounds();
				webAudio.playSound("lightclick");
				me.gotoAndPlay("final");
			});
			this.activeA1 = false;
			this.activeA2 = false;
			this.activeA3 = false;
			this.enableFinal = function(enable){
				this.finalClick.mouseEnabled = enable;
				if(enable){
					this.finalImage.alpha = 1;
				}else {
					this.finalImage.alpha = .5;
				}
			};
			this.enableFinal(false);
	}
	this.frame_141 = function() {
		this.stop();
	}
	this.frame_142 = function() {
		var self = this;
			this.A1 = {
				init : function(director){
					var me = this;
					this.filled = 0;
					this.checkNum = 0;
					this.director = director;
					this.initBounds();
					this.getShapeObjects();
					this.setShapePosition(this.shapeImages,this.shapeClicks);
					this.enableCheckAnswer(false);
					this.falseResults = [];
					this.enableDrag(true);
					this.director.A1showAnswerClick.removeAllEventListeners();
					this.director.A1showAnswerClick.addEventListener("click",function(){
						webAudio.stopAllSounds();
						webAudio.playSound("lightclick");
						me.director.A1Menu.mouseEnabled = false;
						me.activeA1 = true;
						me.showCorrectAnswers();
						me.enableDrag(false);
						me.director.enableFinal(true);
						setTimeout(function(){
							me.director.gotoAndPlay("a1end");
							me.director.A1Menu.mouseEnabled = true;
						},2000)
					});
					this.director.A1Menu.removeAllEventListeners();
					this.director.A1Menu.addEventListener("click",function(){
						webAudio.stopAllSounds();
						webAudio.playSound("lightclick");
						me.director.gotoAndPlay("menu");
					});
				},
				initBounds : function(){
					for(var i = 1 ;i < 5;i++){
						var bound = this.director["A1Bound"+i];
						bound.gotoAndStop(0);
						bound.minX = bound.x;
						bound.minY = bound.y
						bound.maxX = bound.x + bound.nominalBounds.width;
						bound.maxY = bound.y + bound.nominalBounds.height;
						bound.typeId = i;
						bound.contain = null;
					}
				},
				setShapeEvent : function(){
					var me = this;
					for(var i = 0; i< this.shapeClicks.length;i++){
						var shapeClick = this.shapeClicks[i];
						var shapeImage = this.shapeImages[i];
						(function(shapeClick,shapeImage){
							shapeClick.removeAllEventListeners();
							shapeClick.addEventListener("mousedown",function(event){
								webAudio.playSound("lightclick");
								me.director.setChildIndex(shapeImage,me.director.children.length-1);
								me.director.setChildIndex(shapeClick,me.director.children.length-1);
								var target = event.target;
								var beginX = target.x;
								var beginY = target.y
								var offset = {x:target.x - event.stageX, y:target.y - event.stageY};
								event.onMouseMove = function(ev) {
									shapeClick.x = ev.stageX+offset.x;
									shapeClick.y = ev.stageY+offset.y;
									shapeImage.x = ev.stageX+offset.x;
									shapeImage.y = ev.stageY+offset.y;
								}
								event.onMouseUp = function(ev){
									for(var i = 1;i < 5;i++){
										var bound =  me.director["A1Bound"+i];
										if(ev.stageX >= bound.minX && ev.stageX <= bound.maxX && ev.stageY >= bound.minY && ev.stageY <= bound.maxY && bound.contain == null){
											if(shapeClick.at != null){
												me.director["A1Bound"+shapeClick.at].contain = null;
												me.onChangeFilled(--me.filled);
											}
											me.onChangeFilled(++me.filled);
											me.addShapeToBox(shapeImage,shapeClick,bound);
											return;
										}
									}
									me.moveToStartPosition(shapeClick,shapeImage);
								}
							});
						})(shapeClick,shapeImage)
					}
				},
				
				moveToStartPosition : function(shapeClick,shapeImage){
					if(shapeClick.at != null){
						this.director["A1Bound"+shapeClick.at].contain = null;
						this.onChangeFilled(--this.filled);
					}
					shapeImage.x = shapeImage.initX;
					shapeImage.y = shapeImage.initY;
					shapeClick.x = shapeImage.x;
					shapeClick.y = shapeImage.y;
					shapeClick.at = null;
				},
				onChangeFilled : function(filled){
					if(filled < 4 ){
						this.enableCheckAnswer(false);
					}else{
						this.enableCheckAnswer(true);
					}
					this.filled = filled;
				},
				enableCheckAnswer : function(enable){
					var me = this;
					if(!enable){
						this.director.A1checkAnswerImage.alpha = .5;
						this.director.A1checkAnswerClick.removeAllEventListeners();
					}else {
						this.director.A1checkAnswerImage.alpha = 1;
						this.director.A1checkAnswerClick.removeAllEventListeners();
						this.director.A1checkAnswerClick.addEventListener("click",function(event){
							webAudio.stopAllSounds();
							webAudio.playSound("lightclick");
							me.director.enableFinal(true);
							me.activeA1 = true;
							me.director.A1checkAnswerClick.removeAllEventListeners();
							me.director.A1Menu.mouseEnabled = false;
							me.enableDrag(false);
							me.falseResults.length = 0;
							for(var i =0;i< me.shapeClicks.length;i++){
								var shapeClick = me.shapeClicks[i];
								var shapeImage = me.shapeImages[i];
								var bound = me.director["A1Bound"+ shapeClick.at];
								if(shapeClick.type != bound.typeId){
									bound.gotoAndStop(2);
									me.falseResults.push({shapeClick : shapeClick,shapeImage:shapeImage});
								}else{
									shapeClick.removeAllEventListeners();
									bound.gotoAndStop(1);
								}
							}
							setTimeout(function(){
								me.director.A1Menu.mouseEnabled = true;
								if(me.falseResults.length<=0){
									me.director.gotoAndPlay('a1m1');
									me.enableDrag(false);
								}else{
									if(me.checkNum <= 0){
										for(var i=0;i < me.falseResults.length;i++){
											var shapeClick = me.falseResults[i].shapeClick;
											var shapeImage = me.falseResults[i].shapeImage;
											me.director["A1Bound"+shapeClick.at].gotoAndStop(0);
											me.moveToStartPosition(shapeClick,shapeImage);
										}
										me.checkNum++;
										me.director.gotoAndPlay("a1m2");
										me.enableDrag(true);
									}else {
										me.enableCheckAnswer(false);
										me.enableDrag(false);
										for(var i=0;i < me.falseResults.length;i++){
											var shapeClick = me.falseResults[i].shapeClick;
											var shapeImage = me.falseResults[i].shapeImage;
											me.director["A1Bound"+shapeClick.at].gotoAndStop(0);
										}
										me.showCorrectAnswers();
										me.director.gotoAndPlay("a1m3");
									}
								}
							},2000);
						});
					}
				},
				enableDrag : function(enable){
					for (var i = 1;i< this.shapeClicks.length;i++){
						var partClick = this.shapeClicks[i];
							partClick.mouseEnabled  = enable;
					}
					this.director.A1showAnswerClick.mouseEnabled = enable;
				},
				showCorrectAnswers : function(){
					for(var i = 0 ;i < 4;i++){
						var shapeClick = this.shapeClicks[i];
						var shapeImage = this.shapeImages[i];
						for(var j = 1;j<5;j++){
							var bound = this.director["A1Bound"+j];
							if(shapeClick.type == bound.typeId){
								this.addShapeToBox(shapeClick,shapeImage,bound);
							}
						}
					}
				},
				addShapeToBox : function(shapeImage,shapeClick,bound){
					bound.contain = shapeClick.type;
					shapeClick.at = bound.typeId;
					shapeImage.x = bound.minX + (bound.maxX - bound.minX)/2 ;
					shapeImage.y = bound.minY + (bound.maxY - bound.minY)/2 ;
					shapeClick.x = shapeImage.x;
					shapeClick.y = shapeImage.y;
					
				},
				setInvisible : function(){
					this.director.click0_1.visible = false;
					this.director.click0_1.removeAllEventListeners();
					this.director.image0_1.visible = false;
					this.director.click3_1.visible = false;
					this.director.click3_1.removeAllEventListeners();
					this.director.image3_1.visible = false;
					this.director.click4_1.visible = false;
					this.director.click4_1.removeAllEventListeners();
					this.director.image4_1.visible = false;
					this.director.click5_1.visible = false;
					this.director.click5_1.removeAllEventListeners();
					this.director.image5_1.visible = false;
					this.director.click0_2.visible = false;
					this.director.click0_2.removeAllEventListeners();
					this.director.image0_2.visible = false;
					this.director.click3_2.visible = false;
					this.director.click3_2.removeAllEventListeners();
					this.director.image3_2.visible = false;
					this.director.click4_2.visible = false;
					this.director.click4_2.removeAllEventListeners();
					this.director.image4_2.visible = false;
					this.director.click5_2.visible = false;
					this.director.click5_2.removeAllEventListeners();
					this.director.image5_2.visible = false;
				},
				getShapeObjects : function(){
					this.setInvisible();
					this.shapeImages = [];
					this.shapeClicks = [];
					var circleClick,rectangleClick,triangleClick,pentangleClick;
					var circleImage,rectangleImage,triangleImage,pentangleImage;
					if(Math.random() > 0.5){
						circleClick = this.director.click0_1;
						circleImage = this.director.image0_1;
					}else{
						circleClick = this.director.click0_2;
						circleImage = this.director.image0_2;
					}
					circleClick.visible = true;
					circleImage.visible = true;
					circleClick.type = 1;
					circleClick.at = null;
					this.shapeImages.push(circleImage);
					this.shapeClicks.push(circleClick);
					
					if(Math.random() > 0.5){
						triangleClick = this.director.click3_1;
						triangleImage = this.director.image3_1;
					}else{
						triangleClick =  this.director.click3_2;
						triangleImage = this.director.image3_2;
					}
					triangleClick.visible = true;
					triangleImage.visible = true;
					triangleClick.type = 2;
					triangleClick.at = null;
					this.shapeImages.push(triangleImage);
					this.shapeClicks.push(triangleClick);
					
					if(Math.random() > 0.5){
						rectangleClick = this.director.click4_1;
						rectangleImage = this.director.image4_1;
					}else{
						rectangleClick = this.director.click4_2;
						rectangleImage = this.director.image4_2;
					}
					rectangleClick.visible = true;
					rectangleImage.visible = true;
					rectangleClick.type = 3;
					rectangleClick.at = null;
					this.shapeImages.push(rectangleImage);
					this.shapeClicks.push(rectangleClick);
			
					if(Math.random() > 0.5){
						pentangleClick = this.director.click5_1;
						pentangleImage = this.director.image5_1;
					}else{
						pentangleClick = this.director.click5_2;
						pentangleImage = this.director.image5_2;
					}
					pentangleClick.visible = true;
					pentangleImage.visible = true;
					pentangleClick.type = 4;
					pentangleClick.at = null;
					this.shapeImages.push(pentangleImage);
					this.shapeClicks.push(pentangleClick);
				},
				setShapePosition : function(shapeImages,shapeClicks){
					var positionIndexList = [1,2,3,4];
					initPositon = {
						y : 522,
						x1 : 141,
						x2 : 332,
						x3 : 523,
						x4 : 715
		
					}
					var count = 0;
					while(positionIndexList.length){
						var randomIndex = Math.floor(Math.random()*positionIndexList.length);
						var randomValue = positionIndexList[randomIndex];
						shapeImages[count].x = initPositon["x"+ randomValue] + shapeImages[count].nominalBounds.width/2;
						shapeImages[count].y = initPositon.y;
						shapeImages[count].initX = shapeImages[count].x;
						shapeImages[count].initY = shapeImages[count].y;
						shapeClicks[count].x = shapeImages[count].x;
						shapeClicks[count].y = shapeImages[count].y;				
						console.log("abc")
						positionIndexList.splice(randomIndex,1);
						
						count++;
					}
					
				}
			};
			
			var me = this;
			
			this.A1.init(this);
	}
	this.frame_143 = function() {
		webAudio.playSound("2whatisclassification");
	}
	this.frame_264 = function() {
		webAudio.playSound("5dragtheshapedobjects");
	}
	this.frame_347 = function() {
		this.A1.setShapeEvent();
	}
	this.frame_351 = function() {
		this.stop();
	}
	this.frame_352 = function() {
		webAudio.playSound("10welldone");
	}
	this.frame_391 = function() {
		this.gotoAndPlay("a1end");
	}
	this.frame_392 = function() {
		webAudio.playSound("11youarealmostthere");
	}
	this.frame_447 = function() {
		this.gotoAndPlay("a1start");
	}
	this.frame_448 = function() {
		webAudio.playSound("12herearethecorrectanswers");
	}
	this.frame_498 = function() {
		this.gotoAndPlay("a1end");
	}
	this.frame_499 = function() {
		webAudio.playSound("8aclassificationisplacingobjectsingroups");
	}
	this.frame_609 = function() {
		webAudio.playSound("8bdidyounotice");
	}
	this.frame_868 = function() {
		if(this.activeA1 && (this.activeA2 || this.activeA3)){
				this.gotoAndPlay("final");
			}else{
				this.gotoAndPlay("menu");
			}
	}
	this.frame_869 = function() {
		this.A2 = null;
			this.A2 = {
				A2filled : 0,
				init : function(director){
					var me = this;
					console.log("reset");
					this.A2filled = 0;
					this.checkNum = 0;
					this.director = director;
					this.initBounds();
					this.initCheckIcon();
					this.setShapePosition();
					this.enableCheckAnswer(false);
					this.enableDrag(false);
					this.falseResults = [];
					this.director.A2Menu.removeAllEventListeners();
					this.director.A2Menu.addEventListener("click",function(){
						webAudio.stopAllSounds();
						webAudio.playSound("lightclick");
						me.director.gotoAndPlay("menu");
					});
				},
				initCheckIcon : function(){
					for (var i = 1; i< 6;i++){
						this.director["checkIcon"+i].gotoAndStop(0);
					}
				},
				initBounds : function(){
					for(var i = 1 ;i < 6;i++){
						var bound = this.director["A2Bound"+i];
						bound.minX = bound.x - 146/2;
						bound.minY = bound.y - 54/2;
						bound.maxX = bound.minX + 146;
						bound.maxY = bound.minY + 54;
						bound.typeId = i;
						bound.contain = null;
					}
				},
				setShapeEvent : function(){
					this.enableDrag(true);
					var me = this;
					for(var i = 1; i< 6;i++){
						var shapeClick = this.director["drinkClick"+i];
						var shapeImage = this.director["drink"+i];
						(function(shapeClick,shapeImage){
							shapeClick.removeAllEventListeners();
							shapeClick.addEventListener("mousedown",function(event){
								webAudio.playSound("lightclick");
								me.director.setChildIndex(shapeImage,me.director.children.length-1);
								me.director.setChildIndex(shapeClick,me.director.children.length-1);
								var target = event.target;
								var beginX = target.x;
								var beginY = target.y
								var offset = {x:target.x - event.stageX, y:target.y - event.stageY};
								event.onMouseMove = function(ev) {
									shapeClick.x = ev.stageX+offset.x;
									shapeClick.y = ev.stageY+offset.y;
									shapeImage.x = ev.stageX+offset.x;
									shapeImage.y = ev.stageY+offset.y;
								}
								event.onMouseUp = function(ev){
									for(var i = 1;i < 6;i++){
										var bound =  me.director["A2Bound"+i];
										if(ev.stageX >= bound.minX && ev.stageX <= bound.maxX && ev.stageY >= bound.minY && ev.stageY <= bound.maxY && bound.contain == null){
											if(shapeClick.at != null){
												me.director["A2Bound"+shapeClick.at].contain = null;
												var a = me.A2filled-1;
												me.onChangeFilled(a);
											}
											var a = me.A2filled+1;
											me.onChangeFilled(a);
											me.addShapeToBox(shapeImage,shapeClick,bound);
											return;
										}
									}
									me.moveToStartPosition(shapeClick,shapeImage);
								}
							});
						})(shapeClick,shapeImage)
					}
				},
				
				moveToStartPosition : function(shapeClick,shapeImage){
					if(shapeClick.at != null){
						this.director["A2Bound"+shapeClick.at].contain = null;
						this.onChangeFilled(--this.A2filled);
					}
					shapeImage.x = shapeImage.initX;
					shapeImage.y = shapeImage.initY;
					shapeClick.x = shapeImage.x;
					shapeClick.y = shapeImage.y;
					shapeClick.at = null;
				},
				onChangeFilled : function(A2filled){
					
					if(A2filled < 5 ){
						this.enableCheckAnswer(false);
					}else{
						this.enableCheckAnswer(true);
					}
					this.A2filled = A2filled;
				},
				enableCheckAnswer : function(enable){
					var me = this;
					if(!enable){
						this.director.A2checkAnswerImage.alpha = .5;
						this.director.A2checkAnswerClick.removeAllEventListeners();
					}else {
						this.director.A2checkAnswerImage.alpha = 1;
						this.director.A2checkAnswerClick.removeAllEventListeners();
						this.director.A2checkAnswerClick.addEventListener("click",function(event){
								webAudio.stopAllSounds();
								webAudio.playSound("lightclick");
								me.director.enableFinal(true);
							me.activeA2 = true;
							me.director.A2checkAnswerClick.removeAllEventListeners();
							var hasWrong = false;
							me.director.A2Menu.mouseEnabled = false;
							me.enableDrag(false);
							for(var i = 1;i <6;i++){
								var checkIcon = me.director["checkIcon"+i];
								checkIcon.gotoAndStop(1);
								me.director.setChildIndex(checkIcon,me.director.children.length-1);
							}
							var bound5 = me.director["A2Bound5"];
							var clickInBound5 = me.director["drinkClick"+ bound5.contain];
							var imageInBound5 = me.director["drink"+ bound5.contain];
							var click5 = me.director["drinkClick5"];
							var image5 = me.director["drink5"];
							var boundContain5 = me.director["A2Bound"+click5.at];
							var checkIcon5 = me.director["checkIcon5"];
							var checkIconX = me.director["checkIcon"+click5.at];
							if(bound5.contain != click5.type){
								checkIcon5.gotoAndStop(2);
								checkIconX.gotoAndStop(2);
								hasWrong = true;
							}
							
							setTimeout(function(){
								me.director.A2Menu.mouseEnabled = true;
								if(!hasWrong){
									me.director.gotoAndPlay('a2m1');
									me.enableDrag(false);
								}else{
									if(me.checkNum <= 0){
										checkIcon5.gotoAndStop(0);
										checkIconX.gotoAndStop(0);
										me.moveToStartPosition(click5,image5);
										me.moveToStartPosition(clickInBound5,imageInBound5);
										me.checkNum++;
										me.director.gotoAndPlay("a2m2");
										me.enableDrag(true);
									}else {
										me.enableCheckAnswer(false);
										me.enableDrag(false);
										checkIcon5.gotoAndStop(0);
										checkIconX.gotoAndStop(0);
										me.addShapeToBox(image5,click5,bound5);
										me.addShapeToBox(imageInBound5,clickInBound5,boundContain5);
										me.director.gotoAndPlay("a2m3");
									}
								}
							},2000);
						});
					}
				},
				enableDrag : function(enable){
					for (var i = 1;i< 6;i++){
						var partClick = this.director["drinkClick"+i]
							partClick.mouseEnabled  = enable;
					}
				},
				addShapeToBox : function(shapeImage,shapeClick,bound){
					bound.contain = shapeClick.type;
					shapeClick.at = bound.typeId;
					shapeImage.x = bound.minX + (bound.maxX - bound.minX)/2;
					shapeImage.y = bound.minY + (bound.maxY - bound.minY)/2;
					shapeClick.x = shapeImage.x;
					shapeClick.y = shapeImage.y;
					
				},
				setShapePosition : function(){
					for(var i = 1; i < 6;i++){
						var drinkImage = this.director["drink"+i];
						var drinkClick = this.director["drinkClick"+i];
						if(drinkImage.initX){
							drinkImage.x = drinkImage.initX;
							drinkImage.y = drinkImage.initY;
							drinkClick.x = drinkImage.x;
							drinkClick.y = drinkImage.y;
						}
					}
					for(var i = 1; i < 6;i++){
						var randomIndex = Math.floor(Math.random()*4+1);
						this.swap(i,randomIndex);
					}
					
					for(var i = 1; i < 6;i++){
						var drinkImage = this.director["drink"+i];
						var drinkClick = this.director["drinkClick"+i];
						drinkImage.initX = drinkImage.x;
						drinkImage.initY = drinkImage.y;
						drinkClick.type = i;
						drinkClick.at = null;
					}
				},
				swap : function(index1,index2){
					var dinkClick1 = this.director["drinkClick"+index1];
					var drinkImage1 = this.director["drink"+index1];
					var dinkClick2 = this.director["drinkClick"+index2];
					var drinkImage2 = this.director["drink"+index2];
					var tempX,tempY;
					tempX = drinkImage1.x;
					drinkImage1.x = drinkImage2.x;
					drinkImage2.x = tempX;
					tempY = drinkImage1.y;
					drinkImage1.y = drinkImage2.y;
					drinkImage2.y = tempY;
					dinkClick1.x = drinkImage1.x;
					dinkClick1.y = drinkImage1.y;
					dinkClick2.x = drinkImage2.x;
					dinkClick2.y = drinkImage2.y;
				}
			};
			
			var me = this;
			
			this.A2.init(this);
	}
	this.frame_870 = function() {
		webAudio.playSound("3howdoweshowtheclassfication")
	}
	this.frame_1052 = function() {
		webAudio.playSound("6draganddropthecorrectwords")
	}
	this.frame_1141 = function() {
		this.A2.setShapeEvent();
	}
	this.frame_1147 = function() {
		this.stop();
	}
	this.frame_1148 = function() {
		webAudio.playSound("10welldone");
	}
	this.frame_1186 = function() {
		this.gotoAndPlay("a2end");
	}
	this.frame_1187 = function() {
		webAudio.playSound("11youarealmostthere");
	}
	this.frame_1244 = function() {
		this.gotoAndPlay("a2start");
	}
	this.frame_1245 = function() {
		webAudio.playSound("12herearethecorrectanswers");
	}
	this.frame_1299 = function() {
		webAudio.playSound("9wejustlearnthatwecanuse")
	}
	this.frame_1450 = function() {
		if(this.activeA1 && (this.activeA2 || this.activeA3)){
				this.gotoAndPlay("final");
			}else{
				this.gotoAndPlay("menu");
			}
	}
	this.frame_1451 = function() {
		var self = this;
			this.A3 = {
				init : function(director){
					var me = this;
					this.filled = 0;
					this.checkNum = 0;
					this.director = director;
					this.initBounds();
					this.initCheckIcon();
					this.setShapePosition();
					this.enableCheckAnswer(false);
					this.falseResults = [];
					this.enableDrag(false);
					this.director.A3Menu.removeAllEventListeners();
					this.director.A3Menu.addEventListener("click",function(){
						webAudio.stopAllSounds();
						webAudio.playSound("lightclick");
						me.director.gotoAndPlay("menu");
					});
				},
				initCheckIcon : function(){
					for (var i = 1; i< 6;i++){
						this.director["A3CheckIcon"+i].gotoAndStop(0);
					}
				},
				initBounds : function(){
					for(var i = 1 ;i < 6;i++){
						var bound = this.director["A3Bound"+i];
						bound.minX = bound.x - 146/2;
						bound.minY = bound.y - 54/2;
						bound.maxX = bound.minX + 146;
						bound.maxY = bound.minY + 54;
						bound.typeId = i;
						bound.contain = null;
					}
				},
				setShapeEvent : function(){
					this.enableDrag(true);
					var me = this;
					for(var i = 1; i< 6;i++){
						var shapeClick = this.director["shapeClick"+i];
						var shapeImage = this.director["shapeImage"+i];
						(function(shapeClick,shapeImage){
							shapeClick.removeAllEventListeners();
							shapeClick.addEventListener("mousedown",function(event){
								webAudio.playSound("lightclick");
								me.director.setChildIndex(shapeImage,me.director.children.length-1);
								me.director.setChildIndex(shapeClick,me.director.children.length-1);
								var target = event.target;
								var beginX = target.x;
								var beginY = target.y
								var offset = {x:target.x - event.stageX, y:target.y - event.stageY};
								event.onMouseMove = function(ev) {
									shapeClick.x = ev.stageX+offset.x;
									shapeClick.y = ev.stageY+offset.y;
									shapeImage.x = ev.stageX+offset.x;
									shapeImage.y = ev.stageY+offset.y;
								}
								event.onMouseUp = function(ev){
									for(var i = 1;i < 6;i++){
										var bound =  me.director["A3Bound"+i];
										if(ev.stageX >= bound.minX && ev.stageX <= bound.maxX && ev.stageY >= bound.minY && ev.stageY <= bound.maxY && bound.contain == null){
											if(shapeClick.at != null){
												me.director["A3Bound"+shapeClick.at].contain = null;
												var a = me.filled - 1;
												me.onChangeFilled(a);
											}
											var a = me.filled + 1;
											me.onChangeFilled(a);
											me.addShapeToBox(shapeImage,shapeClick,bound);
											return;
										}
									}
									me.moveToStartPosition(shapeClick,shapeImage);
								}
							});
						})(shapeClick,shapeImage)
					}
				},
				
				moveToStartPosition : function(shapeClick,shapeImage){
					if(shapeClick.at != null){
						this.director["A3Bound"+shapeClick.at].contain = null;
						this.onChangeFilled(--this.filled);
					}
					shapeImage.x = shapeImage.initX;
					shapeImage.y = shapeImage.initY;
					shapeClick.x = shapeImage.x;
					shapeClick.y = shapeImage.y;
					shapeClick.at = null;
				},
				onChangeFilled : function(filled){
					//console.log(filled);
					if(filled < 5 ){
						this.enableCheckAnswer(false);
					}else{
						this.enableCheckAnswer(true);
					}
					this.filled = filled;
				},
				enableCheckAnswer : function(enable){
					var me = this;
					if(!enable){
						this.director.checkAnswerImage.alpha = .5;
						this.director.checkAnswerClick.removeAllEventListeners();
					}else {
						this.director.checkAnswerImage.alpha = 1;
						this.director.checkAnswerClick.removeAllEventListeners();
						this.director.checkAnswerClick.addEventListener("click",function(event){
							webAudio.stopAllSounds();
							webAudio.playSound("lightclick");
							me.director.enableFinal(true);
							me.activeA3 = true;
							me.director.checkAnswerClick.removeAllEventListeners();
							var hasWrong = false;
							me.director.A3Menu.mouseEnabled = false;
							me.enableDrag(false);
							for(var i = 1;i <6;i++){
								var checkIcon = me.director["A3CheckIcon"+i];
								checkIcon.gotoAndStop(1);
								me.director.setChildIndex(checkIcon,me.director.children.length-1);
							}
							var bound5 = me.director["A3Bound5"];
							var clickInBound5 = me.director["shapeClick"+ bound5.contain];
							var imageInBound5 = me.director["shapeImage"+ bound5.contain];
							var click5 = me.director["shapeClick5"];
							var image5 = me.director["shapeImage5"];
							var boundContain5 = me.director["A3Bound"+click5.at];
							var checkIcon5 = me.director["A3CheckIcon5"];
							var checkIconX = me.director["A3CheckIcon"+click5.at];
							console.log(bound5.contain);
							console.log(click5.type);
							if(bound5.contain != click5.type){
								checkIcon5.gotoAndStop(2);
								checkIconX.gotoAndStop(2);
								hasWrong = true;
							}
							
							setTimeout(function(){
								me.director.A3Menu.mouseEnabled = true;
								if(!hasWrong){
									me.director.gotoAndPlay('a3m1');
									me.enableDrag(false);
								}else{
									if(me.checkNum <= 0){
										checkIcon5.gotoAndStop(0);
										checkIconX.gotoAndStop(0);
										me.moveToStartPosition(click5,image5);
										me.moveToStartPosition(clickInBound5,imageInBound5);
										me.checkNum++;
										me.director.gotoAndPlay("a3m2");
										me.enableDrag(true);
									}else {
										me.enableCheckAnswer(false);
										me.enableDrag(false);
										checkIcon5.gotoAndStop(0);
										checkIconX.gotoAndStop(0);
										me.addShapeToBox(image5,click5,bound5);
										me.addShapeToBox(imageInBound5,clickInBound5,boundContain5);
										me.director.gotoAndPlay("a3m3");
									}
								}
							},2000);
						});
					}
				},
				enableDrag : function(enable){
					for (var i = 1;i< 6;i++){
						var partClick = this.director["shapeClick"+i]
							partClick.mouseEnabled  = enable;
					}
				},
				showCorrectAnswers : function(){
					for(var i = 0 ;i < 4;i++){
						var shapeClick = this.shapeClicks[i];
						var shapeImage = this.shapeImages[i];
						for(var j = 1;j<5;j++){
							var bound = this.director["A1Bound"+j];
							if(shapeClick.type == bound.typeId){
								bound.gotoAndStop(1);
								this.addShapeToBox(shapeClick,shapeImage,bound);
							}
						}
					}
				},
				addShapeToBox : function(shapeImage,shapeClick,bound){
					bound.contain = shapeClick.type;
					shapeClick.at = bound.typeId;
					shapeImage.x = bound.minX + (bound.maxX - bound.minX)/2;
					shapeImage.y = bound.minY + (bound.maxY - bound.minY)/2;
					shapeClick.x = shapeImage.x;
					shapeClick.y = shapeImage.y;
					
				},
				setShapePosition : function(){
					for(var i = 1; i < 6;i++){
						var drinkImage = this.director["shapeImage"+i];
						var drinkClick = this.director["shapeClick"+i];
						if(drinkImage.initX){
							drinkImage.x = drinkImage.initX;
							drinkImage.y = drinkImage.initY;
							drinkClick.x = drinkImage.x;
							drinkClick.y = drinkImage.y;
						}
					}
					
					for(var i = 1; i < 6;i++){
						var randomIndex = Math.floor(Math.random()*4+1);
						this.swap(i,randomIndex);
					}
					
					for(var i = 1; i < 6;i++){
						var drinkImage = this.director["shapeImage"+i];
						var drinkClick = this.director["shapeClick"+i];
						drinkImage.initX = drinkImage.x;
						drinkImage.initY = drinkImage.y;
						drinkClick.type = i;
						drinkClick.at = null;
					}
				},
				swap : function(index1,index2){
					var dinkClick1 = this.director["shapeClick"+index1];
					var drinkImage1 = this.director["shapeImage"+index1];
					var dinkClick2 = this.director["shapeClick"+index2];
					var drinkImage2 = this.director["shapeImage"+index2];
					var tempX,tempY;
					tempX = drinkImage1.x;
					drinkImage1.x = drinkImage2.x;
					drinkImage2.x = tempX;
					tempY = drinkImage1.y;
					drinkImage1.y = drinkImage2.y;
					drinkImage2.y = tempY;
					dinkClick1.x = drinkImage1.x;
					dinkClick1.y = drinkImage1.y;
					dinkClick2.x = drinkImage2.x;
					dinkClick2.y = drinkImage2.y;
				}
			};
			
			var me = this;
			
			this.A3.init(this);
	}
	this.frame_1452 = function() {
		webAudio.playSound("3howdoweshowtheclassfication")
	}
	this.frame_1629 = function() {
		webAudio.playSound("6draganddropthecorrectwords")
	}
	this.frame_1721 = function() {
		this.A3.setShapeEvent()
	}
	this.frame_1724 = function() {
		this.stop();
	}
	this.frame_1725 = function() {
		webAudio.playSound("10welldone");
	}
	this.frame_1761 = function() {
		this.gotoAndStop("a3end");
	}
	this.frame_1762 = function() {
		webAudio.playSound("11youarealmostthere");
	}
	this.frame_1815 = function() {
		this.gotoAndPlay("a3start");
	}
	this.frame_1816 = function() {
		webAudio.playSound("12herearethecorrectanswers");
	}
	this.frame_1867 = function() {
		webAudio.playSound("9wejustlearnthatwecanuse")
	}
	this.frame_2016 = function() {
		if(this.activeA1 && (this.activeA2 || this.activeA3)){
				this.gotoAndPlay("final");
			}else{
				this.gotoAndPlay("menu");
			}
	}
	this.frame_2017 = function() {
		webAudio.playSound("7wejustlearnt")
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(78).call(this.frame_79).wait(62).call(this.frame_141).wait(1).call(this.frame_142).wait(1).call(this.frame_143).wait(121).call(this.frame_264).wait(83).call(this.frame_347).wait(4).call(this.frame_351).wait(1).call(this.frame_352).wait(39).call(this.frame_391).wait(1).call(this.frame_392).wait(55).call(this.frame_447).wait(1).call(this.frame_448).wait(50).call(this.frame_498).wait(1).call(this.frame_499).wait(110).call(this.frame_609).wait(259).call(this.frame_868).wait(1).call(this.frame_869).wait(1).call(this.frame_870).wait(182).call(this.frame_1052).wait(89).call(this.frame_1141).wait(6).call(this.frame_1147).wait(1).call(this.frame_1148).wait(38).call(this.frame_1186).wait(1).call(this.frame_1187).wait(57).call(this.frame_1244).wait(1).call(this.frame_1245).wait(54).call(this.frame_1299).wait(151).call(this.frame_1450).wait(1).call(this.frame_1451).wait(1).call(this.frame_1452).wait(177).call(this.frame_1629).wait(92).call(this.frame_1721).wait(3).call(this.frame_1724).wait(1).call(this.frame_1725).wait(36).call(this.frame_1761).wait(1).call(this.frame_1762).wait(53).call(this.frame_1815).wait(1).call(this.frame_1816).wait(51).call(this.frame_1867).wait(149).call(this.frame_2016).wait(1).call(this.frame_2017).wait(204));

	// Layer 22
	this.instance = new lib.FinalText();
	this.instance.setTransform(426.8,195,1,1,0,0,0,118.3,84);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2017).to({_off:false},0).wait(205));

	// Layer 21
	this.instance_1 = new lib.DrAtomMenu();
	this.instance_1.setTransform(438.2,440.3,1,1,0,0,0,146,205.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2017).to({_off:false},0).wait(205));

	// Text6
	this.instance_2 = new lib._A2Text6();
	this.instance_2.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1867).to({_off:false},0).to({_off:true},150).wait(205));

	// Text5
	this.instance_3 = new lib._A2Text5();
	this.instance_3.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1816).to({_off:false},0).to({_off:true},51).wait(355));

	// Text4
	this.instance_4 = new lib._A2Text4();
	this.instance_4.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1762).to({_off:false},0).to({_off:true},54).wait(406));

	// Text3
	this.instance_5 = new lib._A2Text3();
	this.instance_5.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1725).to({_off:false},0).to({_off:true},37).wait(460));

	// Text2
	this.instance_6 = new lib._A2Text2();
	this.instance_6.setTransform(279,77.4,1,1,0,0,0,203.2,57.6);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1629).to({_off:false},0).to({_off:true},96).wait(497));

	// Text1
	this.instance_7 = new lib._A2Text1();
	this.instance_7.setTransform(194,103,1,1,0,0,0,118.3,84);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1451).to({_off:false},0).to({_off:true},178).wait(593));

	// Layer 18
	this.A3CheckIcon4 = new lib.CheckIcon();
	this.A3CheckIcon4.setTransform(764.2,363.8,1,1,0,0,0,72,26.5);

	this.A3CheckIcon1 = new lib.CheckIcon();
	this.A3CheckIcon1.setTransform(262.5,362.3,1,1,0,0,0,72,26.5);

	this.A3CheckIcon3 = new lib.CheckIcon();
	this.A3CheckIcon3.setTransform(598.2,362.2,1,1,0,0,0,72,26.5);

	this.A3CheckIcon2 = new lib.CheckIcon();
	this.A3CheckIcon2.setTransform(430.4,361.8,1,1,0,0,0,72,26.5);

	this.A3CheckIcon5 = new lib.CheckIcon();
	this.A3CheckIcon5.setTransform(511.9,254.3,1,1,0,0,0,72,26.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.A3CheckIcon5},{t:this.A3CheckIcon2},{t:this.A3CheckIcon3},{t:this.A3CheckIcon1},{t:this.A3CheckIcon4}]},1451).to({state:[]},566).wait(205));

	// Layer 32
	this.shapeClick3 = new lib.ShapeClick();
	this.shapeClick3.setTransform(427.8,550,0.9,0.9,0,0,0,80.5,30);
	this.shapeClick3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeClick3).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 31
	this.shapeClick1 = new lib.ShapeClick();
	this.shapeClick1.setTransform(279.9,607.5,0.9,0.9,0,0,0,80.5,30);
	this.shapeClick1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeClick1).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 30
	this.shapeClick4 = new lib.ShapeClick();
	this.shapeClick4.setTransform(130.6,607.5,0.9,0.9,0,0,0,80.5,30);
	this.shapeClick4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeClick4).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 29
	this.shapeClick2 = new lib.ShapeClick();
	this.shapeClick2.setTransform(279.9,550,0.9,0.9,0,0,0,80.5,30);
	this.shapeClick2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeClick2).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 28
	this.shapeClick5 = new lib.ShapeClick();
	this.shapeClick5.setTransform(131.7,550.2,0.9,0.9,0,0,0,80.5,30);
	this.shapeClick5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeClick5).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 26
	this.checkAnswerClick = new lib.CheckAnswerClick();
	this.checkAnswerClick.setTransform(630.9,590.2,0.9,0.9,0,0,0,109.5,44.5);
	this.checkAnswerClick._off = true;

	this.timeline.addTween(cjs.Tween.get(this.checkAnswerClick).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 25
	this.A3Menu = new lib.ShowAnswerClick();
	this.A3Menu.setTransform(841.9,590.3,0.9,0.9,0,0,0,109,43);
	this.A3Menu._off = true;

	this.timeline.addTween(cjs.Tween.get(this.A3Menu).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Triangles
	this.shapeImage3 = new lib.Shape3();
	this.shapeImage3.setTransform(428.7,550.2,0.9,0.9,0,0,0,80.5,30);
	this.shapeImage3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeImage3).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Pentagols
	this.shapeImage1 = new lib.Shape5();
	this.shapeImage1.setTransform(280.2,607.8,0.9,0.9,0,0,0,80.5,30);
	this.shapeImage1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeImage1).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Circle
	this.shapeImage4 = new lib.Shape4();
	this.shapeImage4.setTransform(131.7,606.9,0.9,0.9,0,0,0,80.5,30);
	this.shapeImage4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeImage4).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Rectangles
	this.shapeImage2 = new lib.Shape2();
	this.shapeImage2.setTransform(280.2,550.2,0.9,0.9,0,0,0,80.5,30);
	this.shapeImage2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeImage2).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Shapes
	this.shapeImage5 = new lib.Shape1();
	this.shapeImage5.setTransform(131.7,550.2,0.9,0.9,0,0,0,80.5,30);
	this.shapeImage5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shapeImage5).wait(1451).to({_off:false},0).to({_off:true},566).wait(205));

	// Layer 24
	this.instance_8 = new lib.Layer24();
	this.instance_8.setTransform(257.2,281.7,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},1451).to({state:[]},566).wait(205));

	// Helping words
	this.instance_9 = new lib.Bitmap11();
	this.instance_9.setTransform(54.8,477.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},1451).to({state:[]},566).wait(205));

	// Layer 21 copy 16
	this.instance_10 = new lib.ShowAnswer();
	this.instance_10.setTransform(841.9,592,0.9,0.9,0,0,0,111.5,45.5);

	this.checkAnswerImage = new lib.CheckAnswerBtn();
	this.checkAnswerImage.setTransform(632.7,592,0.9,0.9,0,0,0,111,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.checkAnswerImage},{t:this.instance_10}]},1451).to({state:[]},566).wait(205));

	// Layer 39 copy 6
	this.A3Bound4 = new lib.A3_Bound();
	this.A3Bound4.setTransform(765.7,362.3,1,1,0,0,0,72.9,26.6);

	this.A3Bound3 = new lib.A3_Bound();
	this.A3Bound3.setTransform(598.3,362.3,1,1,0,0,0,72.9,26.6);

	this.A3Bound2 = new lib.A3_Bound();
	this.A3Bound2.setTransform(430.9,362.3,1,1,0,0,0,72.9,26.6);

	this.A3Bound1 = new lib.A3_Bound();
	this.A3Bound1.setTransform(263.5,362.3,1,1,0,0,0,72.9,26.6);

	this.A3Bound5 = new lib.A3_Bound();
	this.A3Bound5.setTransform(512.8,256.1,1,1,0,0,0,72.9,26.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.A3Bound5},{t:this.A3Bound1},{t:this.A3Bound2},{t:this.A3Bound3},{t:this.A3Bound4}]},1451).to({state:[]},566).wait(205));

	// Layer 6 copy
	this.instance_11 = new lib.Layer6copy();
	this.instance_11.setTransform(43.9,513.3,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11}]},1451).to({state:[]},566).wait(205));

	// Text6
	this.instance_12 = new lib._A2Text6();
	this.instance_12.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1299).to({_off:false},0).to({_off:true},151).wait(772));

	// Text5
	this.instance_13 = new lib._A2Text5();
	this.instance_13.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1245).to({_off:false},0).to({_off:true},54).wait(923));

	// Text4
	this.instance_14 = new lib._A2Text4();
	this.instance_14.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1187).to({_off:false},0).to({_off:true},58).wait(977));

	// Text3
	this.instance_15 = new lib._A2Text3();
	this.instance_15.setTransform(279.9,78.4,1,1,0,0,0,203.2,57.6);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1148).to({_off:false},0).to({_off:true},39).wait(1035));

	// Text2
	this.instance_16 = new lib._A2Text2();
	this.instance_16.setTransform(279,77.4,1,1,0,0,0,203.2,57.6);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1052).to({_off:false},0).to({_off:true},96).wait(1074));

	// Text1
	this.instance_17 = new lib._A2Text1();
	this.instance_17.setTransform(194,103,1,1,0,0,0,118.3,84);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(869).to({_off:false},0).to({_off:true},183).wait(1170));

	// Layer 17
	this.checkIcon4 = new lib.CheckIcon();
	this.checkIcon4.setTransform(856.2,315.4,1,1,0,0,0,72,26.5);

	this.checkIcon3 = new lib.CheckIcon();
	this.checkIcon3.setTransform(708.4,314.4,1,1,0,0,0,72,26.5);

	this.checkIcon2 = new lib.CheckIcon();
	this.checkIcon2.setTransform(558,315.4,1,1,0,0,0,72,26.5);

	this.checkIcon5 = new lib.CheckIcon();
	this.checkIcon5.setTransform(631.1,227.5,1,1,0,0,0,72,26.5);

	this.checkIcon1 = new lib.CheckIcon();
	this.checkIcon1.setTransform(406.9,315.4,1,1,0,0,0,72,26.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.checkIcon1},{t:this.checkIcon5},{t:this.checkIcon2},{t:this.checkIcon3},{t:this.checkIcon4}]},869).to({state:[]},581).to({state:[]},1).wait(771));

	// Layer 33
	this.A2checkAnswerClick = new lib.CheckAnswerClick();
	this.A2checkAnswerClick.setTransform(616.7,622,0.9,0.9,0,0,0,109.5,44.5);
	this.A2checkAnswerClick._off = true;

	this.timeline.addTween(cjs.Tween.get(this.A2checkAnswerClick).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 32
	this.A2Menu = new lib.ShowAnswerClick();
	this.A2Menu.setTransform(830.4,622.4,0.9,0.9,0,0,0,109,43);
	this.A2Menu._off = true;

	this.timeline.addTween(cjs.Tween.get(this.A2Menu).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 31
	this.drinkClick1 = new lib.DrinkClick1();
	this.drinkClick1.setTransform(141.3,516.9,0.9,0.9,0,0,0,80,29);
	this.drinkClick1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drinkClick1).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 29
	this.drinkClick2 = new lib.DrinkClick2();
	this.drinkClick2.setTransform(313.6,515.9,0.9,0.9,0,0,0,80,29);
	this.drinkClick2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drinkClick2).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 28
	this.drinkClick3 = new lib.DrinkClick3();
	this.drinkClick3.setTransform(485.1,515.9,0.9,0.9,0,0,0,80,29);
	this.drinkClick3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drinkClick3).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 27
	this.drinkClick4 = new lib.DrinkClick4();
	this.drinkClick4.setTransform(656.5,517.9,0.9,0.9,0,0,0,80,29);
	this.drinkClick4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drinkClick4).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 26
	this.drinkClick5 = new lib.DrinkClick5();
	this.drinkClick5.setTransform(828.1,515.9,0.9,0.9,0,0,0,80,29);
	this.drinkClick5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drinkClick5).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 30
	this.instance_18 = new lib.sue();
	this.instance_18.setTransform(6.9,176,0.6,0.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},869).to({state:[]},581).to({state:[]},1).wait(771));

	// Milk
	this.drink3 = new lib.Drink3();
	this.drink3.setTransform(485.1,515.7,0.9,0.9,0,0,0,80.5,30);
	this.drink3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drink3).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Soya Bean  milk
	this.drink4 = new lib.Drink4();
	this.drink4.setTransform(656.8,515.7,0.9,0.9,0,0,0,80.5,30);
	this.drink4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drink4).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Drinks
	this.drink5 = new lib.Drink5();
	this.drink5.setTransform(828.5,515.7,0.9,0.9,0,0,0,80.5,30);
	this.drink5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drink5).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Green tea
	this.drink2 = new lib.Drink2();
	this.drink2.setTransform(313.4,515.7,0.9,0.9,0,0,0,80.5,30);
	this.drink2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drink2).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Fruit juice
	this.drink1 = new lib.Drink1();
	this.drink1.setTransform(141.8,515.7,0.9,0.9,0,0,0,80.5,30);
	this.drink1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.drink1).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 24 copy 2
	this.instance_19 = new lib.Layer24copy2();
	this.instance_19.setTransform(376.2,253.8,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_19}]},869).to({state:[]},581).to({state:[]},1).wait(771));

	// Helping words
	this.instance_20 = new lib.Bitmap11();
	this.instance_20.setTransform(44,428.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20}]},869).to({state:[]},581).to({state:[]},1).wait(771));

	// Layer 6 copy 2
	this.instance_21 = new lib.Layer6copy2();
	this.instance_21.setTransform(39.6,464.4,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21}]},869).to({state:[]},581).to({state:[]},1).wait(771));

	// Layer 34
	this.A2Bound4 = new lib.Bound2();
	this.A2Bound4.setTransform(857.7,315.5,0.9,0.9,0,0,0,81,29.5);

	this.A2Bound3 = new lib.Bound2();
	this.A2Bound3.setTransform(707.4,315.5,0.9,0.9,0,0,0,81,29.5);

	this.A2Bound2 = new lib.Bound2();
	this.A2Bound2.setTransform(558,315.5,0.9,0.9,0,0,0,81,29.5);

	this.A2Bound1 = new lib.Bound2();
	this.A2Bound1.setTransform(406.8,315.5,0.9,0.9,0,0,0,81,29.5);

	this.A2Bound5 = new lib.Bound2();
	this.A2Bound5.setTransform(632,228.3,0.9,0.9,0,0,0,81,29.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.A2Bound5},{t:this.A2Bound1},{t:this.A2Bound2},{t:this.A2Bound3},{t:this.A2Bound4}]},869).to({state:[]},581).to({state:[]},1).wait(771));

	// Layer 23
	this.A2checkAnswerImage = new lib.CheckAnswerBtn();
	this.A2checkAnswerImage.setTransform(619.4,624.2,0.9,0.9,0,0,0,111,45.5);
	this.A2checkAnswerImage._off = true;

	this.timeline.addTween(cjs.Tween.get(this.A2checkAnswerImage).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 24
	this.instance_22 = new lib.ShowAnswer();
	this.instance_22.setTransform(832.1,624.2,0.9,0.9,0,0,0,111.5,45.5);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(869).to({_off:false},0).to({_off:true},581).wait(772));

	// Layer 2
	this.click5_2 = new lib._5_2Click();
	this.click5_2.setTransform(860,524.2,1,1,0,0,0,58,56.5);

	this.click5_1 = new lib._5_1Click();
	this.click5_1.setTransform(740.1,524.2,1,1,0,0,0,56,53.5);

	this.click4_2 = new lib._4_2Click();
	this.click4_2.setTransform(602.2,528.2,1,1,0,0,0,63.4,49.9);

	this.click4_1 = new lib._4_1Click();
	this.click4_1.setTransform(491.8,518.2,1,1,0,0,0,39,62.5);

	this.click3_2 = new lib._3_2Click();
	this.click3_2.setTransform(385.9,524.2,1,1,0,0,0,51,46);

	this.click3_1 = new lib._3_1Click();
	this.click3_1.setTransform(276.3,524.2,1,1,0,0,0,52,34.6);

	this.click0_2 = new lib._0_2Click();
	this.click0_2.setTransform(180.3,524.2,1,1,0,0,0,39.5,61);

	this.click0_1 = new lib._0_1Click();
	this.click0_1.setTransform(80,526.2,1,1,0,0,0,57,56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.click0_1},{t:this.click0_2},{t:this.click3_1},{t:this.click3_2},{t:this.click4_1},{t:this.click4_2},{t:this.click5_1},{t:this.click5_2}]},142).to({state:[]},727).wait(1353));

	// Layer 1
	this.image5_2 = new lib._5_2();
	this.image5_2.setTransform(860.1,526.2,1,1,0,0,0,58,56.5);

	this.image5_1 = new lib._5_1();
	this.image5_1.setTransform(740,523.2,1,1,0,0,0,56,53.5);

	this.image4_2 = new lib._4_2();
	this.image4_2.setTransform(601.8,531.2,1,1,0,0,0,64.5,50.5);

	this.image4_1 = new lib._4_1();
	this.image4_1.setTransform(489.8,519.2,1,1,0,0,0,39,62.5);

	this.image3_2 = new lib._3_2();
	this.image3_2.setTransform(385.8,522.2,1,1,0,0,0,51,46);

	this.image3_1 = new lib._3_1();
	this.image3_1.setTransform(275.9,525.8,1,1,0,0,0,52.5,36);

	this.image0_2 = new lib._0_2();
	this.image0_2.setTransform(178.3,524.2,1,1,0,0,0,39.5,61);

	this.image0_1 = new lib._0_1();
	this.image0_1.setTransform(80,525.7,1,1,0,0,0,57,56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.image0_1},{t:this.image0_2},{t:this.image3_1},{t:this.image3_2},{t:this.image4_1},{t:this.image4_2},{t:this.image5_1},{t:this.image5_2}]},142).to({state:[]},727).wait(1353));

	// Layer 7
	this.A1Menu = new lib._Click();
	this.A1Menu.setTransform(92.9,638.2,1,1,0,0,0,76,29.4);

	this.A1showAnswerClick = new lib._Click();
	this.A1showAnswerClick.setTransform(803.2,636.7,1,1,0,0,0,76,29.4);

	this.A1checkAnswerClick = new lib._Click();
	this.A1checkAnswerClick.setTransform(632.2,637.6,1,1,0,0,0,76,29.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.A1checkAnswerClick},{t:this.A1showAnswerClick},{t:this.A1Menu}]},142).to({state:[]},727).wait(1353));

	// Layer 13
	this.instance_23 = new lib._MenuA1();
	this.instance_23.setTransform(95,638.7,1,1,0,0,0,78,31.9);

	this.showAnswerImage = new lib._ShowAnswer();
	this.showAnswerImage.setTransform(805.2,638.7,1,1,0,0,0,78,31.9);

	this.A1checkAnswerImage = new lib._CheckAnswer();
	this.A1checkAnswerImage.setTransform(633.2,639.2,1,1,0,0,0,78,31.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.A1checkAnswerImage},{t:this.showAnswerImage},{t:this.instance_23}]},142).to({state:[]},727).wait(1353));

	// Layer 14
	this.A1Bound4 = new lib.A1Bound();
	this.A1Bound4.setTransform(684,278);

	this.A1Bound2 = new lib.A1Bound();
	this.A1Bound2.setTransform(684,102);

	this.A1Bound3 = new lib.A1Bound();
	this.A1Bound3.setTransform(428,278);

	this.A1Bound1 = new lib.A1Bound();
	this.A1Bound1.setTransform(428,102);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.A1Bound1},{t:this.A1Bound3},{t:this.A1Bound2},{t:this.A1Bound4}]},142).to({state:[]},727).wait(1353));

	// Layer 6
	this.instance_24 = new lib._A1EndMessage2();
	this.instance_24.setTransform(171,137.6,1,1,0,0,0,118.3,121.6);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(609).to({_off:false},0).to({_off:true},260).wait(1353));

	// Text6
	this.instance_25 = new lib._A1EndMessage1();
	this.instance_25.setTransform(171,100,1,1,0,0,0,118.3,84);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(499).to({_off:false},0).to({_off:true},110).wait(1613));

	// Text5
	this.instance_26 = new lib._AnswerMessage3();
	this.instance_26.setTransform(171,100,1,1,0,0,0,118.3,84);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(448).to({_off:false},0).to({_off:true},51).wait(1723));

	// Text4
	this.instance_27 = new lib._AnswerMessage2();
	this.instance_27.setTransform(170,100,1,1,0,0,0,118.3,84);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(392).to({_off:false},0).to({_off:true},56).wait(1774));

	// Text3
	this.instance_28 = new lib._AnswerMessage1();
	this.instance_28.setTransform(170.5,100,1,1,0,0,0,118.3,84);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(352).to({_off:false},0).to({_off:true},40).wait(1830));

	// Text2
	this.instance_29 = new lib._A1Text2();
	this.instance_29.setTransform(170.5,100,1,1,0,0,0,118.3,84);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(264).to({_off:false},0).to({_off:true},88).wait(1870));

	// Text1
	this.instance_30 = new lib._A1Text1();
	this.instance_30.setTransform(170.5,100,1,1,0,0,0,118.3,84);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(142).to({_off:false},0).to({_off:true},122).wait(1958));

	// Layer 12
	this.foo_mc = new lib.Symbol1();
	this.foo_mc.setTransform(482.4,526.1,1,1,0,0,0,469.5,73);
	this.foo_mc._off = true;

	this.timeline.addTween(cjs.Tween.get(this.foo_mc).wait(142).to({_off:false},0).to({_off:true},727).wait(1353));

	// Layer 11
	this.instance_31 = new lib._A1BoundImage();
	this.instance_31.setTransform(680.4,248.2,0.911,0.911,0,0,0,293.4,204.5);
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(142).to({_off:false},0).to({_off:true},727).wait(1353));

	// Layer 16
	this.finalClick = new lib.MenuClick();
	this.finalClick.setTransform(733.3,480.7,1,1,0,0,0,110,45);

	this.activity2Click = new lib.MenuClick();
	this.activity2Click.setTransform(730,354.9,1,1,0,0,0,110,45);

	this.activity1Click = new lib.MenuClick();
	this.activity1Click.setTransform(729.8,231,1,1,0,0,0,110,45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.activity1Click},{t:this.activity2Click},{t:this.finalClick}]},79).to({state:[]},63).wait(2080));

	// Buttons
	this.finalImage = new lib._MenuBtn3();
	this.finalImage.setTransform(731.8,480.2,1,1,0,0,0,111.5,45.5);

	this.instance_32 = new lib._MenuBtn2();
	this.instance_32.setTransform(731.8,357.3,1,1,0,0,0,111.5,45.5);

	this.instance_33 = new lib._MenuBtn1();
	this.instance_33.setTransform(731.8,234.4,1,1,0,0,0,111.5,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33},{t:this.instance_32},{t:this.finalImage}]},79).to({state:[]},63).wait(2080));

	// Text2
	this.instance_34 = new lib._Text2();
	this.instance_34.setTransform(210.1,211.1,1,1,0,0,0,118.3,84);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(79).to({_off:false},0).to({_off:true},63).wait(2080));

	// Text1
	this.instance_35 = new lib._Text1();
	this.instance_35.setTransform(210.1,211.1,1,1,0,0,0,118.3,84);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1).to({_off:false},0).to({_off:true},78).wait(2143));

	// Atom
	this.instance_36 = new lib._Atom();
	this.instance_36.setTransform(166.1,470.3,1,1,0,0,0,116.8,164.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(142).to({scaleX:0.95,scaleY:0.95,x:169,y:324.7},0).to({_off:true},727).wait(1353));

	// LogoTitle
	this.text = new cjs.Text("Learn: Classification of Things", "bold 30px Drescher Grotesk BT MCO");
	this.text.lineHeight = 30;
	this.text.setTransform(34.9,7);

	this.instance_37 = new lib.MClogo();
	this.instance_37.setTransform(759.2,4.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("EhTlAKTIAA0lMCnLAAAIAAUlg");
	this.shape.setTransform(444.6,-9.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_37},{t:this.text}]}).to({state:[{t:this.instance_37}]},1).wait(2221));

	// NormalScreenButton
	this.normalScreenBtn = new lib.NormalScreenBtn();
	this.normalScreenBtn.setTransform(942.8,687.6,1,1,0,0,0,15.1,11.3);

	this.normalScreenImage = new lib.NormalScreenImage();
	this.normalScreenImage.setTransform(943.2,687.6,1,1,0,0,0,15,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.normalScreenImage},{t:this.normalScreenBtn}]}).wait(2222));

	// FullScreenButton
	this.fullScreenBtn = new lib.FullScreenClick();
	this.fullScreenBtn.setTransform(943.2,687.6,1,1,0,0,0,14.8,11.8);

	this.fullScreenImage = new lib.FullScreenButton();
	this.fullScreenImage.setTransform(943.2,687.6,1,1,0,0,0,15,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.fullScreenImage},{t:this.fullScreenBtn}]}).wait(2222));

	// Layer 5
	this.screenBg = new lib.ScreenBg();
	this.screenBg.setTransform(469.2,721.9,1,1,0,0,0,497.4,50.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.screenBg}]}).wait(2222));

	// PlayBtn
	this.playBtn = new lib.PlayButton();
	this.playBtn.setTransform(518.1,361.1);

	this.instance_38 = new lib.PlayButt();
	this.instance_38.setTransform(519.1,358.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_38},{t:this.playBtn}]}).to({state:[]},1).wait(2221));

	// Layer 3
	this.instance_39 = new lib.bg2();
	this.instance_39.setTransform(-51.7,-19.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_39}]}).to({state:[]},142).to({state:[{t:this.instance_39}]},1875).wait(205));

	// Background
	this.instance_40 = new lib._Background();
	this.instance_40.setTransform(480.2,355.1,1,1,0,0,0,512,362);
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(142).to({_off:false},0).to({_off:true},1875).wait(205));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90.4,-75.3,1070.2,848.1);


// symbols:
(lib.bg2 = function() {
	this.initialize(img.bg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,724);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,133,33);


(lib.Bitmap10 = function() {
	this.initialize(img.Bitmap10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,121,39);


(lib.Bitmap11 = function() {
	this.initialize(img.Bitmap11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,97,39);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,31);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,121,31);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,187,39);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,358,140);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,226,94);


(lib.Bitmap8 = function() {
	this.initialize(img.Bitmap8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,145,39);


(lib.Bitmap9 = function() {
	this.initialize(img.Bitmap9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,127,39);


(lib.but = function() {
	this.initialize(img.but);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,23);


(lib.but2 = function() {
	this.initialize(img.but2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,23);


(lib.Checkanswercopy = function() {
	this.initialize(img.Checkanswercopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,182,22);


(lib.Circle = function() {
	this.initialize(img.Circle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,69,21);


(lib.Circles = function() {
	this.initialize(img.Circles);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,81,21);


(lib.dratom_Full = function() {
	this.initialize(img.dratom_Full);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,584,821);


(lib.dratom_Full_1 = function() {
	this.initialize(img.dratom_Full_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,584,821);


(lib.Drinks = function() {
	this.initialize(img.Drinks);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,78,21);


(lib.Fruitjuice = function() {
	this.initialize(img.Fruitjuice);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,26);


(lib.Greentea = function() {
	this.initialize(img.Greentea);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,120,20);


(lib.Helpingwords = function() {
	this.initialize(img.Helpingwords);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,198,28);


(lib.Helpingwords_1 = function() {
	this.initialize(img.Helpingwords_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,198,28);


(lib.Layer11 = function() {
	this.initialize(img.Layer11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,116,113);


(lib.Layer16 = function() {
	this.initialize(img.Layer16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,101);


(lib.Layer17 = function() {
	this.initialize(img.Layer17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,78,125);


(lib.Layer19 = function() {
	this.initialize(img.Layer19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,72);


(lib.Layer2 = function() {
	this.initialize(img.Layer2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,282);


(lib.Layer20 = function() {
	this.initialize(img.Layer20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,102,92);


(lib.Layer21 = function() {
	this.initialize(img.Layer21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,114,112);


(lib.Layer21copy16 = function() {
	this.initialize(img.Layer21copy16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.Layer21copy16_1 = function() {
	this.initialize(img.Layer21copy16_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,222,91);


(lib.Layer21copy3 = function() {
	this.initialize(img.Layer21copy3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,222,91);


(lib.Layer21copy4 = function() {
	this.initialize(img.Layer21copy4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.Layer21copy6 = function() {
	this.initialize(img.Layer21copy6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,275,188);


(lib.Layer21copy7 = function() {
	this.initialize(img.Layer21copy7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,275,188);


(lib.Layer21copy8 = function() {
	this.initialize(img.Layer21copy8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,275,188);


(lib.Layer21copy8_1 = function() {
	this.initialize(img.Layer21copy8_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,275,188);


(lib.Layer21copy9 = function() {
	this.initialize(img.Layer21copy9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,587,409);


(lib.Layer22 = function() {
	this.initialize(img.Layer22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,79,122);


(lib.Layer23 = function() {
	this.initialize(img.Layer23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,112,107);


(lib.Layer24 = function() {
	this.initialize(img.Layer24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,568,64);


(lib.Layer24copy2 = function() {
	this.initialize(img.Layer24copy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,568,43);


(lib.Layer26 = function() {
	this.initialize(img.Layer26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,110,102);


(lib.Layer27 = function() {
	this.initialize(img.Layer27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,106,104);


(lib.Layer30 = function() {
	this.initialize(img.Layer30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,313,338);


(lib.Layer37copy10 = function() {
	this.initialize(img.Layer37copy10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy11 = function() {
	this.initialize(img.Layer37copy11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy12 = function() {
	this.initialize(img.Layer37copy12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy13 = function() {
	this.initialize(img.Layer37copy13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy14 = function() {
	this.initialize(img.Layer37copy14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy15 = function() {
	this.initialize(img.Layer37copy15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy15_1 = function() {
	this.initialize(img.Layer37copy15_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy15_2 = function() {
	this.initialize(img.Layer37copy15_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy15_3 = function() {
	this.initialize(img.Layer37copy15_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer37copy15_4 = function() {
	this.initialize(img.Layer37copy15_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Layer39copy2 = function() {
	this.initialize(img.Layer39copy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy3 = function() {
	this.initialize(img.Layer39copy3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy4 = function() {
	this.initialize(img.Layer39copy4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy5 = function() {
	this.initialize(img.Layer39copy5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy6 = function() {
	this.initialize(img.Layer39copy6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy8 = function() {
	this.initialize(img.Layer39copy8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy8_1 = function() {
	this.initialize(img.Layer39copy8_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy8_2 = function() {
	this.initialize(img.Layer39copy8_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy8_3 = function() {
	this.initialize(img.Layer39copy8_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer39copy8_4 = function() {
	this.initialize(img.Layer39copy8_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Layer5 = function() {
	this.initialize(img.Layer5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,345,145);


(lib.Layer6 = function() {
	this.initialize(img.Layer6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,981,146);


(lib.Layer6copy = function() {
	this.initialize(img.Layer6copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,530,147);


(lib.Layer6copy2 = function() {
	this.initialize(img.Layer6copy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,992,115);


(lib.MClogo = function() {
	this.initialize(img.MClogo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,35);


(lib.Milk = function() {
	this.initialize(img.Milk);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,21);


(lib.Pentagols = function() {
	this.initialize(img.Pentagols);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,27);


(lib.Pentagons = function() {
	this.initialize(img.Pentagons);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,131,26);


(lib.playpngcopy = function() {
	this.initialize(img.playpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,239);


(lib.Rectangles = function() {
	this.initialize(img.Rectangles);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,135,27);


(lib.Shapes = function() {
	this.initialize(img.Shapes);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,89,27);


(lib.Showanswercopy = function() {
	this.initialize(img.Showanswercopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,174,22);


(lib.SoyaBeanmilk = function() {
	this.initialize(img.SoyaBeanmilk);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,97,41);


(lib.sue = function() {
	this.initialize(img.sue);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,537,390);


(lib.Triangles = function() {
	this.initialize(img.Triangles);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,113,27);


(lib.VectorSmartObject = function() {
	this.initialize(img.VectorSmartObject);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,724);


(lib.TrueIconSmall = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer26();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,55,51);


(lib.TrueIcon = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer26();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,110,102);


(lib.Text2 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Click on one of the tabs to learn \nabout classification.", "18px Myriad Pro");
	this.text.lineHeight = 20;
	this.text.setTransform(10,20.4);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhlCvQAshDAWg0QAYg4ALhTQALhRgFg/ICoglQgZB4gaBFQgfBNg9BVQggAwg9AzQg5Ayg1AdQAcgZArhBg");
	this.shape.setTransform(205.7,106.5,1.101,0.774);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwNJYQh4AAAAh4IAAu/QAAh4B4AAMAgbAAAQB4AAAAB4IAAO/QAAB4h4AAg");
	this.shape_1.setTransform(128.7,47.3,1.101,0.774);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AiyEiQgJgCgGgIQgFgHABgKQABgJAHgHQAagYApg+IAAABQArhBAWgzQAXg0ALhQQALhOgFg8QAAgJAFgIQAGgIAHgCICngmQAJgCAHAEQAIAEAEAIQAEAHgCAJQgZB6gbBHQggBQg/BYQgjAyg9A2Qg8Azg3AfQgGADgGAAIgGgBg");
	this.shape_2.setTransform(207.3,107.5,1.101,0.774);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("AwNJxQiRAAAAiRIAAu/QAAiRCRAAMAgbAAAQCRAAAACRIAAO/QAACRiRAAg");
	this.shape_3.setTransform(130.3,48.4,1.101,0.774);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,260.7,130.1);


(lib.Text1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Hello everyone. Has anyone \nheard of the term classification?", "18px Myriad Pro");
	this.text.lineHeight = 20;
	this.text.setTransform(10,20.4);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhwCIQAxg1AZgoQAagrAMhAQAMg/gGgwIC5gdQgbBdgdA1QgiA7hEBCQgjAmhCAoQg/Amg7AXQAegUAwgyg");
	this.shape.setTransform(205.7,106.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2HRQiEgBAAhdIAArlQAAheCEAAMAjtAAAQCEAAAABeIAALlQAABdiEABg");
	this.shape_1.setTransform(128.7,47.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEDgQgKgBgHgGQgGgGACgHQABgIAHgFQAegTAtgvIAAAAQAvgyAYgnQAZgoAMg+QANg9gGguQAAgHAGgGQAGgGAIgCIC4gdQAKgCAIADQAJADAEAGQAEAGgCAHQgbBegeA3QgjA9hGBFQgnAmhDAqQhCAog9AYQgGACgGAAIgHgBg");
	this.shape_2.setTransform(207.3,107.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2HkQigAAAAhwIAArnQAAhwCgAAMAjtAAAQCgAAAABwIAALnQAABwigAAg");
	this.shape_3.setTransform(130.3,48.4);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,260.7,130.1);


(lib.Symbol1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer6();
	this.instance.setTransform(0,0,0.957,1);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,939,146);


(lib.ShowAnswerClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AxAGtIAAtZMAiBAAAIAANZg");
	this.shape.setTransform(109,43);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,217.9,86);


(lib.ShowAnswer = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.ShapeClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AskEsIAApXIZJAAIAAJXg");
	this.shape.setTransform(80.5,30);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Shape5 = function() {
	this.initialize();

	// Pentagons
	this.instance = new lib.Pentagons();
	this.instance.setTransform(15,21.8);

	// Layer 1
	this.instance_1 = new lib.Layer37copy12();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Shape4 = function() {
	this.initialize();

	// Circles
	this.instance = new lib.Circles();
	this.instance.setTransform(40,21.3);

	// Layer 1
	this.instance_1 = new lib.Layer37copy11();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Shape3 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Triangles();
	this.instance.setTransform(22,20);

	this.instance_1 = new lib.Layer37copy13();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Shape2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Rectangles();
	this.instance.setTransform(14,21);

	this.instance_1 = new lib.Layer37copy14();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Shape1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Shapes();
	this.instance.setTransform(34,20);

	this.instance_1 = new lib.Layer37copy10();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.ScreenBg = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("EhNsAH8IAAv3MCbZAAAIAAP3g");
	this.shape.setTransform(497.4,50.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,994.8,101.8);


(lib.PlayButton = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AzXTiMAAAgnDMAmvAAAMAAAAnDg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-123.9,-125,248.1,250.1);


(lib.PlayButt = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.playpngcopy();
	this.instance.setTransform(-119.9,-119.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-119.9,-119.4,240,239);


(lib.NormalScreenImage = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.but2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,30,23);


(lib.NormalScreenBtn = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AiWBwIAAjfIEtAAIAADfg");
	this.shape.setTransform(15.1,11.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,30.3,22.5);


(lib.MenuClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AxKHCIAAuDMAiVAAAIAAODg");
	this.shape.setTransform(110,45);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,220,90);


(lib.FullScreenClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AiSB1IAAjpIElAAIAADpg");
	this.shape.setTransform(14.8,11.8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,29.5,23.5);


(lib.FullScreenButton = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.but();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,30,23);


(lib.FinalText = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("We just learnt that classification is grouping things with similar characteristics. We can use a table or a diagram to show how things are classified.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 332;
	this.text.setTransform(-57.9,10);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhlCvQAshDAXg0QAYg4AKhTQALhRgFg/ICngmQgYB4gbBFQgeBOg+BWQgfAvg8A0Qg6Axg2AdQAdgZArhBg");
	this.shape.setTransform(222.7,135.6,1.642,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwNJYQh4AAAAh4IAAu/QAAh4B4AAMAgbAAAQB4AAAAB4IAAO/QAAB4h4AAg");
	this.shape_1.setTransform(107.9,59.2,1.642,1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AiyEiQgJgCgGgIQgFgHABgKQABgJAHgHQAagYApg+IAAABQArhBAWgzQAXg0ALhQQALhOgFg8QAAgJAFgIQAGgIAHgCICngmQAJgCAHAEQAIAEAEAIQAEAHgCAJQgZB6gbBHQggBQg/BYQgjAyg9A2Qg8Azg3AfQgGADgGAAIgGgBg");
	this.shape_2.setTransform(225.1,136.9,1.642,1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("AwNJxQiRAAAAiRIAAu/QAAiRCRAAMAgbAAAQCRAAAACRIAAO/QAACRiRAAg");
	this.shape_3.setTransform(110.3,60.6,1.642,1);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-83.9,-1.9,388.6,168.1);


(lib.FinalMenuBtn = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("Main Finale ", "87px Myriad Pro Light", "#FEFEFE");
	this.text.lineHeight = 87;
	this.text.lineWidth = 440;
	this.text.setTransform(32.4,23,0.356,0.356);

	this.instance = new lib.Layer21copy4();

	this.addChild(this.instance,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.FalseIconSmall = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer27();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,53,52);


(lib.FalseIcon = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer27();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,106,104);


(lib.DrinkClick5 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AseEhIAApCIY9AAIAAJCg");
	this.shape.setTransform(80,29);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,160,58);


(lib.DrinkClick4 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AseEhIAApCIY9AAIAAJCg");
	this.shape.setTransform(80,29);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,160,58);


(lib.DrinkClick3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AseEhIAApCIY9AAIAAJCg");
	this.shape.setTransform(80,29);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,160,58);


(lib.DrinkClick2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AseEhIAApCIY9AAIAAJCg");
	this.shape.setTransform(80,29);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,160,58);


(lib.DrinkClick1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AseEhIAApCIY9AAIAAJCg");
	this.shape.setTransform(80,29);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,160,58);


(lib.Drink5 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Drinks();
	this.instance.setTransform(40,19);

	this.instance_1 = new lib.Layer37copy15_3();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Drink4 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.SoyaBeanmilk();
	this.instance.setTransform(33,11);

	this.instance_1 = new lib.Layer37copy15_4();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Drink3 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Milk();
	this.instance.setTransform(53,20);

	this.instance_1 = new lib.Layer37copy15();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Drink2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Greentea();
	this.instance.setTransform(22,22);

	this.instance_1 = new lib.Layer37copy15_2();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.Drink1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Fruitjuice();
	this.instance.setTransform(18,21);

	this.instance_1 = new lib.Layer37copy15_1();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,161,60);


(lib.DrAtomMenu = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.dratom_Full();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,292,410.5);


(lib.CheckAnswerClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AxFG9IAAt5MAiLAAAIAAN5g");
	this.shape.setTransform(109.5,44.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,218.9,89);


(lib.CheckAnswerBtn = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(17.7,22);

	this.instance_1 = new lib.Layer21copy3();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,222,91);


(lib.Bound5 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer39copy8_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Bound4 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer39copy8_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Bound3 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer39copy8_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Bound2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer39copy8_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Bound1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer39copy8();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,162,59);


(lib.Activity2MenuClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AxBGjIAAtGMAiCAAAIAANGg");
	this.shape.setTransform(109,42);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,218,84);


(lib.Activity2MenuBtn = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("Activity 2", "87px Myriad Pro Light", "#FEFEFE");
	this.text.lineHeight = 87;
	this.text.lineWidth = 356;
	this.text.setTransform(47.4,23,0.356,0.356);

	this.instance = new lib.Layer21copy4();

	this.addChild(this.instance,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.Activity1MenuClick = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AxGGzIAAtlMAiMAAAIAANlg");
	this.shape.setTransform(109.5,43.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,219,87);


(lib.Activity1MenuBtn = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("Activity 1", "87px Myriad Pro Light", "#FEFEFE");
	this.text.lineHeight = 87;
	this.text.lineWidth = 356;
	this.text.setTransform(47.4,23,0.356,0.356);

	this.instance = new lib.Layer21copy4();

	this.addChild(this.instance,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib.A3_Bound = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer39copy6();
	this.instance.setTransform(0,0,0.9,0.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,145.8,53.1);


(lib._5_2Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.498)").s().p("AAAgJIAAABIAAASIAAgTg");
	this.shape.setTransform(116,80.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.02)").s().p("Ai4I1IgBgFIACAAIgDgDIgDgGIgCgDQgEgHgGgFQgGgEgIgEQktj7g/m5IAAhuQAwADAtgyIAFgFQADgCgBgFQALgBAHgEIAFgBQAHgEALgBQAFgJAHgIIAFgFQACgDABgFQB/g+BphVIAFgFQACgDAAgFQAUgFATgIIAEgEQADgCAEgBIAAgEIgYAAIAFgGIAXAAQAYAPA1AEIAAABQD+AiEbA+IACABQAIADAKAAQAcDBAgC8QAAAFADACQADADAFAAIAADKIgFAEIgFhFIgBAKQgLCbgTCSQlZBPlMBbg");
	this.shape_1.setTransform(58,56.5);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,116,113);


(lib._5_2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer11();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,116,113);


(lib._5_1Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AliIWQACgKgBgJQgKgtgOgrQgxiWg3iXQgnhpgfhrQgIgXAAgZIIVl6QAOgEAJgNIACgEIAfABIACAFIABABIgOACIAPAAIAEAFIgIAAQCKBtCSBpQBbBBBdBAIA9AqQgKBcgiBYQgWA8gUA8Ig+C0QgeBaggBYIAQAKg");
	this.shape.setTransform(56,53.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0.1,112,107);


(lib._5_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer23();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,112,107);


(lib._4_2Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("An5HKIh/gtIAKuOITnAjIgPM0IhrCMg");
	this.shape.setTransform(63.4,49.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,126.8,99.8);


(lib._4_2 = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.Layer16();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,129,101);


(lib._4_1Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.498)").s().p("AgXAAIAYAAIAXAAIgBAAg");
	this.shape.setTransform(42.9,124.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.02)").s().p("AjXJxQAAgFgDgFQgBgGgCgCQhfhQg1h7IABgKQAYm/gtl9IAAg8QArgqA3ggIA4gfQAegKAegPIBUAAIAJAJIhMABIBNAAIAGAFIgiABIAAAEIA9AHQANADAQAAIADAAQDHAYC6AnQALACAKAFIAABIIgGAOIgEAJIAAgYIgFAAQhDHSAMG6QgBAEgBAFQgGAWgCAdQjsA7jzAzg");
	this.shape_1.setTransform(39,62.5);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,78,125);


(lib._4_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer17();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,78,125);


(lib._3_2Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("An9HLIAAgwQAGgDAEgEIAAAGIAGgNQALgOAIgcQAuhpAthsQB8koCCknIAAgEIgjAAIAAgGICDAAQABAPAHAHIACACIgtACIAJAEQAdABAQAOQAGAFAHAFQABAAAAAGQDTBdCACzQBcB+A6CgQADAlAGAhQACAFACACQACACAFABIAABfQgDgYgHgMQhGAYhQAMIgdAEQiWAIi0AfQigAciLAlIhaAQg");
	this.shape.setTransform(51,46);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,102,92);


(lib._3_2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer20();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,102,92);


(lib._3_1Click = function() {
	this.initialize();

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(192,192,192,0.02)").s().p("AntFcIgakiIKomVIFnGfIgyEYg");
	this.shape.setTransform(52,34.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-0.2,104,69.8);


(lib._3_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer19();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,105,72);


(lib._0_2Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.498)").s().p("AgMAEIAOAAIgPABgAgFgEIATAAIgUABg");
	this.shape.setTransform(16.6,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.02)").s().p("AhMJiIgDgFIgFgEIAygCIAAgKIAAgUIAAl7QhWgShAgrQgJABgIgFQiQhjgxiRIAAi0QAliFBYhTQAmgjA5gTQAWgSAdgIIAcgIQABgBAAgFIDWAAIADAJIgdABIAdAAIACAGIAAAAIAAAEIAEACQAOASAlALIASAAQBaArAxBVQAhA4AZBBIAADgIgIAJIgCgrQgvC2iaBMQhPAVg8AoIAAAJIAAGGIAAAAIAAAGIABAFg");
	this.shape_1.setTransform(39.5,61);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,79,122);


(lib._0_2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer22();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,79,122);


(lib._0_1Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("AjTIvIgJgHICNgDQhkgPhQgiQAAgGgCgBQj7iMg5kbIAAiLQA3jgCViDQAdgbAjgUQBQgJAkggQAKgJAGgMIAggJIAvgLQABgBAAgFID2AAIADAJIhHABIBIAAIAEAFIgZABIAAAEQAWACATAFQANADALAFQAKAFAIAFQAGAFAJAFQABAAABAGQCsBEBTCfQAzBfAYCAIAAB2IgIAUIgCgeIgCAKQgLA0gIA5QgJALgFAMQhTDSjKBYQhIAmhZAVg");
	this.shape.setTransform(57,56);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FEFEFE").s().p("AghAAIAhAAIAiAAIgBAAg");
	this.shape_1.setTransform(83.4,111.9);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,114,112);


(lib._0_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Layer21();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,114,112);


(lib._Text2 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Click on one of the tabs to learn about classification.", "24px Drescher Grotesk BT MCO");
	this.text.lineHeight = 24;
	this.text.lineWidth = 188;
	this.text.setTransform(18,17.7);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhlCvQAshDAWg0QAZg4AKhTQALhRgFg/ICnglQgYB4gaBFQggBNg9BVQggAwg8AzQg5Ayg1AeQAcgaArhBg");
	this.shape.setTransform(186.8,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwNJYQh4AAAAh4IAAu/QAAh4B4AAMAgbAAAQB4AAAAB4IAAO/QAAB4h4AAg");
	this.shape_1.setTransform(116.8,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AiyEiQgJgCgGgIQgFgHABgKQABgJAHgHQAagYApg+IAAABQArhBAWgzQAXg0ALhQQALhOgFg8QAAgJAFgIQAGgIAHgCICngmQAJgCAHAEQAIAEAEAIQAEAHgCAJQgZB6gbBHQggBQg/BYQgjAyg9A2Qg8Azg3AfQgGADgGAAIgGgBg");
	this.shape_2.setTransform(188.2,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("AwNJxQiRAAAAiRIAAu/QAAiRCRAAMAgbAAAQCRAAAACRIAAO/QAACRiRAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,236.7,168.1);


(lib._Text1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Hello everyone. Has anyone heard of the term classification?", "24px Drescher Grotesk BT MCO");
	this.text.lineHeight = 24;
	this.text.lineWidth = 188;
	this.text.setTransform(18,17.7);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhlCvQAshDAWg1QAZg3AKhTQALhRgFg+ICngnQgYB4gaBFQggBOg9BWQggAvg8A0Qg5Axg1AdQAcgZArhBg");
	this.shape.setTransform(186.8,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwNJYQh4AAAAh4IAAu/QAAh4B4AAMAgbAAAQB4AAAAB4IAAO/QAAB4h4AAg");
	this.shape_1.setTransform(116.8,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AiyEiQgJgCgGgIQgFgHABgKQABgJAHgHQAagYApg+IAAABQArhBAWgzQAXg0ALhQQALhOgFg8QAAgJAFgIQAGgIAHgCICngmQAJgCAHAEQAIAEAEAIQAEAHgCAJQgZB6gbBHQggBQg/BYQgjAyg9A2Qg8Azg3AfQgGADgGAAIgGgBg");
	this.shape_2.setTransform(188.2,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("AwNJxQiRAAAAiRIAAu/QAAiRCRAAMAgbAAAQCRAAAACRIAAO/QAACRiRAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,236.7,168.1);


(lib._ShowAnswer = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.Bitmap3();
	this.instance.setTransform(17,14.5);

	// Layer 1
	this.instance_1 = new lib.Layer21copy4();
	this.instance_1.setTransform(0,0,0.7,0.7);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,156.1,63.7);


(lib._MenuBtn3 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap8();
	this.instance.setTransform(38.9,22.1);

	this.instance_1 = new lib.Layer21copy4();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib._MenuBtn2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap9();
	this.instance.setTransform(48,22.1);

	this.instance_1 = new lib.Layer21copy4();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib._MenuBtn1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap10();
	this.instance.setTransform(51,22.1);

	this.instance_1 = new lib.Layer21copy4();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,223,91);


(lib._MenuA1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Menu", "30px Drescher Grotesk BT MCO", "#FFFFFF");
	this.text.lineHeight = 30;
	this.text.setTransform(43.9,12.1);

	// Layer 1
	this.instance = new lib.Layer21copy4();
	this.instance.setTransform(0,0,0.7,0.7);

	this.addChild(this.instance,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,156.1,63.7);


(lib._Click = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("Ar2EmIAApLIXtAAIAAJLg");
	this.shape.setTransform(76,29.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,152,59);


(lib._CheckAnswer = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.Bitmap2();
	this.instance.setTransform(12.6,14.8);

	// Layer 1
	this.instance_1 = new lib.Layer21copy4();
	this.instance_1.setTransform(0,0,0.7,0.7);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,156.1,63.7);


(lib._Background = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.VectorSmartObject();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1024,724);


(lib._Atom = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.dratom_Full_1();
	this.instance.setTransform(0,0,0.4,0.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,233.6,328.4);


(lib._AnswerMessage3 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Here are the correct answers.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 20;
	this.text.lineWidth = 221;
	this.text.setTransform(0.3,45.3);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhvCvQAwhDAZg0QAag4AMhTQAMhRgFg/IC4glQgbB4gdBFQgiBNhDBVQgkAwhCAzQg/Ayg7AeQAfgaAwhBg");
	this.shape.setTransform(193.6,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2JYQiEAAAAh4IAAu/QAAh4CEAAMAjtAAAQCEAAAAB4IAAO/QAAB4iEAAg");
	this.shape_1.setTransform(116.6,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEEiQgKgCgHgIQgGgHABgKQACgJAHgHQAdgYAug+IAAABQAuhBAZgzQAZg0AMhQQANhOgGg8QAAgJAGgIQAGgIAIgCIC4gmQAKgCAIAEQAJAEAEAIQAEAHgCAJQgbB6gfBHQgiBQhGBYQgnAyhDA2QhCAzg9AfQgGADgHAAIgGgBg");
	this.shape_2.setTransform(195.3,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2JxQigAAAAiRIAAu/QAAiRCgAAMAjtAAAQCgAAAACRIAAO/QAACRigAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,0,260.7,168.1);


(lib._AnswerMessage2 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("You’re almost there. Try again.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 20;
	this.text.lineWidth = 244;
	this.text.setTransform(0.3,45.3);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhvCvQAwhDAZg0QAag4AMhTQAMhRgFg/IC4glQgbB4gdBFQgiBNhDBVQgkAwhCAzQg/Ayg7AeQAfgaAwhBg");
	this.shape.setTransform(193.6,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2JYQiEAAAAh4IAAu/QAAh4CEAAMAjtAAAQCEAAAAB4IAAO/QAAB4iEAAg");
	this.shape_1.setTransform(116.6,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEEiQgKgCgHgIQgGgHABgKQACgJAHgHQAdgYAug+IAAABQAuhBAZgzQAZg0AMhQQANhOgGg8QAAgJAGgIQAGgIAIgCIC4gmQAKgCAIAEQAJAEAEAIQAEAHgCAJQgbB6gfBHQgiBQhGBYQgnAyhDA2QhCAzg9AfQgGADgHAAIgGgBg");
	this.shape_2.setTransform(195.3,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2JxQigAAAAiRIAAu/QAAiRCgAAMAjtAAAQCgAAAACRIAAO/QAACRigAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,0,260.7,168.1);


(lib._AnswerMessage1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Well done!", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 20;
	this.text.lineWidth = 89;
	this.text.setTransform(61.7,48.3);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhvCvQAwhDAZg0QAag4AMhTQAMhRgFg/IC4glQgbB4gdBFQgiBNhDBVQgkAwhCAzQg/Ayg7AeQAfgaAwhBg");
	this.shape.setTransform(193.6,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2JYQiEAAAAh4IAAu/QAAh4CEAAMAjtAAAQCEAAAAB4IAAO/QAAB4iEAAg");
	this.shape_1.setTransform(116.6,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEEiQgKgCgHgIQgGgHABgKQACgJAHgHQAdgYAug+IAAABQAuhBAZgzQAZg0AMhQQANhOgGg8QAAgJAGgIQAGgIAIgCIC4gmQAKgCAIAEQAJAEAEAIQAEAHgCAJQgbB6gfBHQgiBQhGBYQgnAyhDA2QhCAzg9AfQgGADgHAAIgGgBg");
	this.shape_2.setTransform(195.3,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2JxQigAAAAiRIAAu/QAAiRCgAAMAjtAAAQCgAAAACRIAAO/QAACRigAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,0,260.7,168.1);


(lib._A2Text6 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("We just learnt that we can use a table or a diagram to show how things are classified.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 318;
	this.text.setTransform(34,29.6);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EggyAJYQjyAAAAh4IAAu/QAAh4DyAAMBBlAAAQDyAAAAB4IAAO/QAAB4jyAAg");
	this.shape.setTransform(202.2,56.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4D4D4").s().p("EggyAJxQklAAAAiRIAAu/QAAiRElAAMBBlAAAQElAAAACRIAAO/QAACRklAAg");
	this.shape_1.setTransform(203.2,57.6);

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-4.9,478.5,125.2);


(lib._A2Text5 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Here are the correct answers.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 244;
	this.text.setTransform(70,41.5);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EggyAJYQjyAAAAh4IAAu/QAAh4DyAAMBBlAAAQDyAAAAB4IAAO/QAAB4jyAAg");
	this.shape.setTransform(202.2,56.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4D4D4").s().p("EggyAJxQklAAAAiRIAAu/QAAiRElAAMBBlAAAQElAAAACRIAAO/QAACRklAAg");
	this.shape_1.setTransform(203.2,57.6);

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-4.9,478.5,125.2);


(lib._A2Text4 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("You’re almost there. Try again.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 244;
	this.text.setTransform(70,41.5);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EggyAJYQjyAAAAh4IAAu/QAAh4DyAAMBBlAAAQDyAAAAB4IAAO/QAAB4jyAAg");
	this.shape.setTransform(202.2,56.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4D4D4").s().p("EggyAJxQklAAAAiRIAAu/QAAiRElAAMBBlAAAQElAAAACRIAAO/QAACRklAAg");
	this.shape_1.setTransform(203.2,57.6);

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-4.9,478.5,125.2);


(lib._A2Text3 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Well done!", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 117;
	this.text.setTransform(146,41.5);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EggyAJYQjyAAAAh4IAAu/QAAh4DyAAMBBlAAAQDyAAAAB4IAAO/QAAB4jyAAg");
	this.shape.setTransform(202.2,56.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4D4D4").s().p("EggyAJxQklAAAAiRIAAu/QAAiRElAAMBBlAAAQElAAAACRIAAO/QAACRklAAg");
	this.shape_1.setTransform(203.2,57.6);

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-4.9,478.5,125.2);


(lib._A2Text2 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Drag and drop the correct words into the classification diagram, then click CHECK ANSWER.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 425;
	this.text.setTransform(0,25.5);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EggyAJYQjyAAAAh4IAAu/QAAh4DyAAMBBlAAAQDyAAAAB4IAAO/QAAB4jyAAg");
	this.shape.setTransform(202.2,56.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4D4D4").s().p("EggyAJxQklAAAAiRIAAu/QAAiRElAAMBBlAAAQElAAAACRIAAO/QAACRklAAg");
	this.shape_1.setTransform(203.2,57.6);

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-4.9,478.5,125.2);


(lib._A2Text1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("How do we show the classification of things?\nWe can use a table to show how things can be classified.\nWe can also use a diagram to show how things can be classified.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 425;
	this.text.setTransform(-3.9,5.5);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EggyAJYQjyAAAAh4IAAu/QAAh4DyAAMBBlAAAQDyAAAAB4IAAO/QAAB4jyAAg");
	this.shape.setTransform(202.2,56.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D4D4D4").s().p("EggyAJxQklAAAAiRIAAu/QAAiRElAAMBBlAAAQElAAAACRIAAO/QAACRklAAg");
	this.shape_1.setTransform(203.2,57.6);

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-4.9,478.5,125.2);


(lib._A1Text2 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Drag the shaped objects into the correct boxes, then click CHECK ANSWER.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 20;
	this.text.lineWidth = 222;
	this.text.setTransform(3.7,21.3);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhvCvQAwhDAZg0QAag4AMhTQAMhRgFg/IC4glQgbB4gdBFQgiBNhDBVQgkAwhCAzQg/Ayg7AeQAfgaAwhBg");
	this.shape.setTransform(193.6,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2JYQiEAAAAh4IAAu/QAAh4CEAAMAjtAAAQCEAAAAB4IAAO/QAAB4iEAAg");
	this.shape_1.setTransform(116.6,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEEiQgKgCgHgIQgGgHABgKQACgJAHgHQAdgYAug+IAAABQAuhBAZgzQAZg0AMhQQANhOgGg8QAAgJAGgIQAGgIAIgCIC4gmQAKgCAIAEQAJAEAEAIQAEAHgCAJQgbB6gfBHQgiBQhGBYQgnAyhDA2QhCAzg9AfQgGADgHAAIgGgBg");
	this.shape_2.setTransform(195.3,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2JxQigAAAAiRIAAu/QAAiRCgAAMAjtAAAQCgAAAACRIAAO/QAACRigAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,0,260.7,168.1);


(lib._A1Text1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("What is classification?  Let’s learn about classification and try grouping these objects according to their shapes.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 257;
	this.text.setTransform(-16.9,6);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhvCvQAwhDAZg0QAag4AMhTQAMhRgFg/IC4glQgbB4gdBFQgiBNhDBVQgkAwhCAzQg/Ayg7AeQAfgaAwhBg");
	this.shape.setTransform(201.1,137.6,1.1,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2JYQiEAAAAh4IAAu/QAAh4CEAAMAjtAAAQCEAAAAB4IAAO/QAAB4iEAAg");
	this.shape_1.setTransform(116.5,61.2,1.1,1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEEiQgKgCgHgIQgGgHABgKQACgJAHgHQAdgYAug+IAAABQAuhBAZgzQAZg0AMhQQANhOgGg8QAAgJAGgIQAGgIAIgCIC4gmQAKgCAIAEQAJAEAEAIQAEAHgCAJQgbB6gfBHQgiBQhGBYQgnAyhDA2QhCAzg9AfQgGADgHAAIgGgBg");
	this.shape_2.setTransform(202.9,138.9,1.1,1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2JxQigAAAAiRIAAu/QAAiRCgAAMAjtAAAQCgAAAACRIAAO/QAACRigAAg");
	this.shape_3.setTransform(118.3,62.6,1.1,1);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-25,0,286.7,168.1);


(lib._A1EndMessage2 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Did you notice that all the same shapes were placed in the same group? When we classify things, we need to look for their similarities and differences. Things with similar characteristics are grouped together. Things with different characteristics are put into different groups.", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 22;
	this.text.lineWidth = 356;
	this.text.setTransform(-36.9,-6.8);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AigCrQBFhBAkg0QAlg2AShQQAShQgIg9IEIglQgnB1gpBEQgxBLhgBUQg0AuhfAzQhbAwhUAcQAtgYBEhAg");
	this.shape.setTransform(197.6,184.3,0.985,0.974,0,0,0,0,0.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("A8ROrQjRAAAAi8IAA3dQAAi8DRAAMA4jAAAQDRAAAAC8IAAXdQAAC8jRAAg");
	this.shape_1.setTransform(151.7,80.9,0.985,1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AkPERQgNgCgKgHQgIgIABgIQACgKAKgGQApgXA+g6IAAABQBAg9AigwQAjgxARhLQARhKgHg5QgBgIAIgHQAIgHAMgCID+gkQANgCAMAEQAMADAFAIQAGAHgCAIQgmBzgqBDQgwBLhgBTQg1AvheAyQhaAxhVAdQgIADgJAAIgJgBg");
	this.shape_2.setTransform(199.1,184.8,0.985,1.019,0,0,0,0,-0.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("A8SPSQj8AAAAjjIAA3dQAAjjD8AAMA4kAAAQD9AAAADjIAAXdQAADjj9AAg");
	this.shape_3.setTransform(154.3,83.1,0.985,1);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49,-14.7,406.7,227.6);


(lib._A1EndMessage1 = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Classification is placing objects in groups.  Have you wondered why we classify things?", "20px Drescher Grotesk BT MCO");
	this.text.lineHeight = 20;
	this.text.lineWidth = 222;
	this.text.setTransform(3.7,13.3);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhvCvQAwhDAZg0QAag4AMhTQAMhRgFg/IC4glQgbB4gdBFQgiBNhDBVQgkAwhCAzQg/Ayg7AeQAfgaAwhBg");
	this.shape.setTransform(193.6,137.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ax2JYQiEAAAAh4IAAu/QAAh4CEAAMAjtAAAQCEAAAAB4IAAO/QAAB4iEAAg");
	this.shape_1.setTransform(116.6,61.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AjEEiQgKgCgHgIQgGgHABgKQACgJAHgHQAdgYAug+IAAABQAuhBAZgzQAZg0AMhQQANhOgGg8QAAgJAGgIQAGgIAIgCIC4gmQAKgCAIAEQAJAEAEAIQAEAHgCAJQgbB6gfBHQgiBQhGBYQgnAyhDA2QhCAzg9AfQgGADgHAAIgGgBg");
	this.shape_2.setTransform(195.3,138.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("Ax2JxQigAAAAiRIAAu/QAAiRCgAAMAjtAAAQCgAAAACRIAAO/QAACRigAAg");
	this.shape_3.setTransform(118.3,62.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,0,260.7,168.1);


(lib._A1BoundImage = function() {
	this.initialize();

	// Layer 2
	this.text = new cjs.Text("Objects with pentagonal shape", "bold 18px Myriad Pro");
	this.text.lineHeight = 18;
	this.text.setTransform(307.6,211);

	this.text_1 = new cjs.Text("Objects with rectangular shape", "bold 18px Myriad Pro");
	this.text_1.lineHeight = 18;
	this.text_1.setTransform(26.2,211);

	this.text_2 = new cjs.Text("Objects with triangular shape", "bold 18px Myriad Pro");
	this.text_2.lineHeight = 18;
	this.text_2.setTransform(315.1,16.3);

	this.text_3 = new cjs.Text("Objects with circular shape", "bold 18px Myriad Pro");
	this.text_3.lineHeight = 18;
	this.text_3.setTransform(39.6,16.5);

	// Layer 1
	this.instance = new lib.Layer21copy6();
	this.instance.setTransform(16.8,206.5);

	this.instance_1 = new lib.Layer21copy6();
	this.instance_1.setTransform(298.9,206.5);

	this.instance_2 = new lib.Layer21copy6();
	this.instance_2.setTransform(298.9,11.4);

	this.instance_3 = new lib.Layer21copy6();
	this.instance_3.setTransform(16.8,12.4);

	this.instance_4 = new lib.Layer21copy9();

	this.addChild(this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance,this.text_3,this.text_2,this.text_1,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,587,409);


(lib.Menu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.addActivity1Callback = function(callback){
				this.activity1MenuClick.addEventListener("click",function(event){
					callback();
				})
			};
			this.addActivity2Callback = function(callback){
				this.activity2MenuClick.addEventListener("click",function(event){
					callback();
				})
			};
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(220));

	// Layer 6
	this.activity2MenuClick = new lib.Activity2MenuClick();
	this.activity2MenuClick.setTransform(754,406,1,1,0,0,0,109,42);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.activity2MenuClick}]}).wait(221));

	// Layer 3
	this.activity1MenuClick = new lib.Activity1MenuClick();
	this.activity1MenuClick.setTransform(754.5,234.5,1,1,0,0,0,109.5,43.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.activity1MenuClick}]}).wait(221));

	// Layer 7
	this.activity1MenuBtn = new lib.Activity1MenuBtn();
	this.activity1MenuBtn.setTransform(755.3,236.3,1,1,0,0,0,111.5,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.activity1MenuBtn}]}).wait(221));

	// Layer 4
	this.instance = new lib.FinalMenuBtn();
	this.instance.setTransform(756.6,578.5,1,1,0,0,0,111.5,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(221));

	// Layer 5
	this.activity2MenuBtn = new lib.Activity2MenuBtn();
	this.activity2MenuBtn.setTransform(755.3,407.4,1,1,0,0,0,111.5,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.activity2MenuBtn}]}).wait(221));

	// Text2
	this.instance_1 = new lib.Text2();
	this.instance_1.setTransform(166.3,272,1,1,0,0,0,130.3,65);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).wait(152));

	// Text1
	this.instance_2 = new lib.Text1();
	this.instance_2.setTransform(166.3,272,1,1,0,0,0,130.3,65);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},69).wait(152));

	// Doctor
	this.instance_3 = new lib.DrAtomMenu();
	this.instance_3.setTransform(182.4,528.6,1,1,0,0,0,146,205.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(221));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36,190.8,832.1,543);


(lib.CheckIcon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.02)").s().p("ArOEJIAAoRIWdAAIAAIRg");
	this.shape.setTransform(72,26.5);

	this.instance = new lib.TrueIconSmall();
	this.instance.setTransform(121.3,10,1,1,0,0,0,27.5,25.5);

	this.instance_1 = new lib.FalseIconSmall();
	this.instance_1.setTransform(122.3,14.4,1,1,0,0,0,26.5,26);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.instance}]},1).to({state:[{t:this.shape},{t:this.instance_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,144,53);


(lib.Activity2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var bounds = [
				{
					minX: 454,
					minY : 215,
					maxX : 616,
					maxY : 274,
					iconX : 698,
					iconY : 162,
					contain : false
				},
				{
					minX: 177,
					minY : 333,
					maxX : 339,
					maxY : 392,
					iconX : 448,
					iconY : 260,
					contain : false
				},
				{
					minX: 363,
					minY : 333,
					maxX : 525,
					maxY : 392,
					iconX : 615,
					iconY : 260,
					contain : false
				},
				{
					minX: 549,
					minY : 333,
					maxX : 711,
					maxY : 392,
					iconX : 782,
					iconY : 260,
					contain : false
				},
				{
					minX: 735,
					minY : 333,
					maxX : 897,
					maxY : 392,
					iconX : 948,
					iconY : 260,
					contain : false
				},
			]
			
			this.init = function(){
				var me = this;
				this.falseResults = [];
				this.filled = 0;
				this.checkNum = 0;
				this.initDragObject();
				this.showAnswerClick.addEventListener("mousedown",function(){
					me.showAnswer();
					setTimeout(function(){
						me.onFinish();
					},2000);
				});
				this.enableCheckAnswer(false);
			};
			this.addFinishCallback = function(callback){
				this.onFinish = callback;
			}
			this.enableCheckAnswer = function(stage){
				var me = this;
				if(!stage){
					this.checkAnswerImage.alpha = 0.5;
					this.checkAnswerClick.removeAllEventListeners();
				}else {
					this.checkAnswerImage.alpha = 1;
					this.checkAnswerClick.addEventListener("mousedown",function(event){
						me.checkAnswer();
					});
				}
			};
			this.checkAnswer = function(){
				var me = this;
				this.mouseEnabled = false;
				if(this["shapeClick5"].at == 0){
					for(var i = 0;i < 5; i++){
						this.showResultIconAt(true,i);
					}
					setTimeout(function(){
						me.onFinish();
					},2000);
				}else{
					this.showResultIconAt(false,0);
					this.showResultIconAt(false,this["shapeClick5"].at);
					for(var i = 1;i< 5;i++){
						if(i == this["shapeClick5"].at){
							continue;
						}
						this.showResultIconAt(true,i);
					}
					
					setTimeout(function(){
						me.mouseEnabled = true;
						if(me.checkNum == 0){
							for(var i = 1;i<6;i++){
								if(me["shapeClick"+i].at == 0){
									me["shapeClick"+i].x = me["shapeImage"+i].initX;
									me["shapeClick"+i].y = me["shapeImage"+i].initY;
									me["shapeImage"+i].x = me["shapeImage"+i].initX;
									me["shapeImage"+i].y = me["shapeImage"+i].initY;
									bounds[0].contain = false;
									me["shapeClick"+i].at = null;
								}
							}
							
							me["shapeClick5"].x = me["shapeImage5"].initX;
							me["shapeClick5"].y = me["shapeImage5"].initY;
							me["shapeImage5"].x = me["shapeImage5"].initX;
							me["shapeImage5"].y = me["shapeImage5"].initY;
							bounds[me["shapeClick5"].at].contain = false;
							me["shapeClick5"].at = null;
							me.removeFalseIcons();
							me.onChangeFilled(3);
							me.checkNum++;
						}else {
							me.mouseEnabled = false;
							me.removeFalseIcons();
							me.setLocationAt(me["shapeImage5"],me["shapeClick5"],bounds[0]);
							me.showResultIconAt(true,0);
							for(var i = 1;i<6;i++){
								if(me["shapeClick"+i].at == 0){
									me.setLocationAt(me["shapeImage"+i],me["shapeClick"+i],bounds[me["shapeClick5"].at]);
									me.showResultIconAt(true,me["shapeClick5"].at);
								}
							}
							setTimeout(function(){
								me.onFinish();
							},2000);
						}
						
					},2000);
				}
			};
			this.removeFalseIcons = function(){
				for(var i =0;i < this.falseResults.length;i++){
					this.removeChild(this.falseResults[i]);
				}
			}
			this.showResultIconAt = function(result,boundIndex){
				var icon;
				if(result){
					icon = new lib.TrueIconSmall();
				}else {
					icon = new lib.FalseIconSmall();
					this.falseResults.push(icon);
				}
				icon.x = bounds[boundIndex].iconX;
				icon.y = bounds[boundIndex].iconY;
				this.addChild(icon);
			};
			this.showAnswer = function(){
				this.setLocationAt(this["shapeImage5"],this["shapeClick5"],bounds[0]);
				this.setLocationAt(this["shapeImage1"],this["shapeClick1"],bounds[1]);
				this.setLocationAt(this["shapeImage2"],this["shapeClick2"],bounds[2]);
				this.setLocationAt(this["shapeImage3"],this["shapeClick3"],bounds[3]);
				this.setLocationAt(this["shapeImage4"],this["shapeClick4"],bounds[4]);
				this.showResultIconAt(true,0);
				this.showResultIconAt(true,1);
				this.showResultIconAt(true,2);
				this.showResultIconAt(true,3);
				this.showResultIconAt(true,4);
			};
			this.setLocationAt = function(drinkImage,drinkClick,bound){
				drinkImage.x = bound.minX + drinkImage.nominalBounds.width/2;
				drinkImage.y = bound.minY + drinkImage.nominalBounds.height/2;
				drinkClick.x = bound.minX + drinkImage.nominalBounds.width/2;
				drinkClick.y = bound.minY + drinkImage.nominalBounds.height/2;
			};
			this.initDragObject = function(){
				var me = this;
				for(var i = 1;i < 6;i++){
					//this["bound"+i].contain = false;
					var drinkImage = this["shapeImage"+i];
					var drinkClick = this["shapeClick"+i];
					drinkClick.at = null;
					drinkImage.initX = drinkImage.x;
					drinkImage.initY = drinkImage.y;
					(function(drinkImage,drinkClick){
						drinkClick.addEventListener("mousedown",function(event){
							me.setChildIndex(drinkImage,me.children.length-1);
							me.setChildIndex(drinkClick,me.children.length-1);
							var beginX = drinkImage.x;
							var beginY = drinkImage.y
							var offset = {x:drinkImage.x - event.stageX, y:drinkImage.y - event.stageY};
							event.onMouseMove = function(ev) {
								drinkImage.x = ev.stageX+offset.x;
								drinkImage.y = ev.stageY+offset.y;
								drinkClick.x = ev.stageX+offset.x;
								drinkClick.y = ev.stageY+offset.y;
							};
							event.onMouseUp = function(ev){
								for(var i =0 ;i < 5;i++){
									var bound = bounds[i]
									if(ev.stageX >= bound.minX && ev.stageX <= bound.maxX && ev.stageY >= bound.minY && ev.stageY <= bound.maxY && !bound.contain){
										if(drinkClick.at != null){
											bounds[drinkClick.at].contain = false;
											me.onChangeFilled(--me.filled);
										}
										bound.contain = true;
										drinkClick.at = i;
										me.setLocationAt(drinkImage,drinkClick,bound)
										me.onChangeFilled(++me.filled);
										return;
									}
								}
								
								if(drinkClick.at != null){
									bounds[drinkClick.at].contain = false;
									me.onChangeFilled(--me.filled);
								}
								drinkClick.at = null;
								drinkImage.x = drinkImage.initX;
								drinkImage.y = drinkImage.initY;
								drinkClick.x = drinkImage.initX;
								drinkClick.y = drinkImage.initY;
							}
						})
					})(drinkImage,drinkClick);
				}
			};
			this.onChangeFilled = function(filled){
				if(filled <5){
					this.enableCheckAnswer(false);
				}else{
					this.enableCheckAnswer(true);
				}
				this.filled = filled;
			};
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0));

	// Layer 32
	this.shapeClick3 = new lib.ShapeClick();
	this.shapeClick3.setTransform(440.5,597.8,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeClick3}]}).wait(1));

	// Layer 31
	this.shapeClick1 = new lib.ShapeClick();
	this.shapeClick1.setTransform(276.3,661.8,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeClick1}]}).wait(1));

	// Layer 30
	this.shapeClick4 = new lib.ShapeClick();
	this.shapeClick4.setTransform(110.3,661.8,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeClick4}]}).wait(1));

	// Layer 29
	this.shapeClick2 = new lib.ShapeClick();
	this.shapeClick2.setTransform(276.3,597.8,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeClick2}]}).wait(1));

	// Layer 28
	this.shapeClick5 = new lib.ShapeClick();
	this.shapeClick5.setTransform(111.5,598,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeClick5}]}).wait(1));

	// Layer 26
	this.checkAnswerClick = new lib.CheckAnswerClick();
	this.checkAnswerClick.setTransform(666.3,642.5,1,1,0,0,0,109.5,44.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.checkAnswerClick}]}).wait(1));

	// Layer 25
	this.showAnswerClick = new lib.ShowAnswerClick();
	this.showAnswerClick.setTransform(900.7,642.6,1,1,0,0,0,109,43);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.showAnswerClick}]}).wait(1));

	// Triangles
	this.shapeImage3 = new lib.Shape3();
	this.shapeImage3.setTransform(441.5,598,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeImage3}]}).wait(1));

	// Pentagols
	this.shapeImage1 = new lib.Shape5();
	this.shapeImage1.setTransform(276.5,662,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeImage1}]}).wait(1));

	// Circle
	this.shapeImage4 = new lib.Shape4();
	this.shapeImage4.setTransform(111.5,661,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeImage4}]}).wait(1));

	// Rectangles
	this.shapeImage2 = new lib.Shape2();
	this.shapeImage2.setTransform(276.5,598,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeImage2}]}).wait(1));

	// Shapes
	this.shapeImage5 = new lib.Shape1();
	this.shapeImage5.setTransform(111.5,598,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shapeImage5}]}).wait(1));

	// Layer 24
	this.instance = new lib.Layer24();
	this.instance.setTransform(251,273);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(1));

	// Helping words
	this.instance_1 = new lib.Helpingwords_1();
	this.instance_1.setTransform(17,526);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(1));

	// Layer 21 copy 16
	this.instance_2 = new lib.ShowAnswer();
	this.instance_2.setTransform(900.6,644.5,1,1,0,0,0,111.5,45.5);

	this.checkAnswerImage = new lib.CheckAnswerBtn();
	this.checkAnswerImage.setTransform(668.2,644.5,1,1,0,0,0,111,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.checkAnswerImage},{t:this.instance_2}]}).wait(1));

	// Layer 39 copy 5
	this.instance_3 = new lib.Layer39copy5();
	this.instance_3.setTransform(735,333);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(1));

	// Layer 39 copy 4
	this.instance_4 = new lib.Layer39copy4();
	this.instance_4.setTransform(549,333);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(1));

	// Layer 39 copy 6
	this.instance_5 = new lib.Layer39copy6();
	this.instance_5.setTransform(454,215);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).wait(1));

	// Layer 39 copy 3
	this.instance_6 = new lib.Layer39copy3();
	this.instance_6.setTransform(363,333);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(1));

	// Layer 39 copy 2
	this.instance_7 = new lib.Layer39copy2();
	this.instance_7.setTransform(177,333);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).wait(1));

	// Layer 6 copy
	this.instance_8 = new lib.Layer6copy();
	this.instance_8.setTransform(14,557);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14,215,998.1,489);


(lib.Activity2 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var bounds = [
				{
					minX: 591,
					minY : 189,
					maxX : 753,
					maxY : 248,
					iconX : 698,
					iconY : 162,
					contain : false
				},
				{
					minX: 341,
					minY : 286,
					maxX : 503,
					maxY : 345,
					iconX : 448,
					iconY : 260,
					contain : false
				},
				{
					minX: 509,
					minY : 286,
					maxX : 671,
					maxY : 345,
					iconX : 615,
					iconY : 260,
					contain : false
				},
				{
					minX: 675,
					minY : 286,
					maxX : 837,
					maxY : 345,
					iconX : 782,
					iconY : 260,
					contain : false
				},
				{
					minX: 842,
					minY : 286,
					maxX : 1004,
					maxY : 345,
					iconX : 948,
					iconY : 260,
					contain : false
				},
			]
			
			this.init = function(){
				var me = this;
				this.falseResults = [];
				this.filled = 0;
				this.checkNum = 0;
				this.initDragObject();
				this.showAnswerClick.addEventListener("mousedown",function(){
					me.showAnswer();
					setTimeout(function(){
						me.onFinish();
					},2000);
				});
				this.enableCheckAnswer(false);
			};
			this.addFinishCallback = function(callback){
				this.onFinish = callback;
			}
			this.enableCheckAnswer = function(stage){
				var me = this;
				if(!stage){
					this.checkAnswerImage.alpha = 0.5;
					this.checkAnswerClick.removeAllEventListeners();
				}else {
					this.checkAnswerImage.alpha = 1;
					this.checkAnswerClick.addEventListener("mousedown",function(event){
						me.checkAnswer();
					});
				}
			};
			this.checkAnswer = function(){
				var me = this;
				this.mouseEnabled = false;
				if(this["drinkClick5"].at == 0){
					for(var i = 0;i < 5; i++){
						this.showResultIconAt(true,i);
					}
					setTimeout(function(){
						me.onFinish();
					},2000);
				}else{
					this.showResultIconAt(false,0);
					this.showResultIconAt(false,this["drinkClick5"].at);
					for(var i = 1;i< 5;i++){
						if(i == this["drinkClick5"].at){
							continue;
						}
						this.showResultIconAt(true,i);
					}
					
					setTimeout(function(){
						me.mouseEnabled = true;
						if(me.checkNum == 0){
							for(var i = 1;i<6;i++){
								if(me["drinkClick"+i].at == 0){
									me["drinkClick"+i].x = me["drink"+i].initX;
									me["drinkClick"+i].y = me["drink"+i].initY;
									me["drink"+i].x = me["drink"+i].initX;
									me["drink"+i].y = me["drink"+i].initY;
									bounds[0].contain = false;
									me["drinkClick"+i].at = null;
								}
							}
							
							me["drinkClick5"].x = me["drink5"].initX;
							me["drinkClick5"].y = me["drink5"].initY;
							me["drink5"].x = me["drink5"].initX;
							me["drink5"].y = me["drink5"].initY;
							bounds[me["drinkClick5"].at].contain = false;
							me["drinkClick5"].at = null;
							me.removeFalseIcons();
							me.onChangeFilled(3);
							me.checkNum++;
						}else {
							me.mouseEnabled = false;
							me.removeFalseIcons();
							me.setLocationAt(me["drink5"],me["drinkClick5"],bounds[0]);
							me.showResultIconAt(true,0);
							for(var i = 1;i<6;i++){
								if(me["drinkClick"+i].at == 0){
									me.setLocationAt(me["drink"+i],me["drinkClick"+i],bounds[me["drinkClick5"].at]);
									me.showResultIconAt(true,me["drinkClick5"].at);
								}
							}
							setTimeout(function(){
								me.onFinish();
							},2000);
						}
						
					},2000);
				}
			};
			this.removeFalseIcons = function(){
				for(var i =0;i < this.falseResults.length;i++){
					this.removeChild(this.falseResults[i]);
				}
			}
			this.showResultIconAt = function(result,boundIndex){
				var icon;
				if(result){
					icon = new lib.TrueIconSmall();
				}else {
					icon = new lib.FalseIconSmall();
					this.falseResults.push(icon);
				}
				icon.x = bounds[boundIndex].iconX;
				icon.y = bounds[boundIndex].iconY;
				this.addChild(icon);
			};
			this.showAnswer = function(){
				this.setLocationAt(this["drink5"],this["drinkClick5"],bounds[0]);
				this.setLocationAt(this["drink1"],this["drinkClick1"],bounds[1]);
				this.setLocationAt(this["drink2"],this["drinkClick2"],bounds[2]);
				this.setLocationAt(this["drink3"],this["drinkClick3"],bounds[3]);
				this.setLocationAt(this["drink4"],this["drinkClick4"],bounds[4]);
				this.showResultIconAt(true,0);
				this.showResultIconAt(true,1);
				this.showResultIconAt(true,2);
				this.showResultIconAt(true,3);
				this.showResultIconAt(true,4);
			};
			this.setLocationAt = function(drinkImage,drinkClick,bound){
				drinkImage.x = bound.minX + drinkImage.nominalBounds.width/2;
				drinkImage.y = bound.minY + drinkImage.nominalBounds.height/2;
				drinkClick.x = bound.minX + drinkImage.nominalBounds.width/2;
				drinkClick.y = bound.minY + drinkImage.nominalBounds.height/2;
			};
			this.initDragObject = function(){
				var me = this;
				for(var i = 1;i < 6;i++){
					this["bound"+i].contain = false;
					var drinkImage = this["drink"+i];
					var drinkClick = this["drinkClick"+i];
					drinkClick.at = null;
					drinkImage.initX = drinkImage.x;
					drinkImage.initY = drinkImage.y;
					(function(drinkImage,drinkClick){
						drinkClick.addEventListener("mousedown",function(event){
							me.setChildIndex(drinkImage,me.children.length-1);
							me.setChildIndex(drinkClick,me.children.length-1);
							var beginX = drinkImage.x;
							var beginY = drinkImage.y
							var offset = {x:drinkImage.x - event.stageX, y:drinkImage.y - event.stageY};
							event.onMouseMove = function(ev) {
								drinkImage.x = ev.stageX+offset.x;
								drinkImage.y = ev.stageY+offset.y;
								drinkClick.x = ev.stageX+offset.x;
								drinkClick.y = ev.stageY+offset.y;
							};
							event.onMouseUp = function(ev){
								for(var i =0 ;i < 5;i++){
									var bound = bounds[i]
									if(ev.stageX >= bound.minX && ev.stageX <= bound.maxX && ev.stageY >= bound.minY && ev.stageY <= bound.maxY && !bound.contain){
										if(drinkClick.at != null){
											bounds[drinkClick.at].contain = false;
											me.onChangeFilled(--me.filled);
										}
										bound.contain = true;
										drinkClick.at = i;
										me.setLocationAt(drinkImage,drinkClick,bound)
										me.onChangeFilled(++me.filled);
										return;
									}
								}
								
								if(drinkClick.at != null){
									bounds[drinkClick.at].contain = false;
									me.onChangeFilled(--me.filled);
								}
								drinkClick.at = null;
								drinkImage.x = drinkImage.initX;
								drinkImage.y = drinkImage.initY;
								drinkClick.x = drinkImage.initX;
								drinkClick.y = drinkImage.initY;
							}
						})
					})(drinkImage,drinkClick);
				}
			};
			this.onChangeFilled = function(filled){
				if(filled <5){
					this.enableCheckAnswer(false);
				}else{
					this.enableCheckAnswer(true);
				}
				this.filled = filled;
			};
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0));

	// Layer 33
	this.checkAnswerClick = new lib.CheckAnswerClick();
	this.checkAnswerClick.setTransform(656.2,658.5,1,1,0,0,0,109.5,44.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.checkAnswerClick}]}).wait(1));

	// Layer 32
	this.showAnswerClick = new lib.ShowAnswerClick();
	this.showAnswerClick.setTransform(892.6,656.6,1,1,0,0,0,109,43);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.showAnswerClick}]}).wait(1));

	// Layer 31
	this.drinkClick1 = new lib.DrinkClick1();
	this.drinkClick1.setTransform(128,538.2,1,1,0,0,0,80,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drinkClick1}]}).wait(1));

	// Layer 29
	this.drinkClick2 = new lib.DrinkClick2();
	this.drinkClick2.setTransform(318.5,538.2,1,1,0,0,0,80,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drinkClick2}]}).wait(1));

	// Layer 28
	this.drinkClick3 = new lib.DrinkClick3();
	this.drinkClick3.setTransform(509,538.2,1,1,0,0,0,80,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drinkClick3}]}).wait(1));

	// Layer 27
	this.drinkClick4 = new lib.DrinkClick4();
	this.drinkClick4.setTransform(699.5,538.2,1,1,0,0,0,80,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drinkClick4}]}).wait(1));

	// Layer 26
	this.drinkClick5 = new lib.DrinkClick5();
	this.drinkClick5.setTransform(890.1,538.2,1,1,0,0,0,80,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drinkClick5}]}).wait(1));

	// Layer 30
	this.instance = new lib.Layer30();
	this.instance.setTransform(17,86);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(1));

	// Milk
	this.drink3 = new lib.Drink3();
	this.drink3.setTransform(509,538,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drink3}]}).wait(1));

	// Soya Bean  milk
	this.drink4 = new lib.Drink4();
	this.drink4.setTransform(699.8,538,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drink4}]}).wait(1));

	// Drinks
	this.drink5 = new lib.Drink5();
	this.drink5.setTransform(890.5,538,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drink5}]}).wait(1));

	// Green tea
	this.drink2 = new lib.Drink2();
	this.drink2.setTransform(318.3,538,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drink2}]}).wait(1));

	// Fruit juice
	this.drink1 = new lib.Drink1();
	this.drink1.setTransform(127.5,538,1,1,0,0,0,80.5,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.drink1}]}).wait(1));

	// Layer 39 copy 8
	this.bound1 = new lib.Bound1();
	this.bound1.setTransform(672,218.5,1,1,0,0,0,81,29.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bound1}]}).wait(1));

	// Layer 24 copy 2
	this.instance_1 = new lib.Layer24copy2();
	this.instance_1.setTransform(388,247);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(1));

	// Layer 39 copy 8_4
	this.bound5 = new lib.Bound5();
	this.bound5.setTransform(923,315.5,1,1,0,0,0,81,29.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bound5}]}).wait(1));

	// Layer 39 copy 8_3
	this.bound4 = new lib.Bound4();
	this.bound4.setTransform(756,315.5,1,1,0,0,0,81,29.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bound4}]}).wait(1));

	// Layer 39 copy 8_2
	this.bound3 = new lib.Bound3();
	this.bound3.setTransform(590,315.5,1,1,0,0,0,81,29.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bound3}]}).wait(1));

	// Layer 39 copy 8_1
	this.bound2 = new lib.Bound2();
	this.bound2.setTransform(422,315.5,1,1,0,0,0,81,29.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bound2}]}).wait(1));

	// Helping words
	this.instance_2 = new lib.Helpingwords();
	this.instance_2.setTransform(18,447);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).wait(1));

	// Layer 6 copy 2
	this.instance_3 = new lib.Layer6copy2();
	this.instance_3.setTransform(14,481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(1));

	// Layer 23
	this.checkAnswerImage = new lib.CheckAnswerBtn();
	this.checkAnswerImage.setTransform(658.2,658.5,1,1,0,0,0,111,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.checkAnswerImage}]}).wait(1));

	// Layer 24
	this.instance_4 = new lib.ShowAnswer();
	this.instance_4.setTransform(894.6,658.5,1,1,0,0,0,111.5,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14,86,992.1,618);


(lib.Activity1 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var me = this;
			
			var initPositon = {
				x1 : 220,
				x2 : 407,
				x3 : 594,
				x4 : 781,
				y : 523
			}
			var circleBounds = {
				minX : 430,
				maxX : 705,
				minY : 42,
				maxY : 230,
				checkX : 585,
				checkY : 122,
				contain : null
			};
			var triangleBounds = {
				minX : 711,
				maxX : 986,
				minY : 42,
				maxY : 230,
				checkX : 866,
				checkY : 122,
				contain : null
			};
			var rectangleBounds = {
				minX : 430,
				maxX : 705,
				minY : 236,
				maxY : 424,
				checkX : 585,
				checkY : 316,
				contain : null
			};
			var pentagonalBounds = {
				minX : 711,
				maxX : 986,
				minY : 236,
				maxY : 424,
				checkX : 866,
				checkY : 316,
				contain : null
			};
			this.init = function(){
				var me = this;
				this.falseIcons = [];
				this.falseResults = [];
				this.checkNum = 0;
				this.checkAnswerImage.alpha = 0.5;
				this.getShapeObjects();
				this.setShapePosition(this.shapeImages,this.shapeClicks);
				this.setShapeEvent(this.shapeImages,this.shapeClicks);
				this.showAnswerClick.addEventListener('click', function(event){
					me.mouseEnabled = false;
					me.checkAnswerClick.removeAllEventListeners();
					me.addShapeToBound(me.shapeImages[0],me.shapeClicks[0],	triangleBounds);
					me.shapeClicks[0].removeAllEventListeners();
					me.addShapeToBound(me.shapeImages[1],me.shapeClicks[1],triangleBounds);
					me.shapeClicks[1].removeAllEventListeners();
					me.addShapeToBound(me.shapeImages[2],me.shapeClicks[2],rectangleBounds);
					me.shapeClicks[2].removeAllEventListeners();
					me.addShapeToBound(me.shapeImages[3],me.shapeClicks[3],pentagonalBounds);
					me.shapeClicks[3].removeAllEventListeners();
					me.addChecktoBound(true,circleBounds);
					me.addChecktoBound(true,triangleBounds);
					me.addChecktoBound(true,rectangleBounds);
					me.addChecktoBound(true,pentagonalBounds);
					setTimeout(function(){
						me.onFinish();
						console.log("finish");
					},2000);
				});
			};
			this.addFinishCallback = function(callback){
				this.onFinish = callback;
			}
			this.setShapeEvent = function(shapeImages,shapeClicks){
				var me = this;
				for(var i = 0 ; i < shapeImages.length; i++){
					var shapeImage = shapeImages[i];
					var shapeClick = shapeClicks[i];
					(function(shapeClick,shapeImage){
						shapeClick.addEventListener("mousedown",function(event){
							me.setChildIndex(shapeImage,me.children.length-1);
							me.setChildIndex(shapeClick,me.children.length-1);
		
							var target = event.target;
							var beginX = target.x;
							var beginY = target.y
							var offset = {x:target.x - event.stageX, y:target.y - event.stageY};
							event.onMouseMove = function(ev) {
								shapeClick.x = ev.stageX+offset.x;
								shapeClick.y = ev.stageY+offset.y;
								shapeImage.x = ev.stageX+offset.x;
								shapeImage.y = ev.stageY+offset.y;
							}
							event.onMouseUp = function(ev){
								if(ev.stageX >= circleBounds.minX && ev.stageX <= circleBounds.maxX && ev.stageY >= circleBounds.minY && ev.stageY <= circleBounds.maxY && circleBounds.contain == null){
									circleBounds.contain = shapeClick.type;
									me.changeBoundContain(shapeClick);
									shapeClick.bound = "c";
									me.addShapeToBound(shapeImage,shapeClick,circleBounds);
								}else if(ev.stageX >= triangleBounds.minX && ev.stageX <= triangleBounds.maxX && ev.stageY >= triangleBounds.minY && ev.stageY <= triangleBounds.maxY && triangleBounds.contain == null){
									triangleBounds.contain = shapeClick.type;
									me.changeBoundContain(shapeClick);
									shapeClick.bound = "t";
									me.addShapeToBound(shapeImage,shapeClick,triangleBounds);
								}else if(ev.stageX >= rectangleBounds.minX && ev.stageX <= rectangleBounds.maxX && ev.stageY >= rectangleBounds.minY && ev.stageY <= rectangleBounds.maxY && rectangleBounds.contain == null){
									rectangleBounds.contain = shapeClick.type;
									me.changeBoundContain(shapeClick);
									shapeClick.bound = "r";
									me.addShapeToBound(shapeImage,shapeClick,rectangleBounds);
								}else if(ev.stageX >= pentagonalBounds.minX && ev.stageX <= pentagonalBounds.maxX && ev.stageY >= pentagonalBounds.minY && ev.stageY <= pentagonalBounds.maxY && pentagonalBounds.contain == null){
									pentagonalBounds.contain = shapeClick.type;
									me.changeBoundContain(shapeClick);
									shapeClick.bound = "p";
									me.addShapeToBound(shapeImage,shapeClick,pentagonalBounds);
								}else{
									me.changeBoundContain(shapeClick);
									shapeImage.x = shapeImage.initX;
									shapeImage.y = shapeImage.initY;
									shapeClick.x = shapeImage.initX;
									shapeClick.y = shapeImage.initY;
									shapeClick.bound = null;
								}
								
								if(circleBounds.contain != null && triangleBounds.contain != null && rectangleBounds.contain != null && pentagonalBounds.contain != null){
									me.checkAnswerImage.alpha = 1;
									me.checkAnswerClick.addEventListener("click",function(event){
										if(circleBounds.contain == 'c' && triangleBounds.contain == 't' && rectangleBounds.contain == 'r' && pentagonalBounds.contain == 'p'){
											me.addChecktoBound(true,circleBounds);
											me.addChecktoBound(true,triangleBounds);
											me.addChecktoBound(true,rectangleBounds);
											me.addChecktoBound(true,pentagonalBounds);
											for(var i = 0; i< me.shapeClicks.length;i++){
												me.shapeClicks[i].removeAllEventListeners();
											}
											setTimeout(function(){
												me.onFinish();
												console.log("finish");
											},2000);
										}else{
											me.mouseEnabled = false;
											
											if(circleBounds.contain == 'c'){
												me.addChecktoBound(true,circleBounds);
												me.shapeClicks[0].removeAllEventListeners();
											}else {
												me.addChecktoBound(false,circleBounds);
												me.falseResults.push({shapeClick : me.shapeClicks[0],shapeImage : me.shapeImages[0]});
											}
											
											if(triangleBounds.contain == 't'){
												me.addChecktoBound(true,triangleBounds);
												me.shapeClicks[1].removeAllEventListeners();
											}else {
												me.addChecktoBound(false,triangleBounds);
												me.falseResults.push({shapeClick : me.shapeClicks[1],shapeImage : me.shapeImages[1]});
											}
											
											if(rectangleBounds.contain == 'r'){
												me.addChecktoBound(true,rectangleBounds);
												me.shapeClicks[2].removeAllEventListeners();
											}else {
												me.addChecktoBound(false,rectangleBounds);
												me.falseResults.push({shapeClick : me.shapeClicks[2],shapeImage : me.shapeImages[2]});
											}
											
											if(pentagonalBounds.contain == 'p'){
												me.addChecktoBound(true,pentagonalBounds);
												me.shapeClicks[3].removeAllEventListeners();
											}else {
												me.addChecktoBound(false,pentagonalBounds);
												me.falseResults.push({shapeClick : me.shapeClicks[3],shapeImage : me.shapeImages[3]});
											}
											
											setTimeout(function(){
												me.mouseEnabled = true;
												me.checkAnswerImage.alpha = .5;
												me.checkAnswerClick.removeAllEventListeners();
												for(var i = 0; i < me.falseIcons.length;i++){
													me.removeChild(me.falseIcons[i]);
												}
												me.falseIcons.length = 0;
												if(me.checkNum == 0){
													for (i = 0;i < me.falseResults.length;i++){
														var shapeObject = me.falseResults[i];
														me.changeBoundContain(shapeObject.shapeClick);
														shapeObject.shapeImage.x = shapeObject.shapeImage.initX;
														shapeObject.shapeImage.y = shapeObject.shapeImage.initY;
														shapeObject.shapeClick.x = shapeObject.shapeImage.initX;
														shapeObject.shapeClick.y = shapeObject.shapeImage.initY;
														shapeObject.shapeClick.bound = null;
													}
													me.falseResults.length = 0;
												}else {
													me.mouseEnabled = false;
													me.addShapeToBound(me.shapeImages[0],me.shapeClicks[0],circleBounds);
													me.addShapeToBound(me.shapeImages[1],me.shapeClicks[1],triangleBounds);
													me.addShapeToBound(me.shapeImages[2],me.shapeClicks[2],rectangleBounds);
													me.addShapeToBound(me.shapeImages[3],me.shapeClicks[3],pentagonalBounds);
													me.addChecktoBound(true,circleBounds);
													me.addChecktoBound(true,triangleBounds);
													me.addChecktoBound(true,rectangleBounds);
													me.addChecktoBound(true,pentagonalBounds);
													setTimeout(function(){
														me.onFinish();
													},2000);
												}
												me.checkNum++;
											},2000)
											
										}
									});
								}else{
									me.checkAnswerImage.alpha = 0.5;
									me.checkAnswerClick.removeAllEventListeners();
								}
							}
						});
					})(shapeClick,shapeImage);
				}
			};
			this.addChecktoBound = function(result,bound){
				var icon;
				
				if(result){
					icon = new lib.TrueIcon();
				}else{
					icon = new lib.FalseIcon();
					this.falseIcons.push(icon);
				}
				icon.x = bound.checkX;
				icon.y = bound.checkY;
				this.addChild(icon);
			}
			this.addShapeToBound =  function(shapeImage,shapeClick,bound){
				shapeImage.x = bound.minX + (bound.maxX - bound.minX)/2 - shapeImage.nominalBounds.width/2;
				shapeImage.y = bound.minY + (bound.maxY - bound.minY)/2 - shapeImage.nominalBounds.height/2;
				shapeClick.x = shapeImage.x;
				shapeClick.y = shapeImage.y;
			};
			this.changeBoundContain  = function(shapeClick){
				if(shapeClick.bound != null){
					if(shapeClick.bound == 'c'){
						circleBounds.contain = null;
					}else if(shapeClick.bound == 't'){
						triangleBounds.contain = null;
					}else if(shapeClick.bound == 'r'){
						rectangleBounds.contain = null;
					}else if(shapeClick.bound == 'p'){
						pentagonalBounds.contain = null;
					} 
				}
			}
			this.getShapeObjects = function(){
				this.shapeImages = [];
				this.shapeClicks = [];
				var circleClick,rectangleClick,triangleClick,pentangleClick;
				var circleImage,rectangleImage,triangleImage,pentangleImage;
				if(Math.random() > 0.5){
					circleClick = new lib._0_1Click();
					circleImage = new lib._0_1();
				}else{
					circleClick = new lib._0_2Click();
					circleImage = new lib._0_2();
				}
				circleClick.type = "c";
				circleClick.bound = null;
				this.shapeImages.push(circleImage);
				this.shapeClicks.push(circleClick);
				
				if(Math.random() > 0.5){
					triangleClick = new lib._3_1Click();
					triangleImage = new lib._3_1();
				}else{
					triangleClick = new lib._3_2Click();
					triangleImage = new lib._3_2();
				}
				triangleClick.type = "t";
				triangleClick.bound = null;
				this.shapeImages.push(triangleImage);
				this.shapeClicks.push(triangleClick);
				
				if(Math.random() > 0.5){
					rectangleClick = new lib._4_1Click();
					rectangleImage = new lib._4_1();
				}else{
					rectangleClick = new lib._4_2Click();
					rectangleImage = new lib._4_2();
				}
				rectangleClick.type = "r";
				rectangleClick.bound = null;
				this.shapeImages.push(rectangleImage);
				this.shapeClicks.push(rectangleClick);
		
				if(Math.random() > 0.5){
					pentangleClick = new lib._5_1Click();
					pentangleImage = new lib._5_1();
				}else{
					pentangleClick = new lib._5_2Click();
					pentangleImage = new lib._5_2();
				}
				pentangleClick.type = "p";
				pentangleClick.bound = null;
				this.shapeImages.push(pentangleImage);
				this.shapeClicks.push(pentangleClick);
				
			};
			this.setShapePosition = function(shapeImages,shapeClicks){
				var positionIndexList = [1,2,3,4];
				var count = 0;
				while(positionIndexList.length){
					var randomIndex = Math.floor(Math.random()*positionIndexList.length);
					var randomValue = positionIndexList[randomIndex];
					shapeImages[count].x = initPositon["x"+ randomValue] - shapeImages[count].nominalBounds.width/2;
					shapeImages[count].y = initPositon.y - shapeImages[count].nominalBounds.height/2;
					shapeImages[count].initX = shapeImages[count].x;
					shapeImages[count].initY = shapeImages[count].y;
					shapeClicks[count].x = shapeImages[count].x;
					shapeClicks[count].y = shapeImages[count].y;
					this.addChild(shapeImages[count]);
					this.addChild(shapeClicks[count]);
					positionIndexList.splice(randomIndex,1);
					count++;
				}
			}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0));

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhlCvQAshDAXg1QAYg3AKhTQALhRgFg+ICngmQgYB3gbBGQgeBNg+BWQgfAvg8A0Qg6Axg2AeQAdgaArhBg");
	this.shape.setTransform(210.9,186.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwNJYQh4AAAAh4IAAu/QAAh4B4AAMAgbAAAQB4AAAAB4IAAO/QAAB4h4AAg");
	this.shape_1.setTransform(140.9,110);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D4D4D4").s().p("AiyEiQgJgCgGgIQgFgHABgKQABgJAHgHQAagYApg+IAAABQArhBAWgzQAXg0ALhQQALhOgFg8QAAgJAFgIQAGgIAHgCICngmQAJgCAHAEQAIAEAEAIQAEAHgCAJQgZB6gbBHQggBQg/BYQgjAyg9A2Qg8Azg3AfQgGADgGAAIgGgBg");
	this.shape_2.setTransform(212.3,187.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D4D4D4").s().p("AwNJxQiRAAAAiRIAAu/QAAiRCRAAMAgbAAAQCRAAAACRIAAO/QAACRiRAAg");
	this.shape_3.setTransform(142.4,111.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer 23
	this.checkAnswerClick = new lib.CheckAnswerClick();
	this.checkAnswerClick.setTransform(663.3,656.3,1,1,0,0,0,109.5,44.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.checkAnswerClick}]}).wait(1));

	// Layer 11
	this.showAnswerClick = new lib.ShowAnswerClick();
	this.showAnswerClick.setTransform(890.7,656.8,1,1,0,0,0,109,43);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.showAnswerClick}]}).wait(1));

	// Layer 6
	this.instance = new lib.Layer6();
	this.instance.setTransform(19,452);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(1));

	// Show answer
	this.instance_1 = new lib.ShowAnswer();
	this.instance_1.setTransform(890.5,658.5,1,1,0,0,0,111.5,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(1));

	// Check answer
	this.checkAnswerImage = new lib.CheckAnswerBtn();
	this.checkAnswerImage.setTransform(668.4,658.5,1,1,0,0,0,115.4,45.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.checkAnswerImage}]}).wait(1));

	// Objects with pentagonal shape
	this.text = new cjs.Text("Objects with pentagonal shape", "bold 87px Myriad Pro", "#03305A");
	this.text.lineHeight = 87;
	this.text.lineWidth = 1218;
	this.text.setTransform(724.6,244.4,0.206,0.206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text}]}).wait(1));

	// Objects with rectangular shape
	this.text_1 = new cjs.Text("Objects with rectangular shape", "bold 87px Myriad Pro", "#03305A");
	this.text_1.lineHeight = 87;
	this.text_1.lineWidth = 1221;
	this.text_1.setTransform(441.4,243.4,0.206,0.206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1}]}).wait(1));

	// Objects with triangular shape
	this.text_2 = new cjs.Text("Objects with triangular shape", "bold 87px Myriad Pro", "#03305A");
	this.text_2.lineHeight = 87;
	this.text_2.lineWidth = 1168;
	this.text_2.setTransform(729.8,48.8,0.206,0.206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_2}]}).wait(1));

	// What is classification?   Let’s learn about classification  and
	this.text_3 = new cjs.Text("What is classification?\nLet’s learn about classification \nand try grouping these objects \naccording to their shapes.", "bold 87px Myriad Pro", "#FFFFFF");
	this.text_3.lineHeight = 87;
	this.text_3.lineWidth = 1368;
	this.text_3.setTransform(62.1,44.9,0.205,0.204);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_3}]}).wait(1));

	// Objects with circular shape
	this.text_4 = new cjs.Text("Objects with circular shape", "bold 87px Myriad Pro", "#03305A");
	this.text_4.lineHeight = 87;
	this.text_4.lineWidth = 1043;
	this.text_4.setTransform(459.6,48.8,0.206,0.206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_4}]}).wait(1));

	// Layer 21 copy 8
	this.instance_2 = new lib.Layer21copy8();
	this.instance_2.setTransform(711,236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).wait(1));

	// Layer 21 copy 8_1
	this.instance_3 = new lib.Layer21copy8_1();
	this.instance_3.setTransform(430,236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(1));

	// Layer 21 copy 7
	this.instance_4 = new lib.Layer21copy7();
	this.instance_4.setTransform(711,42);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(1));

	// Layer 21 copy 6
	this.instance_5 = new lib.Layer21copy6();
	this.instance_5.setTransform(430,42);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).wait(1));

	// Layer 5
	this.instance_6 = new lib.Layer5();
	this.instance_6.setTransform(37,31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(1));

	// Layer 2
	this.instance_7 = new lib.dratom_Full();
	this.instance_7.setTransform(62.2,170.7,0.35,0.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).wait(1));

	// Layer 21 copy 9
	this.instance_8 = new lib.Layer21copy9();
	this.instance_8.setTransform(413,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(19,29,983,675);


(lib.A1Bound = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AzXK8IAA13MAmvAAAIAAV3g");
	this.shape.setTransform(124,70);

	this.instance = new lib.TrueIconSmall();
	this.instance.setTransform(216.3,34,1,1,0,0,0,27.5,25.5);

	this.instance_1 = new lib.FalseIconSmall();
	this.instance_1.setTransform(218.3,32.4,1,1,0,0,0,26.5,26);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.instance}]},1).to({state:[{t:this.shape},{t:this.instance_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,248,140);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;