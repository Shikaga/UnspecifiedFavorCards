function UIHandler() {
    this.cameraVisible = ko.observable(false);
    this.favorsVisible = ko.observable(false);

    this.hashRead = ko.observable("");
    this.result = ko.observable("");
    this.onScanClicked = function() {
        this.cameraVisible(true);
        this.favorsVisible(false);
        emitter.trigger('startScan');
    }.bind(this);
    this.onShowFavorsClicked = function() {
        this.favorsVisible(true);
    }.bind(this);
    this.onHideFavorsClicked = function() {
        this.favorsVisible(false);
    }.bind(this);
    this.onCancelVideoClicked = function() {
        emitter.trigger('scanComplete');
    }
    this.bindToDom();

    emitter.on('scanComplete', function() {
        this.cameraVisible(false);
        this.favorsVisible(true);
    }, this)
}

UIHandler.prototype.bindToDom = function() {
    ko.applyBindings(this);
}