var NYT;
var query;
var btn;
var menu5;
var url = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=e7dcfbfa99934c0c8b670bda03ab8394";
var url2 = "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=e7dcfbfa99934c0c8b670bda03ab8394";
var url3 = "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=e7dcfbfa99934c0c8b670bda03ab8394";
var url4 = " https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=e7dcfbfa99934c0c8b670bda03ab8394";
var countAdditions = 0;

var popUpGlobal;

document.addEventListener("DOMContentLoaded", function(){
	//this is where we put ALLLLLLLL event listeners or anythign we need to get by id
	menu5 = document.getElementById("menu5");
	menu5.addEventListener("click", revealMenu);
	$("#popUp").mouseleave(hidePopUp);
	$("#menuSection").mouseleave(function(){
			$("#menuSection").fadeOut("shlow")
		});

	//loadArticles();
	loadArticles();
	loadPictures();

});

$(window).on("scroll", function() {
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
		console.log("BOTTOM");
		if (countAdditions == 5){
			return false;
		}
		else if (countAdditions == 0){
		loadMoreArticles();
		countAdditions++;
		}
		else {
		loadMoreArticles2();
		console.log("loadMore2");
		countAdditions++;
		}

	    // when scroll to bottom of the page
	}
})
function revealMenu(){
	$("#menuSection").fadeIn("slow");
	
}

function overlay(){
	document.getElementById("overlay").style.display = "block";
	// document.getElementById("overlay").fadeIn("slow");
}

function hideOverlay(){
	// document.getElementById("overlay").		fadeOut("slow");
	document.getElementById("overlay").style.display = "none";
}

function hidePopUp(){
	popUpGlobal = document.getElementByClassName("popUp");
		while (popUpGlobal.firstChild) {
			popUpGlobal.removeChild(myNode.firstChild);
		}
		console.log("CLEARING");
}

function printTitles(JSONObjectList){
	var count = 0;
	$.each(JSONObjectList.articles, function(key, value){
			console.log(key + ": " + value.title);
			$( ".articleSection" ).append( "<article class='article'>"+value.title+"</article>" );
			count++;
			if (count == 4){
				return false;
			}
		});
}

function explode(search_query){
	console.log(search_query);
	query = search_query;

}

function addTitlesToArticleSection(JSONObjectList){
	var count = 0;
	$.each(JSONObjectList.articles, function(key, value){
			// console.log(key + ": " + value.title);
			// Adds data.articles[i].title to ArticlesSection as article class
			$( ".articleSection" ).append(
			// ARTICLE BEGIN
			"<article class='article'>" + 

			"<p class='articleContent'>" + 	
			//ARTICLE LINK
			"<a href=\'" +
				value.url +
					"\' target=\'_blank\'	>" + 
				"<img class='articleImg' src=\'" + 
					value.urlToImage + 
						"\' alt='article pic'>" + 
			//END ARTICLE LINK
			"</a>" + 
			// ARTICLE DESCRIPTION 
			/* "<p class='articleContent'>" + 	*/
			value.description +
			

			// CUSTOM EXPLODE BUTTON
			"<button class=\'explodeButton\' type=\'button\' onclick=\"explode(\'" + 
			Array.from(value.title.replace(/[^a-zA-Z ]/g,'').split(" "))+ 
			"\')\"> Try it </button>" + 

			"</p>" + 
			// ARTICLE END
			"</article>");
			count++;
			if (count == 6){
				return false;
			}
		});
}

function updateURL(urlOfArticle){
				var popUp = $(".popUp");
				popUp.innerHTML = urlOfArticle;
}

function addArticles(JSONObjectList){
	var count = 0;
	var articleSectionObj = $(".articleSection");
	$.each(JSONObjectList.articles, function(key, value){
		var article = document.createElement("ARTICLE");
		var p = document.createElement("P");
		var a = document.createElement("A");
		var img = document.createElement("IMG");
		var button = document.createElement("BUTTON");
		var i = document.createElement("I");
		var url = value.url;



		img.setAttribute("class", "articleImg");
		img.setAttribute("src", value.urlToImage);
		img.setAttribute("alt", value.title);

		a.setAttribute("href", value.url);
		a.setAttribute("target", "_blank");
		a.append(img);

		p.setAttribute("class", "articleContent");

		button.setAttribute("class", "explodeButton");
		button.setAttribute("type", "button");
		button.setAttribute("border-color","white");
		button.setAttribute("background-color", "white");
		button.setAttribute("outline","none");


		i.setAttribute("class", "fa fa-eye");
		i.setAttribute("aria-hidden","true");
		button.append(i);

		button.onclick = function(){
			var popUp = $(".popUp");
			var iFrame = document.createElement("IFRAME");

			iFrame.setAttribute("height", 900);
			iFrame.setAttribute("width", 900);
			iFrame.setAttribute("src", url)
			
			popUp.append(iFrame);
			overlay();

			// iFrame.scrollTo(100,0);
			popUp.fadeIn("slow");
			// body.style.display = "block";

			// $(".popUp").mouseleave(hidePopUp);
			popUp.mouseout(function(){
				$('.popUp').empty();
				popUp.fadeOut("slow");

				// console.log("CLEARING FROM POPUP MOUSEOUT");
				// popUp.innerHTML = "";
				// console.log("TESTETESTTE");
				// document.getElementById("#overlay").style.display = "none";
				hideOverlay();
				 }) };


		// button.innerHTML = "TRY";

		article.setAttribute("class", "article");

		p.append(a);
		p.innerHTML += value.description;

		p.append(button);


		article.append(p);
		articleSectionObj.append(article);
		count++;
		if (count == 9){
			return false;
		}

	});
}



function addPictures(JSONObjectList){
		var count = 0;
		var videoSectionObj = $( "#images" );
		$.each(JSONObjectList.articles, function(key, value){
			var image = document.createElement("IMG");
			image.setAttribute("src", value.urlToImage );
			image.setAttribute("width", "200");
   			image.setAttribute("height", "200");
   			image.setAttribute("alt", value.title);
   			var p = document.createElement("P");
   			p.innerHTML = value.title;
   			var div = document.createElement("DIV");
   			div.setAttribute("class", "imagesI")
   			div.append(image);
   			div.append(p);

   			if (count < 6){
   				count++;
   				return true;
   			}
   			videoSectionObj.append(div);

		})
}
function loadArticles() {
	$.getJSON(url).done(function( data ){
		NYT = data;
		console.log(data);
		addArticles(data);
	});

	$.getJSON(url2).done(function( data ){
		NYT = data;
		console.log(data);
		addArticles(data);

	});

};

function loadMoreArticles() {
	$.getJSON(url3).done(function( data ){
		NYT = data;
		console.log(data);
		// addTitlesToArticleSection(data);
		addArticles(data);
		// $.each(data.items, function(i, item) {
		// 	console.log(data.items[i]);
		// });
	});

};

function loadMoreArticles2() {
	$.getJSON(url4).done(function( data ){
		NYT = data;
		console.log(data);
		// addTitlesToArticleSection(data);
		addArticles(data);
		// $.each(data.items, function(i, item) {
		// 	console.log(data.items[i]);
		// });
	});

};

function loadPictures(){
	$.getJSON(url).done(function( data ){
		NYTPics = data;
		addPictures(data);
			});
}


