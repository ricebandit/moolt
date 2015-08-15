var globals = (function ($) {
    globals = new Object();

    globals.isMobile = function(){
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/g.test(navigator.userAgent);
    };

    globals.isIOS = function(){
        return /iPad|iPhone|iPod/g.test(navigator.userAgent);
    };

    globals.isAndroid = function(){
        return /Android/g.test(navigator.userAgent);
    };

    globals.isTablet = function(){
        return /Android|webOS|iPad|IEMobile|Opera Mini/g.test(navigator.userAgent);
    };

    globals.isAndroid = function(){
        return /Android/g.test(navigator.userAgent);
    };
    
    globals.isFF = function(){
        return /Firefox/g.test(navigator.userAgent);
    }
    

    return globals;
}(jQuery));