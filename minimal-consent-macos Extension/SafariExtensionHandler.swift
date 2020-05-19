//
//  SafariExtensionHandler.swift
//  minimal-consent-macos Extension
//
//  Created by Gerald Madlmayr on 18.05.20.
//  Copyright © 2020 Gerald Madlmayr. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    
    func unimmutable(dict:[String:Any])->[String:Any] {
        var mutatedDict = dict
        for (key, value) in mutatedDict {
            mutatedDict[key] = value
        }
        return mutatedDict
    }
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("message").
        page.getPropertiesWithCompletionHandler { properties in
            NSLog("The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
            
        }
        
        
        /*
         The extension received a message (someMessage) from a script injected into (Optional(https://www.zusammengegencorona.de/)) with userInfo (["from": backendCall, "implemented": 1, "cmp": CookieBot, "cmpScripUrl": https://consent.cookiebot.com/uc.js?cbid=79294954-59b2-4580-b868-a79cc7b61270, "pingResult": {
         cmpId = 134;
         }])
         */
        
        var newDict = self.unimmutable(dict:userInfo!)
        
        //  let he = new HistoryEntry(now, link.host, request.cmp, request.cmpScripUrl, pr, request.implemented);
        
        // Unwrapping the userInfo
        newDict["url"] = "www.orf.at"
        newDict["date"] = "2020-05-19 12:00:00"
        newDict["version"] = "0.0.0"
        newDict["uuid"]  = "some uuid from OSX"
        
        
        NSLog("User Info: (\(userInfo ?? [:]))")
        
        //create the url with URL
        // private static readonly URL_CONSENT = "https://europe-west1-minimal-consent-chrome-ext.cloudfunctions.net/successfulConsent";
        let url = URL(string: "https://europe-west1-minimal-consent-chrome-ext.cloudfunctions.net/successfulConsent")! //change the url
        
        //create the session object
        let session = URLSession.shared
        
        //now create the URLRequest object using the url object
        var request = URLRequest(url: url)
        request.httpMethod = "POST" //set http method as POST
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: newDict , options: .prettyPrinted) // pass dictionary to nsdata object and set it as request body
        } catch let error {
            NSLog(error.localizedDescription)
        }
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        //create dataTask using the session object to send data to the server
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            
            guard error == nil else {
                return
            }
            
            guard let data = data else {
                return
            }
            
            do {
                //create json object from data
                if let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any] {
                    NSLog(try JSONSerialization.data(withJSONObject: json).description)
                    // handle json...
                }
            } catch let error {
                NSLog(error.localizedDescription)
            }
        })
        task.resume()
        
        NSLog("Done sending")
        
        
    }
    
    /**
     private async handleBackendCall(request: any, sender: any, sendResponse: any) {
     Utils.log("Handle: " + BackendCall.pageName);
     let link = await this.getUrl();
     
     // check, if we have already something in the local storage.
     let lastFound = await this._history.getLastFound(link.host);
     
     // if there is already something, don't process further.
     if (lastFound !== null) {
     Utils.log("The Page is already in the History. Don't consider further");
     }
     // only HTTP Pages will be supported
     else if (link.isHttp) {
     if (request.cmp && request.cmpScripUrl && typeof request.pingResult !== 'undefined' && typeof request.implemented !== 'undefined') {
     let pr = PingResult.class(request.pingResult);
     
     Utils.log("Ping Result: " + JSON.stringify(pr));
     // for Security Reasons, we pass each Element separably over to the insert Method.
     let now = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
     let he = new HistoryEntry(now, link.host, request.cmp, request.cmpScripUrl, pr, request.implemented);
     let uuid = await this._deviceId.loadOrGenerate();
     this.logBackend(he, uuid.deviceId, chrome.runtime.getManifest().version);
     this.switchIcon(he.implemented);
     this.storeRequest(he);
     }
     } else {
     Utils.log("handleBackendCall: Current Page is not HTTP/HTTPS");
     }
     }
     
     ------
     
     public send(requestJson: { [id: string]: any }, uuid: string, version: string): void {
     // adding Version to Request. As the parameters was an object, it looks like we can not modify it .. wired.
     let temp = JSON.parse(JSON.stringify(requestJson));
     temp.version = version;
     temp.uuid = uuid;
     this.xhr.open(Request.HTTP_METHOD, Request.URL_CONSENT, true);
     //Send the proper header information along with the request
     this.xhr.setRequestHeader("Content-Type", "application/json");
     // Sanity Check, so we only send correct data to the backend.
     this.xhr.send(JSON.stringify(temp));
     Utils.log("Backend call done:" + JSON.stringify(temp));
     }
     
        */
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }
    
}
