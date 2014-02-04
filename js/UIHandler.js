function UIHandler() {
    this.cameraVisible = ko.observable(false);
    this.favorsVisible = ko.observable(true);

    this.hashRead = ko.observable("");
    this.result = ko.observable("");
    this.onScanClicked = function() {
        this.cameraVisible(true);
        this.favorsVisible(false);
        emitter.trigger('startScan');
    }.bind(this);
    this.bindToDom();

    emitter.on('scanComplete', function() {
        this.cameraVisible(false);
        this.favorsVisible(true);
    }, this)
}

UIHandler.prototype.bindToDom = function() {
//    ko.applyBindingsToNode(document.getElementById('hashRead'), null, this);
//    ko.applyBindingsToNode(document.getElementById('result'), null, this);
    ko.applyBindingsToNode(document.getElementById('cameraView'), null, this);
    ko.applyBindingsToNode(document.getElementById('favorView'), null, this);
    ko.applyBindingsToNode(document.getElementById('scan'), null, this);
}