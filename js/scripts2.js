//JS that runs on page load
//let count = document.getElementById('count').value;


let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!
	let yyyy = today.getFullYear();
	let dayMax = document.getElementById('day');
	let beginMax = document.getElementById('begin');
	let endMax = document.getElementById('end');
	
		if(dd<10) {
    	dd = '0'+dd
		} 

		if(mm<10) {
    	mm = '0'+mm
		} 
	today = `${yyyy}-${mm}-${dd}`;
	dayMax.max = today;
	beginMax.max = today;
	endMax.max = today;


let url = ``;
let obj = {}
let xhr;
let autoplayCount;	
let duration;
let myInterval;
let app;
let bigPicDiv;
let thumbsDiv;
let footer;
let footerTxt;
let durationChooser;
let autoPlayBtn;
let bigPic;
let thumbPic;

function query(){
	console.log(begin)
	if(!end){
		end= today;
	}
	
	document.getElementById('app').innerHTML = '';
//	url = `https://api.nasa.gov/planetary/apod?api_key=nP8Dou6JfjNz2r4IZKrV4neia6KRPXskyLLNTUDK&count=${count}`
	url = `https://api.nasa.gov/planetary/apod?api_key=nP8Dou6JfjNz2r4IZKrV4neia6KRPXskyLLNTUDK&start_date=2018-10-25&end_date=2018-10-31`
	xhr = new XMLHttpRequest()
		xhr.onload = function(){
		obj = JSON.parse(xhr.responseText)
		loadPage();
		}
	xhr.open('GET', url, true)
	xhr.send()
}

function loadPage(){  
  console.log(obj)          
	
	autoplayCount = 0;//var for autoplay; to keep track of which picture we're at in the slideshow
 	duration = 5;//how long to wait between image swaps

	document.body.style.backgroundColor = '#123';
	app = document.getElementById('app');
	app.style.cssText = 'background:#555; width: 95%; height: 95vh; padding: 10px; margin 10px auto;';//Only use the equal once unless you want to overwrite properties, use +=. Remember it uses the same rules as CSS, which means the declaration that comes last takes precedence

	bigPicDiv = document.createElement('div');
	bigPicDiv.style.cssText = 'width: 75%; float:left; background-color:#888; height:80vh; margin-bottom: 15px; overflow-y: scroll;';
	app.appendChild(bigPicDiv);

	thumbsDiv = document.createElement('div');
	thumbsDiv.style.cssText = 'width:24%; float:right; background-color:#AAA; height: 80vh; margin-bottom: 15px; overflow-y: scroll;';
	app.appendChild(thumbsDiv);

	footer = document.createElement('div');
	footer.style.cssText = 'clear:both; height:15vh; background-color:#CCC;overflow-y:scroll';
	app.appendChild(footer);

	footerTxt = document.createElement('h3');//caption holder
	footerTxt.style.cssText = 'display:inline; float:left; color:beige; max-width:65%; font-family:sans-serif; padding-left:15px;';
	footer.appendChild(footerTxt);

	durationChooser = document.createElement('input');
	durationChooser.type='number';
	durationChooser.maxLength = '3';
	durationChooser.style.cssText = 'width:90px; color:beige; background-color:forestgreen; max-width: 70%; font-family:sans-serif; float:right; font-size:1.25rem; font-weight:bold; margin: 5px; padding: 5px;';
	durationChooser.value = duration;
	footer.appendChild(durationChooser);

	autoPlayBtn = document.createElement('button');
	autoPlayBtn.innerHTML='AUTOPLAY';
	autoPlayBtn.style.cssText= 'padding:5px 25px; margin:5px; font-weight:bold; font-size: 1.25rem; background-color:#ADB; color:#586; float:right; letter-spacing:2px; cursor:pointer;';
	autoPlayBtn.addEventListener('click', initAutoPlay);
	footer.appendChild(autoPlayBtn);


function initAutoPlay (){
	duration = Number(durationChooser.value);//get value from input box
	if(duration != ''){
		duration*=1000; //convert ms to seconds
		duration = Math.abs(duration);//negate negatives
	}else{
		duration = 5000;
		durationChooser.value = duration/1000
	}
	
	myInterval = setInterval(swapPic, duration);//set and store the interval
	autoPlayBtn.removeEventListener('click',initAutoPlay);
	autoPlayBtn.innerHTML='STOP';
	autoPlayBtn.addEventListener('click', stopAutoPlay);
	autoPlayBtn.style.cssText += 'background-color:#DAA; color:#855;';
}

function stopAutoPlay(){
	clearInterval(myInterval);
	autoPlayBtn.removeEventListener('click', stopAutoPlay);
	autoPlayBtn.innerHTML = 'AUTOPLAY';
	autoPlayBtn.addEventListener('click',initAutoPlay);
	autoPlayBtn.style.cssText+= 'background-color:#ADB; color:#586;';
}

//let obj1 =obj;
//let res = []
//for(let i = 0; i<obj1.length; i++){
//	res.push(obj1[i]);
//}
//	
//let arc = {}
//let num = 0
//for(let i = 0; i<res.length; i++){
//	if(res[i].media_type == 'image'){
//		arc[num] = res[i]
//		num++
//    }
//}
//	
//	for(let i =0; i<Object.keys(arc).length; i++){
//		console.log(arc[i].title)
//	}

bigPic = new Image(); //creates image object for bigPic
bigPic.style.cssText='width:100%;height:auto;margin-bottom:10px;'
//console.log(obj[0].url);
bigPic.src=`${obj[0].url}`;
console.log(bigPic.src)

bigPicDiv.appendChild(bigPic);
footerTxt.innerHTML=obj[0].explanation;

for (let i=0;i<obj.length;i++) {
	thumbPic = new Image();
	thumbPic.style.cssText='width:100%; height:auto; margin-bottom:10px;';
	thumbPic.src = `${obj[i].url}`;
	thumbPic.id = i;
	thumbPic.addEventListener('click', swapPic);
	thumbsDiv.appendChild(thumbPic);
}

function swapPic(){
	if(event){
		footerTxt.innerHTML = `${obj[event.target.id].explanation}`;
		bigPic.src=event.target.src;
	}else{
		bigPic.src = `${obj[autoplayCount].url}`;
		footerTxt.innerHTML=`${obj[autoplayCount].explanation}`;
		if (autoplayCount<obj.length-1){
			autoplayCount++;
		}else{
			autoplayCount=0;
		}
	}
}
}