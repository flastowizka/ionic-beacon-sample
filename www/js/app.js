// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ExampleController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {
 
    $scope.beacons = {};
    
 
    $ionicPlatform.ready(function() {
 
        //$cordovaBeacon.requestWhenInUseAuthorization();
        $cordovaBeacon.requestAlwaysAuthorization();
        
        var openNotification = function(tit, msg) {
            cordova.plugins.notification.local.schedule({
                title: tit,
                message: msg
            });
            
            $cordovaVibration.vibrate(500);
        };
 
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            for(var i = 0; i < pluginResult.beacons.length; i++) {
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                // pegar o nome do identifier
                // JSON.stringify(pluginResult)
            }
            $scope.$apply();
        });
        
        $rootScope.$on("$cordovaBeacon:didDetermineStateForRegion", function(event, pluginResult) {
            console.log("$cordovaBeacon:didDetermineStateForRegion");
            var event = pluginResult;
        switch (pluginResult.state) {
        case "CLRegionStateInside":
            
              openNotification("Title Beacon", "Você está no alcance do Beacon");
            
            break;
        case "CLRegionStateOutside":
            
            openNotification("Title Beacon", "Você acabou de sair do alcance do Beacon");
            
            break;
        }
            
        });
 


var beaconRegions = [{
        identifier: "area1",
        uuid:  "74278BDA-B644-4520-8F0C-720EAF059935",
        minor: "65305",
        major: "11679",
     }];
     
     for (var i = 0; i < beaconRegions.length; i++) {
      var beacon = beaconRegions[i];
      var beaconRegion = $cordovaBeacon.createBeaconRegion(
          beacon.identifier,
          beacon.uuid,
          beacon.major,
          beacon.minor,
          true);

      
      $cordovaBeacon.startRangingBeaconsInRegion(beaconRegion);
        $cordovaBeacon.startMonitoringForRegion(beaconRegion);
    }

    });
});
