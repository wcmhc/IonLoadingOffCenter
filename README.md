# IonLoadingOffCenter
This occurs only on our physical devices. Emulators work correctly
* Blu Pure XR, Android 6.0

**This assumes you have Cordova installed globally as well as a somewhat recent of Node**

1. Clone repo to local folder
2. CD into folder
3. Run `npm install`
4. Run `cordova platform add android` if needed
5. Run `cordova emulate` to emulate, or `cordova run --device` to run on a connected device

Expected result at time of writing:
* Spinner is contrained to the same dimmensions as its parent container

Actual
* Spinner is constrained correctly to the bottom right bounds, but extends out over the top left corner by a significant margin
