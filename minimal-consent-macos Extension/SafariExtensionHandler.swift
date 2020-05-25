//
//  SafariExtensionHandler.swift
//  minimal-consent-macos Extension
//
//  Created by Gerald Madlmayr on 18.05.20.
//  Copyright © 2020 Gerald Madlmayr. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    /*
     override init() {
     let path1 :String = Bundle.main.path(forResource: "icon", ofType: "png")!
     self.standardImage = NSImage(byReferencingFile :path1)!
     NSLog(self.standardImage.description)
     }
     */
    
    // var  showOkayImage: Bool = false;
    
    // creating a mutable Dictionary to send over to the backend.
    func unimmutable(dict:[String:Any])->[String:Any] {
        var mutableDict = dict
        for (key, value) in mutableDict {
            mutableDict[key] = value
        }
        return mutableDict
    }
    
    // This is the callback funcation when the JavaScripts is dispatching Information.
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // get the page properties and call the backend call. It's async that why we are calling a separat method.
        page.getPropertiesWithCompletionHandler { properties in self.postStatusToBackend(with: properties, userInfo: userInfo) }
    }
    
    func postStatusToBackend(with prop: SFSafariPageProperties?, userInfo: [String : Any]? ){
        // here we do a force unwrap of the parameter.
        // as if there is no parameter, converting should fail
        var newDict = self.unimmutable(dict:userInfo! as [String : Any])
        
        NSLog("Current URL: " + (prop?.url?.absoluteString)!)
        
        // Unwrapping the userInfo
        // Optional Chaining, in order not to fail, if one of the parameters is nil.
        // https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html
        newDict["url"] = prop?.url?.absoluteString
        newDict["version"] = "1.0.8"
        newDict["uuid"]  = "some-uuid-from-OSX"
        
        NSLog("User Info: (\(userInfo ?? [:]))")
        
        // create the url for calling the backend
        let url = URL(string: "https://europe-west1-minimal-consent-chrome-ext.cloudfunctions.net/successfulConsent")!
        
        // create the session object
        let session = URLSession.shared
        
        // now create the URLRequest object using the url object
        var request = URLRequest(url: url)
        
        //set http method as POST
        request.httpMethod = "POST"
        
        // create JSON from the Dict and set the Body
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: newDict, options: .prettyPrinted) // pass dictionary to nsdata object and set it as request body
        } catch let error {
            NSLog("Error:" + error.localizedDescription)
        }
        
        // Content Type of the data we pass along.
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        //create dataTask using the session object to send data to the server
        let task = session.dataTask(with: request as URLRequest)
        task.resume()
        
        NSLog("Done sending")
        /*
         self.showOkayImage = true;
         
         SFSafariApplication.setToolbarItemsNeedUpdate();
         
         SFSafariApplication.getActiveWindow { (window) in
         let path2 :String = Bundle.main.path(forResource: "icon-ok", ofType: "png")!
         let okayImage = NSImage(byReferencingFile :path2)!
         NSLog("Image:" + okayImage.description)
         
         NSLog("window:" + window!.description)
         var toolbaritemretrieved = false
         var toolbaritem : SFSafariToolbarItem?
         window!.getToolbarItem { (item) in
         // Typecast.
         toolbaritem = item as SFSafariToolbarItem?;
         toolbaritemretrieved = true;
         NSLog("IteM: " + item!.description)
         NSLog("window: " + window!.description)
         }
         
         while(!toolbaritemretrieved){
         //wait for toolbar item to be retrieved
         }
         toolbaritem!.setImage(okayImage);
         
         NSLog("Toolbar: " + toolbaritem!.description);
         
         SFSafariApplication.setToolbarItemsNeedUpdate();
         
         }
         */
        
    }
    
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
        /*
         //  https://stackoverflow.com/questions/52319160/how-can-i-change-a-toolbar-icon-in-a-safari-app-extension-at-runtime
         var toolbaritemretrieved = false
         var toolbaritem : SFSafariToolbarItem?
         window.getToolbarItem { (item) in
         toolbaritem = item as SFSafariToolbarItem?;
         toolbaritemretrieved = true;
         }
         
         while(!toolbaritemretrieved){
         //wait for toolbar item to be retrieved
         }
         // toolbaritem?.setImage(okayImage);
         SFSafariApplication.setToolbarItemsNeedUpdate();
         */
        
    }
    
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
        
        /*
         NSLog("validateToolbarItem " + self.showOkayImage.description)
         
         if(self.showOkayImage){
         let path2 :String = Bundle.main.path(forResource: "icon-ok", ofType: "png")!
         let okayImage = NSImage(byReferencingFile :path2)!
         NSLog("Image:" + okayImage.description)
         
         var toolbaritemretrieved = false
         var toolbaritem : SFSafariToolbarItem?
         window.getToolbarItem { (item) in
         toolbaritem = item as SFSafariToolbarItem?;
         toolbaritemretrieved = true;
         }
         
         while(!toolbaritemretrieved){
         //wait for toolbar item to be retrieved
         }
         
         toolbaritem?.setImage(okayImage);
         }
         */
        
        
    }
    
    /*
     override func popoverViewController() -> SFSafariExtensionViewController {
     return SafariExtensionViewController.shared
     }
     */
    
}
