function KickstarterButton(){
    var _this = this;
    
    var finalDate = new Date(2015, 8, 20);
    var todaysDate = new Date();
    
    var dateDiff;
    
    var ribbonTextOutline;
    var ribbonText;
    
    var loadQueue = new createjs.LoadQueue();
    var loadManifest = [
        {id:"dream", src:"images/dream_150.png"},
        {id:"ks", src:"images/ks_logo.png"}
    ];
    
    var stage;
    
    function init(){
        console.log("finalDate: " + finalDate);
        console.log("todaysDate: " + todaysDate);
        
        dateDiff = getDateDiff(todaysDate, finalDate);
        
        console.log("dateDiff", dateDiff);
        
        // If date has already expired, do not proceed
        if(dateDiff <= 0){
            killKickstarter();
            return;
        }
        
        initStage();
        
        // Load Kickstarter Assets
        loadAssets();
    }
    
    function initStage(){
        
        $("body").append('<div id="kickstarter"><canvas id="ks_canvas" width="190" height="190"></canvas></div>');
        
        stage = new createjs.Stage("ks_canvas");
        createjs.Ticker.addEventListener("tick", stage);
        
    }
    
    function loadAssets(){
        loadQueue.addEventListener("complete", loadAssetsComplete);
        
        loadQueue.loadManifest(loadManifest);
    }
    
    function loadAssetsComplete(){
        loadQueue.removeEventListener("complete", loadAssetsComplete);
        
        displayKickstarter();
        
        activateKickstarter();
    }
    
    function activateKickstarter(){
        $(".no-touch #kickstarter").mouseenter(function(){
            ribbonText.color = "#ffffff";
        }).mouseleave(function(){
        
            ribbonText.color = "#000000";
        });
        
        $("#kickstarter").on("click", clickToKS);
    }
    
    function clickToKS(){
        window.open("http://aboandkaro.com", "_blank");
    }
    
    
    function displayKickstarter(){
        // Add Image
        var dreamImg = new createjs.Bitmap(loadQueue.getResult("dream"));
        dreamImg.regX = dreamImg.regY = 75;
        dreamImg.scaleX = dreamImg.scaleY = .75;
        dreamImg.x = dreamImg.y = 75 * dreamImg.scaleY;
        dreamImg.rotation = -37;
        
        stage.addChild(dreamImg);
        
        
        
        // Add Ribbon
        var rWidth = 300;
        var rHeight = 20;
        var ribbon = new createjs.Container();
        
        var ribbonShape = new createjs.Shape();
        ribbonShape.graphics.setStrokeStyle(1).beginStroke("#50A9D3").beginFill("#AAD6EA").lineTo(rWidth, 0).lineTo(rWidth, rHeight).lineTo(0, rHeight).lineTo(0,0);
        ribbon.addChild(ribbonShape);
        
        // Add text
        var shadowOffset = 1;
        ribbonTextOutline = new createjs.Text("ONLY " + dateDiff + " DAYS LEFT!", "800 14px Work Sans", "#50A9D3");
        ribbonTextOutline.textAlign = "center";
        ribbonTextOutline.x = (rWidth / 2) + shadowOffset;
        ribbonTextOutline.y = 2 + shadowOffset;
        
        ribbon.addChild(ribbonTextOutline);
        
        
        ribbonText = new createjs.Text("ONLY " + dateDiff + " DAYS LEFT!", "800 14px Work Sans", "#000000");
        ribbonText.textAlign = "center";
        ribbonText.x = rWidth / 2;
        ribbonText.y = 2;
        
        ribbon.addChild(ribbonText);
        
        
        
        
        // Kickstarter logo
        var ks = new createjs.Bitmap(loadQueue.getResult("ks") );
        ks.scaleX = ks.scaleY = .4;
        ks.x = 110
        ks.y = 30;
        ribbon.addChild(ks);
        
        
        
        ribbon.regX = rWidth / 2;
        ribbon.regY = rHeight / 2;
        
        ribbon.x = 85;
        ribbon.y = 85;
        
        
        ribbon.rotation = -45;
        
        console.log(ribbon);
        stage.addChild(ribbon);
        
        
        
        
        
    }
    
    
    
    function killKickstarter(){
        $("#kickstarter").css({display:"none"});
    }
    
    function getDateDiff(date1, date2){
        var diffMS = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffMS / (1000 * 3600 * 24));
    }
    
    init();
    
    return _this;
}