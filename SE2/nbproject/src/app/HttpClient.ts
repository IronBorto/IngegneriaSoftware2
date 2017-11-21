
import { Component } from '@angular/core';

//ya29.c.El_9BIn77ojtkSApHsDjeQqNI30cgObXwOmcpXJhjVETm_eL3BKqCBHz2AMPazIWON0mbiitP94Hv2p7wN-ef_IAyVUnX1OlxwYZSL-teqTcd7wK0ZMHAELJIF_BmjOPSA


//File Typescript da scrivere
var vision = require('@google-cloud/vision');
export class HttpClient  {

    post(url: string){
        this.results(url);
    }

    results(url: String){
        var visionClient = vision({
            projectId: 'wheredidiseenthisbefore',
            key: 'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI'
            });
            
            //var gcsImageUri = 'gs://gapic-toolkit/President_Barack_Obama.jpg';
            var source = {
                gcsImageUri : url
            };
            var image = {
                source : source
            };
            var type = vision.v1.types.Feature.Type.FACE_DETECTION;
            var featuresElement = {
                type : type
            };
            var features = [featuresElement];
            var requestsElement = {
                image : image,
                features : features
            };
            var requests = [requestsElement];
            visionClient.batchAnnotateImages({requests: requests}).then(function(responses) {
                var response = responses[0];
                // doThingsWith(response)
            })
            .catch(function(err) {
                console.error(err);
            });
    }

  
}
/*
import {
    createAPIRequest
  } from '../../lib/apirequest';
  
  var Vision = function (options) { // eslint-disable-line
    const self = this;
    self._options = options || {};
  
    self.images = {     
       
        var google = require('googleapis');
        var vision = google.vision('v1');
       
        authorize(function(authClient) {
          var request = {
            resource: {
                
            },
       
            auth: authClient,
          };
       
          vision.images.annotate(request, function(err, response) {
            if (err) {
              console.error(err);
              return;
            }
                 
            console.log(JSON.stringify(response, null, 2));
          });
        });
       
        function authorize(callback) {
          google.auth.getApplicationDefault(function(err, authClient) {
            if (err) {
              console.error('authentication failed: ', err);
              return;
            }
            if (authClient.createScopedRequired && authClient.createScopedRequired()) {
              var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
              authClient = authClient.createScoped(scopes);
            }
            callback(authClient);
          });
        }
      annotate: function (params, options, callback) {
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        options || (options = {});
  
        const rootUrl = options.rootUrl || 'https://vision.googleapis.com/';
  
        const parameters = {
          options: Object.assign({
            url: (rootUrl + '/v1/images:annotate').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST'
          }, options),
          params: params,
          requiredParams: [],
          pathParams: [],
          context: self
        };
  
        return createAPIRequest(parameters, callback);
      }
  
    };
  };
*/

/*
export class HttpClient  {

    evaluate(result: string){
        
    }
    results(url: string){
        const vision = require('node-cloud-vision-api');
        vision.init({auth:'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI'});

        const req = new vision.Request({
            image: new vision.Image(url),
            features: [
              new vision.Feature('LABEL_DETECTION', 4),
              new vision.Feature('WEB_DETECTION', 4),
              new vision.Feature('LANDMARK_DETECTION', 10)
            ]
          })
        vision.annotate(req).then((res) => {
        // handling response
        let result = (JSON.stringify(res.responses));
        console.log(result);
        this.evaluate(result);
        }, (e) => {
        console.log('Error: ', e)
        })    
    }

    post(url: string){
        this.results(url);
    }


    DBpedia(url: string, dataToSave: any, callback: (data: string) => any) {
        this.executeAjax(url, dataToSave, "POST", callback);
    } 
    Animal(url: string, dataToSave: any, callback: (data: string) => any) {
        //this.executeAjax(url, dataToSave, "POST", callback);
    }   
    private executeAjax(url: string, dataToSave: any, httpVerb: string, callback: (data: string) => any) {
        $.ajax(url, {
            data: dataToSave,
            type: httpVerb,
            dataType: 'json',
            contentType: 'application/json',
            success: (data) => {
                if (callback !== undefined) {
                    callback(data);
                }
            }
        });
    }
}
*/