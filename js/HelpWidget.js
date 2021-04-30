var HelpWidget = /** @class */ (function () {
    function HelpWidget() {
        var _this = this;
        this._lookupFilePath = "https://faq.cvcheck.com/help/lookup.js";
        this._defaultHelpUrl = 'https://faq.cvcheck.com';
        this._helpUrlOverrideDictionary = {};
        console.log("Constructor called");
        this._iframe = document.createElement('iframe');
        this._iframe.id = 'HelpIframe';
        this._iframe.addEventListener("load", function (e) { _this.onIframeLoaded(e, _this._closeHelpIframe); }, false);
        this._closeHelpIframe = document.createElement('div');
        this._closeHelpIframe.id = 'CloseHelpIframe';
        this._buildCloseHelpButton();
        this._closeHelpIframe.style.display = 'none';
        this._closeHelpIframe.addEventListener("click", function () { _this.hideHelp(); }, false);
        document.body.appendChild(this._closeHelpIframe);
        this._helpButton = document.createElement('button');
        this._helpButton.id = 'ShowHelp';
        this._helpButton.innerHTML = 'HELP';
        this._helpButton.addEventListener('click', function () { _this.showHelp(); }, false);
        this._getJson(this._lookupFilePath, function (status, response) { return _this.onLookupFileLoaded(status, response); });
    }
    HelpWidget.prototype._buildCloseHelpButton = function () {
        this._closeHelpIframe.innerHTML = '<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path fill="#676767" d="M21.7 18.2c.2.2.3.4.3.6s-.1.4-.3.6l-2.3 2.3c-.2.2-.4.3-.6.3s-.4-.1-.6-.3L11 14.5l-7.2 7.2c-.2.2-.4.3-.7.3s-.4-.1-.6-.3L.2 19.4c-.1-.1-.2-.3-.2-.5s.1-.4.3-.6L7.5 11 .3 3.8c-.2-.2-.3-.4-.3-.7 0-.2.1-.4.3-.6L2.6.2c.1-.1.3-.2.5-.2s.4.1.6.3L11 7.5 18.2.3c.2-.2.4-.3.7-.3s.4.1.6.3l2.3 2.3c.1.1.2.3.2.5s-.1.4-.3.6L14.5 11l7.2 7.2z"></path></svg>';
    };
    HelpWidget.prototype.onLookupFileLoaded = function (status, response) {
        if (status === 200) { // NOTE: This will mean that the override won't be applied if the file isn't read for some reason
            this._helpUrlOverrideDictionary = response;
            if ("default" in this._helpUrlOverrideDictionary) {
                this._defaultHelpUrl = this._helpUrlOverrideDictionary["default"];
            }
            ;
        }
        this.showHelpButton();
    };
    HelpWidget.prototype._getJson = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            callback(xhr.status, xhr.response);
        };
        xhr.send();
    };
    HelpWidget.prototype._getHelpUrl = function () {
        var iframeUrl = this._defaultHelpUrl;
        var currentLocation = window.location.pathname.replace(/^\/+/g, ''); // todo: strip leading and trailing slashes
        console.log("_getHelpUrl called - currentLocation: " + currentLocation);
        console.log("_helpUrlOverrideDictionary: " + Object.keys(this._helpUrlOverrideDictionary).length);
        if (currentLocation in this._helpUrlOverrideDictionary) {
            iframeUrl = this._helpUrlOverrideDictionary[currentLocation];
        }
        ;
        if ('URLSearchParams' in window) { // Attempt to add current URL path to querystring
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("helpsource", currentLocation);
            iframeUrl = iframeUrl + "?" + searchParams.toString();
        }
        console.log("iframeUrl: " + iframeUrl);
        return iframeUrl;
    };
    HelpWidget.prototype.onIframeLoaded = function (e, closeButton) {
        closeButton.style.display = 'block';
    };
    HelpWidget.prototype.showHelp = function () {
        console.log("showHelp called");
        this.hideHelpButton();
        this._iframe.src = this._getHelpUrl();
        ;
        document.body.appendChild(this._iframe);
    };
    HelpWidget.prototype.hideHelp = function () {
        console.log("hideHelp called");
        this._iframe.remove();
        this._closeHelpIframe.style.display = 'none';
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
});
