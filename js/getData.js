'use_strict';

import '../node_modules/satellite.js/dist/satellite.js';
import { addObject } from './addObjects.js';

const getData = (url, globoWorld, tipo) =>{
  d3.csv(url, function(err, data) {
   for(var i=0; i<500; i++){


     // Sample TLE
     var tleLine1 = data[i].TLE_LINE1,
         tleLine2 = data[i].TLE_LINE2,
         period = data[i].PERIOD,
         eccentricity = data[i].ECCENTRICITY,
         name = data[i].OBJECT_NAME,
         type = data[i].OBJECT_TYPE,
         altura = data[i].APOGEE;

     // Initialize a satellite record
     var satrec = satellite.twoline2satrec(tleLine1, tleLine2);

     //  Propagate satellite using time since epoch (in minutes).
     var positionAndVelocity = satellite.sgp4(satrec, period);

     //  Or you can use a JavaScript Date
     var positionAndVelocity = satellite.propagate(satrec, new Date());

     if(positionAndVelocity[0] === false){
       console.log('esta mal');
     }else if (type !== tipo) {
       console.log('es: '+type);
     }else{
       // The position_velocity result is a key-value pair of ECI coordinates.
       // These are the base results from which all other coordinates are derived.
       var positionEci = positionAndVelocity.position,
           velocityEci = positionAndVelocity.velocity;

       // Set the Observer at 122.03 West by 36.96 North, in RADIANS
       var observerGd = {
           longitude: satellite.degreesToRadians(-122.0308),
           latitude: satellite.degreesToRadians(36.9613422),
           height: 0.370
       };

       // You will need GMST for some of the coordinate transforms.
       // http://en.wikipedia.org/wiki/Sidereal_time#Definition
       var gmst = satellite.gstime(new Date());

       // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
       var positionEcf   = satellite.eciToEcf(positionEci, gmst),
           observerEcf   = satellite.geodeticToEcf(observerGd),
           positionGd    = satellite.eciToGeodetic(positionEci, gmst),
           lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf),
           dopplerFactor = satellite.dopplerFactor(observerEcf, positionEcf, eccentricity);

       // The coordinates are all stored in key-value pairs.
       // ECI and ECF are accessed by `x`, `y`, `z` properties.
       var satelliteX = positionEci.x,
           satelliteY = positionEci.y,
           satelliteZ = positionEci.z;

       // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
       var azimuth   = lookAngles.azimuth,
           elevation = lookAngles.elevation,
           rangeSat  = lookAngles.rangeSat;

       // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
       var longitude = positionGd.longitude,
           latitude  = positionGd.latitude,
           height    = positionGd.height;

       //  Convert the RADIANS to DEGREES.
       var longitudeDeg = satellite.degreesLong(longitude),
           latitudeDeg  = satellite.degreesLat(latitude);


       addObject(latitudeDeg, longitudeDeg, altura, type, globoWorld);
     }
   }
  });
}

export { getData };
