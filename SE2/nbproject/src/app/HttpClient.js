"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var HttpClient = (function () {
    function HttpClient() {
    }
    HttpClient.prototype.evaluate = function (result) {
    };
    HttpClient.prototype.results = function (url) {
        var _this = this;
        var vision = require('node-cloud-vision-api');
        vision.init({ auth: 'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI' });
        var req = new vision.Request({
            image: new vision.Image(url),
            features: [
                new vision.Feature('LABEL_DETECTION', 4),
                new vision.Feature('WEB_DETECTION', 4),
                new vision.Feature('LANDMARK_DETECTION', 10)
            ]
        });
        vision.annotate(req).then(function (res) {
            // handling response
            var result = (JSON.stringify(res.responses));
            console.log(result);
            _this.evaluate(result);
        }, function (e) {
            console.log('Error: ', e);
        });
    };
    HttpClient.prototype.post = function (url) {
        this.results(url);
    };
    HttpClient.prototype.DBpedia = function (url, dataToSave, callback) {
        this.executeAjax(url, dataToSave, "POST", callback);
    };
    HttpClient.prototype.Animal = function (url, dataToSave, callback) {
        //this.executeAjax(url, dataToSave, "POST", callback);
    };
    HttpClient.prototype.executeAjax = function (url, dataToSave, httpVerb, callback) {
        $.ajax(url, {
            data: dataToSave,
            type: httpVerb,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (callback !== undefined) {
                    callback(data);
                }
            }
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map