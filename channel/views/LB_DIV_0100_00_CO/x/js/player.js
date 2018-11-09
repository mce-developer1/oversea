var player = function(folderName, numberOfSegments) {
    var videoSrc,
        video,
        $logoDiv,
        $playerDiv,
        $navButtonDiv;
      
    var currentVideo = 0;
               
    var loadVideo = function(videoNo) {
        videoNo = parseInt(videoNo);
        currentVideo = videoNo;
        
        updateVidSource(); 
        updateButtonState();
        video.load();
    };
    
    var videoHasEnded = function() {
        currentVideo = parseInt(currentVideo);
        if (isPlayAll() && currentVideo < videoSrc.length-1) {
            loadVideo(currentVideo + 1);
        } 
    };
    
    var isPlayAll = function() {
        return $('#playall_checkbox').is(':checked');
    };
    
    var initVideoSrc = function() {
        videoSrc = [];
        for (var i=0; i<numberOfSegments; i++) {
            videoSrc[i] = [
                "media/" + folderName + "_S" + (i+1) + ".mp4",
                "media/" + folderName + "_S" + (i+1) + ".webm"
            ];
        }
    };
    
    var initMarkup = function() {
        var $content = $('#content');
        
        $logoDiv = $('<div class="mco_logo"><img id="mco_logo_img" class="pull-right" src="img/logo.png" height="30"/></div>').appendTo($content);
        $playerDiv = $('<div class="mco_player_wrapper">\n\
                            <video autoplay controls id="mco_player" src="">\n\
                            video not supported\n\
                            </video>\n\
                        </div>').appendTo($content);
        $navButtonDiv = $('<div>').appendTo($content);
        
        video = document.getElementById('mco_player');
        
        var i,
            noVideo = videoSrc.length;
        
        $('<div class="pull-right"><label class="checkbox"><input id="playall_checkbox" type="checkbox"> Play All</input></label></div>')
            .appendTo($navButtonDiv);
        
        for (i=0; i<noVideo; i++) {
            $('<button type="button" class="btn mco_segment_btn" data-segment="' + i + '">' + (i+1) + '</button>')
                .appendTo($navButtonDiv)
                .click(function() {
                    loadVideo($(this).data('segment'));
                }
            );
                
        }
    };
    
    var initEvents = function() { 
        video.addEventListener("timeupdate", function() {
            if(video.duration>0 && video.currentTime>0 && Math.abs(video.currentTime-video.duration)<=0.25) {
                videoHasEnded();
            }
        });

        video.addEventListener("ended", function(e) {
            videoHasEnded();
        });
        
        video.addEventListener("canplay", function(e) {
            // For autoplay
            video.play();
        });
        
        video.addEventListener("loadeddata", function(e) {
            // For autoplay, Android 4.0.3 browser
            video.play();
        });
    };
    
    var updateVidSource = function() {
        if(Modernizr.video && Modernizr.video.h264) {
            video.setAttribute("src", videoSrc[currentVideo][0]);
        } else if(Modernizr.video && Modernizr.video.webm) {
            video.setAttribute("src", videoSrc[currentVideo][1]);
        } 

        video.load();
    };
    
    var init = function() {
        initVideoSrc();
        initMarkup();
        initEvents();
        
        setTimeout(function() {
            $("#mco_logo_img").fadeOut();
        }, 3000);
    };
    
    var updateButtonState = function() {
        $navButtonDiv.find(".mco_segment_btn").each(function() {
            var $this = $(this);
            $this.removeClass("active");
            
            if (currentVideo===$this.data('segment')) {
                $this.addClass("active");
            }
        });
    };
    
    init();
    
    if (!videoSrc || !(videoSrc instanceof Array) || videoSrc.length<=0) {
        alert("Invalid video sources or number of segments. Please check the config.js");
        return;
    }
    
    loadVideo(0);   
};