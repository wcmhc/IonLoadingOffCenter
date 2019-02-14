# IonLoadingOffCenter
Affected device:
* Blu Pure XR, Android 6.0
  * https://i.imgur.com/BRU7VaY.gif

**This assumes you have Cordova installed globally as well as a somewhat recent version of Node**

1. Clone repo to local folder
2. CD into folder
3. Run `npm install`
4. Run `cordova platform add android` if needed
5. Run `cordova emulate` to emulate, or `cordova run --device` to run on a connected device

Expected result at time of writing:
* Spinner is constrained to the same dimmensions as its parent container

Actual
* Spinner is constrained correctly to the bottom right bounds, but extends out over the top left corner by a significant margin
