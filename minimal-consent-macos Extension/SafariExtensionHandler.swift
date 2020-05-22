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
        
        // get the page properties and
        page.getPropertiesWithCompletionHandler { properties in self.postStatusToBackend(with: properties, userInfo: userInfo) }
    }
        
    func postStatusToBackend(with prop: SFSafariPageProperties?, userInfo: [String : Any]? ){
        
        var newDict = self.unimmutable(dict:userInfo!)
        
        //  let he = new HistoryEntry(now, link.host, request.cmp, request.cmpScripUrl, pr, request.implemented);
        
        NSLog("Current URL: " + (prop?.url?.absoluteString)!)
        
        // Unwrapping the userInfo
        newDict["url"] = prop?.url?.absoluteString
        newDict["version"] = "1.0.7"
        newDict["uuid"]  = "some-uuid-from-OSX"
        
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
            NSLog("Error:" + error.localizedDescription)
        }
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        //create dataTask using the session object to send data to the server
        let task = session.dataTask(with: request as URLRequest/*, completionHandler: { data, response, error in
            
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
                NSLog("Data:" + error.localizedDescription)
            }
        }*/)
        task.resume()
        
        NSLog("Done sending")
    }
    
    /*
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
    }
    */
 
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    /*
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }
     */
    
}
