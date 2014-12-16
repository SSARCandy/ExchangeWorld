// JavaScript Document

var nowIn = "post";

var seekInnerHTML = '<div class="input-group input-group-lg" style="margin-top: 20px; margin-bottom: 10px"><input type="text" class="form-control" placeholder="Search anything"><span class="input-group-addon"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span></div><p style="font-size: small">or</p><div id="searchOptions" class="row"><div class="col-md-4"><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Distance<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">&lt; 500m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">500 ~ 1500m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">1500 ~ 5000m</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">&gt; 5000m</a></li></ul></div></div><div class="col-md-4"><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Categories<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Antiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Art</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Book</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">Clothing</a></li></ul></div></div><div class="col-md-4"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>  Search</button></div></div><hr style="border-color: #6E6E6E; border-width: 2px"><div id="searchResults" class="row"><div id="searchResult_1" class="row searchResult"><div class="col-md-4"><div class="thumbnail"><img src="static/img/alt.gif" alt="..."></div> </div><div class="col-md-8"><p>Name: </p><p>Category: </p><p>Want for: </p><p>Position: </p></div></div><div id="searchResult_2" class="row searchResult"><div class="col-md-4"><div class="thumbnail"><img src="static/img/alt.gif" alt="..."></div> </div><div class="col-md-8"><p>Name: </p><p>Category: </p><p>Want for: </p><p>Position: </p></div></div><!-- 這邊可以繼續往下列class="row searchResult"，藉由累加_後面的數字 --></div>';

var postInnerHTML = document.getElementById("leftSideSwitch").innerHTML;

function load_seek()
{
	document.getElementById(nowIn).className = "";
	document.getElementById("leftSideSwitch").innerHTML = seekInnerHTML;
	document.getElementById("seek").className = "active";
	nowIn = "seek";
}

function load_post()
{
	document.getElementById(nowIn).className = "";
	document.getElementById("leftSideSwitch").innerHTML = postInnerHTML;
	document.getElementById("post").className = "active";
	nowIn = "post";
}