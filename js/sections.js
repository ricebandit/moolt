var coverSection = (function($){
    var cover = new Object();
    
    cover.init = function(){
        
    }
    
    cover.getDisplayObject = function(){
        return $("#cover");
    }
    
    cover.resize = function(w, h, scale){
        
        var ratioH = 998 / 1413;
        
        $("#cover").css({width:w, height: h * ratioH});
    }
    
    cover.init();
    
    return cover;
    
})(jQuery)




var biosSection = (function($){
    var bios = new Object();
    var globalData;
    
    bios.init = function(global){
        globalData = global;
    }
    
    bios.getDisplayObject = function(){
        return $("#bios");
    }
    
    bios.resize = function(w, h, scale){
        
        var ratioH = 998 / 1413;
        
        $("#bios").css({width:w, height: h * ratioH});
        
        
        var containerW = $("#bios .container").width();
        var headerRatio = 39 / 350;
        var headerScale = .9;
        
        $("#bios .header").css({position:"relative", width:containerW * headerScale, height: (containerW * headerScale) * headerRatio, marginTop:0});
        
        $("#bios .header .bg").css({position:"absolute", top:0});
        
        $("#bios .header img").css({width:containerW * headerScale, height: (containerW * headerScale) * headerRatio, marginTop:0});
        
        $("#bios .header .name").css({fontSize:($("#bios .header").height() * .7), left:20 * scale, top:0 * scale});
        
        
        
        
        if(globalData.isAndroid()){
            if(window.orientation == 0){
                $("#bios .bio").css({lineHeight: 1});
                $("#bios .bio").css({fontSize:18 * scale, marginTop:20 * scale, width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
            }else{
                $("#bios .bio").css({lineHeight: 1, fontSize:4, marginTop:5 * scale });
                $("#bios .bio").css({width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
                $("#bios .header img").css({position:"absolute", marginTop:0});
                $("#bios .header .name").css({top:0});
            }
        }else if(globalData.isMobile()){
            if(window.orientation == 0){
                $("#bios .bio").css({lineHeight: 3 * scale});
                $("#bios .bio").css({fontSize:16 * scale, marginTop:20 * scale, width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
            }else{
                
                $("#bios .bio").css({lineHeight: 1, fontSize:20 * scale, marginTop:5 * scale});
                $("#bios .bio").css({fontSize:2, width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
                $("#bios .header img").css({position:"absolute", marginTop:0});
                $("#bios .header .name").css({top:0});
            }
        }else if(globalData.isTablet()){
            if(window.orientation == 0){
                $("#bios .bio").css({lineHeight: 1.5 * scale});
                $("#bios .bio").css({fontSize:19 * scale, marginTop:20 * scale, width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
            }else{
                $("#bios .bio").css({lineHeight: 3 * scale, fontSize:6,marginTop:5 * scale });
                $("#bios .bio").css({width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
                $("#bios .header img").css({position:"absolute", marginTop:0});
                $("#bios .header .name").css({top:0});
            }
        }else if(globalData.isFF()){
                //$("#bios .bio").css({lineHeight: Math.floor(3 * scale)});
                $("#bios .bio").css({fontSize:14 * scale, marginTop:20 * scale, width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
            
        }else{
                $("#bios .bio").css({fontSize:15 * scale, marginTop:20 * scale, width:$("#bios .header").width() - (20 * scale), margin: "0 auto"});
        }
        
        $("#bios .container").css({marginTop:80 * scale});
    }
    
    return bios;
    
})(jQuery)





var contactSection = (function($){
    var contact = new Object();
    var globalData;
    
    contact.init = function(global){
        var scope = this;
        
        globalData = global;
        
        $("#email_form .submit_button").on("click", function(){
            scope.onEmailClick();
        })
        
        // Activate Email Inputs
        $("input").focus(function(){
            $(this).val("")
        }).blur(function(){
            var defaultVal = $(this).attr("data-value");
            if($(this).val() == "")
            {
                $(this).val( defaultVal );
            }
        });

        $("textarea").focus(function(){
            var defaultVal = $(this).attr("data-value");
            if($(this).val() == defaultVal)
            {
                $(this).val("");
            }


        }).blur(function(){
            var defaultVal = $(this).attr("data-value");
            if($(this).val() == "")
            {
                $(this).val( defaultVal );
            }
        });
        
        $(".social").on("click", function(evt){
            console.log("this.id: " + this.id);
            
            switch(this.id){
                case "vimeo_btn":
                    window.open("https://vimeo.com/user38323688", "_blank");
                    break;
                case "facebook_btn":
                    window.open("https://www.facebook.com/moolt", "_blank");
                    break;
                case "twitter_btn":
                    window.open("https://twitter.com/mooltfilms", "_blank");
                    break;
                case "youtube_btn":
                    window.open("https://www.youtube.com/channel/UCEq0ld3ubbG4Y-n0AZr6bag/feed", "_blank");
                    break;
            }
        });
    }
    
    contact.getDisplayObject = function(){
        return $("#contact");
    }

    contact.onEmailClick = function(){
        
        var scope = this;

        if($("#email_form .email_address").val() != $("#email_form .email_address_confirm").val())
        {
            alert("Please check that the email you entered is correct.");
            return;
        }

        $.ajax({
            type:"POST",
            url: "php/email.php",
            data: {email_address:$("#email_form .email_address").val(), email_message:$("#email_form .email_message").val(), first_name:$("#email_form .first_name").val(), last_name:$("#email_form .last_name").val()},
            success: function(response){scope.emailResponse(response);}
        })
    }
	
	contact.emailResponse = function(response)
	{
		
		if(response == "true" || response == "true " || response.indexOf("true") > 0)
		{
			alert("Your email was sent successfully!");
		}else{
			alert("Your email was not sent for the following reason: " + response);
		}
		
	}
    
    contact.resize = function(w, h, scale){
        
        var ratioH = 998 / 1413;
        
        var origW = 590;
        var origH = 760;
        
        var origTop = 117;
        
        $("#contact").css({width:w, height: h * ratioH});
        
        $("#email_form").css({width:origW * scale, height:origH * scale, margin: (origTop * scale) + "px auto"});
        
        
        // Modify per device
        if(globalData.isIOS()){
            
            if(window.orientation == 0){
                // PORTRAIT
                    $(".input_50").css({width:((origW * scale) / 2) - (25 * scale), fontSize:23 * scale});
                    $(".input_100").css({width:(origW * scale) -  (12 * scale), height: 529 * scale, fontSize:23 * scale});
                    $(".submit_button").css({height: 132 * scale, fontSize:25 * scale, position:"static"});
            }else{
                
                // LANDSCAPE
                $(".input_50").css({width:((origW * scale) / 2) - (27 * scale), fontSize:23 * scale});
                $(".input_100").css({width:(origW * scale) - (28 * scale), height: 490 * scale, fontSize:23 * scale});
                $(".submit_button").css({height: 132 * scale, fontSize:25 * scale, position:"relative", top:-(50 * scale)});
            }
            
        }else if(globalData.isAndroid()){
            if(window.orientation == 0){
                // PORTRAIT
                $(".input_50").css({width:((origW * scale) / 2) - (2 * scale), fontSize:25 * scale});
                $(".input_100").css({width:(origW * scale) - 4, height: 529 * scale, fontSize:25 * scale});
                $(".submit_button").css({height: 132 * scale, fontSize:25 * scale});
            }else{
                
                // LANDSCAPE
                $(".input_50").css({width:((origW * scale) / 2) - (3 * scale), fontSize:25 * scale});
                $(".input_100").css({width:(origW * scale) - 4, height: 529 * scale, fontSize:25 * scale});
                $(".submit_button").css({height: 132 * scale, fontSize:25 * scale});
            }
        }else{
            $(".input_50").css({width:((origW * scale) / 2) - 3, fontSize:25 * scale});
            $(".input_100").css({width:(origW * scale) - 4, height: 529 * scale, fontSize:25 * scale});
            $(".submit_button").css({height: 132 * scale, fontSize:25 * scale});
        }
        $("#email_form textarea").css({width:$("#email_form").width() - 9});
    }
    
    return contact;
    
})(jQuery)



var footerSection = (function($){
    var footer = new Object();
    
    var clickCallback;
    var sectionsLibrary;
    var globals;
    
    footer.init = function(callback, sections, global){
        clickCallback = callback;
        sectionsLibrary = sections;
        globals = global;
        
        $("#btns .nav").on("click", callSection);
        $("#logo").on("click", callHome);
    }
    
    footer.getDisplayObject = function(){
        return $("#footer");
    }
    
    footer.resize = function(w, h, scale){
        
        var ratioH = 415 / 1413;
        
        $("#footer").css({width:w, height: h * ratioH});
        
        
        
        // Logo
        var logoRatio = 201 / 768;
        $("#logo").css({width:w, height:w * logoRatio});
        
        // Buttons
        $("#btns").css({width:592 * scale, height:96 * scale});
        
        $("#btns .btn").css({width:82 * scale, height:82 * scale, marginLeft:14 * scale});
    }
    
    function callSection(evt){
        
        var id = $(evt.currentTarget)[0].id.split("_")[0];
        
        clickCallback(sectionsLibrary[id]);
    }
    
    function callHome(evt){
        
        var id = "cover";
        
        clickCallback(sectionsLibrary[id]);
    }
    
    return footer;
    
})(jQuery)