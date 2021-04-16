var HelpWidget = /** @class */ (function () {
    function HelpWidget() {
        var _this = this;
        this._debug = true;
        console.log("Constructor called");
        this._iframe = document.createElement('iframe');
        this._iframe.id = 'HelpIframe';
        this._closeHelpIframe = document.createElement('div');
        this._closeHelpIframe.id = 'CloseHelpIframe';
        this._helpButton = document.createElement('button');
        this._helpButton.id = 'ShowHelp';
        this._helpButton.innerHTML = 'HELP';
        this.showHelpButton();
        this._helpButton.addEventListener('click', function () { _this.showHelp(); }, false);
    }
    HelpWidget.prototype._getHelpUrl = function () {
        // TODO: Add some logic here to return the right iFrame source 
        var iframeUrl = 'TestPage.html';
        var currentLocation = window.location.href; // Use this to change the iFrame source
        var iframeSourceOverride = document.getElementById('IframeSourceOverride').value;
        if (iframeSourceOverride) {
            iframeUrl = iframeSourceOverride;
        }
        ;
        console.log("iframeUrl: " + iframeUrl);
        return iframeUrl;
    };
    HelpWidget.prototype.showHelp = function () {
        var _this = this;
        console.log("showHelp called");
        this.hideHelpButton();
        this._iframe.src = this._getHelpUrl();
        document.body.appendChild(this._iframe);
        this._closeHelpIframe.innerHTML = 'X';
        this._closeHelpIframe.addEventListener("click", function () { _this.hideHelp(); }, false);
        document.body.appendChild(this._closeHelpIframe);
    };
    HelpWidget.prototype.hideHelp = function () {
        console.log("hideHelp called");
        this._iframe.remove();
        this._closeHelpIframe.remove();
        this.showHelpButton();
    };
    HelpWidget.prototype.showHelpButton = function () {
        console.log("showHelpButton called");
        document.body.appendChild(this._helpButton);
    };
    HelpWidget.prototype.hideHelpButton = function () {
        console.log("hideHelpButton called");
        this._helpButton.remove();
    };
    return HelpWidget;
}());
document.addEventListener('DOMContentLoaded', function () {
    var helpWidget = new HelpWidget();
    helpWidget.showHelpButton();
});
