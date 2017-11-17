import * as $ from "jquery";

//ya29.c.El_9BIn77ojtkSApHsDjeQqNI30cgObXwOmcpXJhjVETm_eL3BKqCBHz2AMPazIWON0mbiitP94Hv2p7wN-ef_IAyVUnX1OlxwYZSL-teqTcd7wK0ZMHAELJIF_BmjOPSA


//File Typescript da scrivere

import { Component } from '@angular/core';

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