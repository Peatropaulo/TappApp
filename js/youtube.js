var search;
var category = "music";
var results;
var currentVideo;
var currentIndex;
var videoIDs, ctags, htags, stags, ptags, wtags = [];

ctags = ["chill", "porn", "gambino"];

function searchVideos() {

    var searchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+search+"&key=AIzaSyBqoNc396Db0tYILTe8-qazHwuCwQkF0Kk&maxResults=50";
    
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", searchURL, false );
    xmlHttp.send();
    results = xmlHttp.responseText;
    //console.log(results);
    results = $.parseJSON(results);
    currentIndex = 0;
    parseResults();
   
}

function searchVideosMoods() {
    var searchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+search+"&key=AIzaSyBqoNc396Db0tYILTe8-qazHwuCwQkF0Kk&maxResults=50";
    
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", searchURL, false );
    xmlHttp.send();
    results = xmlHttp.responseText;
    //console.log(results);
    results = $.parseJSON(results);
    parseResultsMoods();    
    
}

function parseResultsMoods() {
    
    $.each(results.items, function(item) {
        if(results.items[item].id.videoId != null && results.items[item].id.videoId != undefined)
            videoIDs.push(results.items[item].id.videoId);
    });  
    
}

function setChill() {
    shufflectags();
    alert(ctags);
    for(int i=0;i<3;i++) {    
        search = ctags[i]+ " music";
        searchVideosMoods();
    }
    shuffleArray();
    currentIndex = 0;
    embedVideo();
}
function setHappy() {
    search="happy music";
    searchVideos();
}
function setStudying() {
    search="studying music";
    searchVideos();
}
function setParty() {
    search="party music";
    searchVideos();
}
function setWorkout() {
    search="workout music";
    searchVideos();
}
function setSearch() {
    search = document.getElementById("search").value + " music";
    searchVideos();
}

function getVideosMoods() {
    
}

function parseResults() {
    
    videoIDs = [];
    
    $.each(results.items, function(item) {
        if(results.items[item].id.videoId != null && results.items[item].id.videoId != undefined)
            videoIDs.push(results.items[item].id.videoId);
    });  
    
    shuffleArray();
    
    var searchURL = "https://gdata.youtube.com/feeds/api/videos/"+videoIDs[0]+"?v=1";
    
    var xmlHttp = null;

    /*xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", searchURL, false );
    xmlHttp.send( null );
    results = xmlHttp.responseText;

    var splits = results.split("duration='");
    splits.splice(0, 1);
    results = splits[0];
    var loc = results.indexOf("'"); IF DURATION IS GREATER THAN 500
    var duration = results.substring(0,loc);
    
    if (duration > 500) {
        
        
    }
    */
    
}

function shuffleArray() {
    var array = videoIDs;
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    videoIDs = array;

    embedVideo();
}

function shufflectags() {
    
    var array = ctags;
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    ctags = array;     
}

function shufflehtags() {
    
    var array = htags;
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    htags = array;     
}

function shufflestags() {
    
    var array = stags;
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    stags = array;     
}

function shuffleptags() {
    
    var array = ptags;
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    ptags = array;     
}

function shufflewtags() {
    
    var array = wtags;
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    wtags = array;     
}

function embedVideo() {
    $('#videoplayer').empty();
    currentVideo = videoIDs[currentIndex];
    if(currentVideo == null || currentVideo == undefined)
        alert("No results found!");
    else {
        $('#videoplayer').append("<iframe width='560' id='idank' height='310' src='http://www.youtube.com/embed/"+currentVideo+"?&fs=0&controls=0&autohide=1&color=white&autoplay=1&version=3&enablejsapi=1&iv_load_policy=3' frameborder='0' ></iframe>");
    }
    
    onYouTubeIframeAPIReady();
    
}

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('idank', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function pause() {
    player.pauseVideo();
}

function play() {
    player.playVideo();
}

function onPlayerStateChange(event) {
    if(YT.PlayerState.ENDED == event.data){
        nextSong();
    }
}

function flagSong() {
    alert('flagged');
}

function nextSong() {
    
    currentIndex++;
    currentVideo = videoIDs[currentIndex];

    embedVideo();
}
