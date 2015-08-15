var cover;
var bios;
var contact;
var footer;

var currSection;
var prevSection;

$(document).ready(function(){
    
    cover = coverSection;
    bios = biosSection;
    bios.init(globals);
    
    contact = contactSection;
    contact.init(globals);
    
    footer = footerSection;
    
    footer.init(displayNextSection, {"cover":cover, "bios":bios, "contact":contact}, globals);
    
    $(window).resize(function(){
        onResize();
    })
    
    $(window).on("orientationchange", function(){
        onResize();
    });
    
    
    $(".section").css({display:"none"});
    
    // Display Initial Section
    displayNextSection(cover);
});

function displayNextSection(section){
    if(section == currSection){ return; }
    
    if(currSection){
        prevSection = currSection;
        prevSection.getDisplayObject().css({zIndex: -1});
        
        prevSection.getDisplayObject().fadeTo(500,0);
    }
    
    currSection = section;
    currSection.getDisplayObject().css({overflow:"hidden"});
    currSection.getDisplayObject().fadeTo(0,0);
    currSection.getDisplayObject().css({zIndex: 1, display:"block"});
    
    currSection.getDisplayObject().fadeTo(1000, 1, function(){
        if(prevSection){
            prevSection.getDisplayObject().css({display:"none"});
        }
    });
    
    onResize();
    
    currSection.getDisplayObject().css({overflow:"visible"});
}

function onResize(){
    $("#main_container").css({width:$(window).width(), height:$(window).height()});
    var origW = 768;
    var origH = 1300;
    var ratioX = origH / origW;
    var ratioY = origW / origH;
    var ratioY = origW / origH;
    
    var minW = $("#main_container").css("min-width");
    var minWNumber = 0; // Number(minW.slice(0, minW.indexOf("px")) );
    
    // Fit content to window, default to height
    var newH = $(window).height();
    var newW = newH * ratioY;
    
    // If width is smaller than main_container's minimum width, set. Set height to ratio.
    if(newW < minWNumber){
        newW = minWNumber;
        newH = newW * ratioX;
        
        $("#main_container").css({height: newH});
    }
    
    $("#content").css({width:newW, height:newH});
    
    var scale = newW / origW;
    
    cover.resize(newW, newH, scale);
    bios.resize(newW, newH, scale);
    contact.resize(newW, newH, scale);
    footer.resize(newW, newH, scale);
}