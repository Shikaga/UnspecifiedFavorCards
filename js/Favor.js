function Favor(hash, message, dateIssued, dateFulfilled, used) {
    this.hash = hash;
    this.message = message;
    this.used = used;
    this.verified = ko.observable(false);
    this.color = ko.observable('#eee');
    x = this;
    this.setVerified = function() {
        this.verified(true);
        this.color('AFE6AD');
    }.bind(this);
}