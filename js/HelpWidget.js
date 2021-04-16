var HelpWidget = /** @class */ (function () {
    function HelpWidget() {
        var _this = this;
        this.DefaultHelpUrl = 'https://faq.cvcheck.com';
        console.log("Constructor called");
        this._iframe = document.createElement('iframe');
        this._iframe.id = 'HelpIframe';
        this._iframe.addEventListener("load", function (e) { _this.onIframeLoaded(e, _this._closeHelpIframe); }, false);
        this._closeHelpIframe = document.createElement('div');
        this._closeHelpIframe.id = 'CloseHelpIframe';
        this._closeHelpIframe.innerHTML = 'X';
        this._closeHelpIframe.style.display = 'none';
        document.body.appendChild(this._closeHelpIframe);
        this._closeHelpIframe.addEventListener("click", function () { _this.hideHelp(); }, false);
        this._helpButton = document.createElement('button');
        this._helpButton.id = 'ShowHelp';
        this._helpButton.innerHTML = 'HELP';
        this.showHelpButton();
        this._helpButton.addEventListener('click', function () { _this.showHelp(); }, false);
    }
    HelpWidget.prototype._getHelpUrl = function () {
        var iframeUrl = this.DefaultHelpUrl;
        var currentUrlOverride = document.querySelector('input[name="sourceText"]:checked').value;
        ; // TODO: Remove this after testing
        var iframeSourceOverride = HelpWidget.HelpUrlOverrideDictionary[currentUrlOverride !== null && currentUrlOverride !== void 0 ? currentUrlOverride : window.location.href];
        if (iframeSourceOverride) {
            iframeUrl = iframeSourceOverride;
        }
        ;
        console.log("iframeUrl: " + iframeUrl);
        return iframeUrl;
    };
    HelpWidget.prototype.onIframeLoaded = function (e, closeButton) {
        //TODO: Detect if scrollbar present and change right position
        //      This doesn't work:
        // if (document.body.scrollHeight > document.body.clientHeight) {
        //     closeButton.style.right = '17px';
        // } else {
        //     closeButton.style.right = '0';
        // }
        closeButton.style.display = 'block';
    };
    HelpWidget.prototype.showHelp = function () {
        console.log("showHelp called");
        this.hideHelpButton();
        this._iframe.src = this._getHelpUrl();
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
    HelpWidget.HelpUrlOverrideDictionary = {
        "NPC": "https://faq.cvcheck.com/category/national-police-check-australia/",
        "About": "https://faq.cvcheck.com/category/about-cvcheck/",
        "Employers": "https://faq.cvcheck.com/category/employers/"
    };
    return HelpWidget;
}());
document.addEventListener('DOMContentLoaded', function () {
    var helpWidget = new HelpWidget();
    helpWidget.showHelpButton();
});
