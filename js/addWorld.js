'use_strict';
import { getData } from './getData.js';

var globoWorld = new WorldWind.WorldWindow("canvasOne");

globoWorld.addLayer(new WorldWind.BMNGOneImageLayer());
globoWorld.addLayer(new WorldWind.BMNGLandsatLayer());


globoWorld.addLayer(new WorldWind.CompassLayer());
globoWorld.addLayer(new WorldWind.CoordinatesDisplayLayer(globoWorld));
globoWorld.addLayer(new WorldWind.ViewControlsLayer(globoWorld));

var debris = document.getElementById('debris');
var payload = document.getElementById('payload');
var rocket_body = document.getElementById('rocket_body');
var tba = document.getElementById('tba');

debris.addEventListener("click", ()=>{getData('data.csv', globoWorld, 'DEBRIS');});
payload.addEventListener("click", ()=>{getData('data.csv', globoWorld, 'PAYLOAD');});
rocket_body.addEventListener("click", ()=>{getData('data.csv', globoWorld, 'ROCKET_BODY');});
tba.addEventListener("click", ()=>{getData('data.csv', globoWorld, 'TBA');});
