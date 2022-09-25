
import commonpageobjects from '../../pageobjects/commonobjects';
export var appobjects;

export function loadApplicationObject(appName) {
    appobjects = require('../../pageobjects/' + appName + 'objects')
    combinedAppObjectWithCommon(commonpageobjects);
}

function combinedAppObjectWithCommon(obj, appObj) {
    let keyValues = Object.entries(obj);
    for (let i in keyValues) {
        var key = keyValues[i][0];
        var value = keyValues[i][1];
        if (appObj === undefined) {
            if (!(key in appobjects) ) {
                appobjects[key] = value;
            } else {
                if (value !== null){
                    var existingValue = appobjects[key];
                    if (existingValue === null)
                        appobjects[key] = value;

                    else if (typeof appobjects[key] == "string" && appobjects[key].trim()==='')
                        appobjects[key] = value;
                    
                    else if (typeof value == "object") {
                        var appKey = combinedAppObjectWithCommon(value, appobjects[key]);
                        if (appKey.length > 0) {
                            appobjects[key] = appKey
                        }
                    }
                }
            }
        } else {
            if (!(key in appObj)) 
                appObj[key] = value;
            
            else {
                if (value !== null){
                    var existingValue = appObj[key];
                    if (existingValue === null)
                        appObj[key] = value;
                    
                    else if (typeof appObj[key] == "string" && appObj[key].trim() === '') 
                        appObj[key] = value;
                    
                    else if (typeof value == "object") 
                        combinedAppObjectWithCommon(value, appObj[key]);
                    
                }
            }
        }
    }
    return appObj;
 }

