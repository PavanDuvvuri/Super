import cucumberJson from 'wdio-cucumberjs-json-reporter';

export function addText(value) {
  cucumberJson.attach(value);
}

export function addObject(value) {
  cucumberJson.attach(value, 'application/json');
}

export function addScreenshot() {
  cucumberJson.attach(browser.takeScreenshot(), 'image/png');
}