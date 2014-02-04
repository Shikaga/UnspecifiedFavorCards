function streamVideoToCanvas() {

    function streamVideo(id) {
        // Grab elements, create settings, etc.
        var canvas = document.getElementById("qr-canvas"),
            context = canvas.getContext("2d"),
            video = document.getElementById("video");

        var videoObj = {
            video: {
                optional: [{sourceId: id}]
            }
        };

        console.log(videoObj);

        var errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };

        // Put video listeners into place
        if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream){
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        else if(navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia(videoObj, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }

        setInterval(
            function () {
                context.drawImage(video, 0, 0, 640, 480);
            },33);
    }


    function gotSources(sourceInfos) {
        var lastId = null;
        for (var i = 0; i != sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            if (sourceInfo.kind === 'video') {
                console.log(sourceInfo);
                lastId = sourceInfo.id;
            }
        }
        streamVideo(lastId);
    }

    if (typeof MediaStreamTrack === 'undefined'){
        alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
    } else {
        console.log(1);
        MediaStreamTrack.getSources(gotSources);
    }
}

function ScanHandler() {
    this.hashVerifier = new HashVerifier(favorArray());
    emitter.on('startScan', this.startScan, this);
}

ScanHandler.prototype.startScan = function() {
    streamVideoToCanvas();
    this.startScanningForQRCode();
}

ScanHandler.prototype.stopScan = function() {

}

ScanHandler.prototype.startScanningForQRCode = function() {
    setTimeout(function(){
        var interval = null;
        interval = setInterval(function() {
            try {
                var result = qrcode.decode();
                clearInterval(interval);
                emitter.trigger('codeScanned', result);
            } catch(e) {
                console.log(e);
            }
        }, 3000);
    }, 5000);
}

