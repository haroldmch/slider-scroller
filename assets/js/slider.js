var PLAY_SLIDER_SCROLLER = true;
var TIME_SLIDER_SCROLLER = 5000;

var DELAY_SLIDER_SCROLLER = false;
//var ANCHORS_SLIDER = [];
var ITEM_WIDTH;
var MAX_WIDTH;
var CURRENT_SLIDER_WIDTH;
var CURRENT_SLIDER;
var LAST_SLIDER;

$(function(){
    initialize();
    $(window).resize(function(){
        initialize();
    });
    
    $('.move_right').click(function(){
        moveScroller(0);
    });
    $('.move_left').click(function(){
        moveScroller(-1);
    });
});

function initialize(){
    MAX_WIDTH = 0;
    var i = 0;
    $('.scroller_element').each(function(){
        $(this).attr("ondragstart","return false");
        //ANCHORS_SLIDER[i] = $(this).index();
        MAX_WIDTH += $(this).width();
        i++;
    });
    $('.container_scroller').width(MAX_WIDTH);
    CURRENT_SLIDER = 1;
    LAST_SLIDER = i;
    ITEM_WIDTH = $('.scroller_element').width();
    CURRENT_SLIDER_WIDTH = $('.slider_scroller').width();
    $('.scroller_element').fadeIn('fast');
    loopPlaySliderScroller();
}

function moveScroller(direction){
    if(!DELAY_SLIDER_SCROLLER){
        DELAY_SLIDER_SCROLLER = true;
        var $slider = $('.slider_scroller');
        
        if(direction == 0){
            if(verifySlider()){
                $slider.stop(true).animate({
                    scrollLeft: (ITEM_WIDTH * CURRENT_SLIDER)+'px'
                }, 500,function(){
    				DELAY_SLIDER_SCROLLER = false;
    			});
                CURRENT_SLIDER++;
            }else{
                CURRENT_SLIDER = 0;
                $slider.stop(true).animate({
                    scrollLeft: (ITEM_WIDTH * CURRENT_SLIDER)+'px'
                }, 500,function(){
    				DELAY_SLIDER_SCROLLER = false;
    			});
                CURRENT_SLIDER++;
            }
        }else{
            CURRENT_SLIDER--;
            if(CURRENT_SLIDER >= 1){
                $slider.stop(true).animate({
                    scrollLeft: (ITEM_WIDTH * (CURRENT_SLIDER - 1) )+'px'
                }, 500,function(){
    				DELAY_SLIDER_SCROLLER = false;
    			});
            }else{
                CURRENT_SLIDER = LAST_SLIDER - (verifySlider() + 1);
                $slider.stop(true).animate({
                    scrollLeft: (MAX_WIDTH)+'px'
                }, 500,function(){
    				DELAY_SLIDER_SCROLLER = false;
    			});
            }
        }
    }
}
function verifySlider(){
    var max_item = Math.floor(CURRENT_SLIDER_WIDTH/ITEM_WIDTH);
    var total_item = max_item + CURRENT_SLIDER;
    var total_width = total_item * ITEM_WIDTH;
    
    if(total_width > MAX_WIDTH){
        return false;
    }else{
        return true;
    }
    
}

function loopPlaySliderScroller(){
    var loop;
    if(PLAY_SLIDER_SCROLLER == false){
        return;
    }else if(PLAY_SLIDER_SCROLLER == true){
        loop = setInterval('moveScroller(0)',TIME_SLIDER_SCROLLER);
        PLAY_SLIDER_SCROLLER = false;
    }else{
        clearInterval (loop);
        PLAY_SLIDER_SCROLLER = true;
    }
}