//
//  SafariExtensionViewController.swift
//  minimal-consent-macos Extension
//
//  Created by Gerald Madlmayr on 18.05.20.
//  Copyright © 2020 Gerald Madlmayr. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
