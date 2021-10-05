'use_strict';

const addObject = (latitudeDeg, longitudeDeg, altura, type, globoWorld) =>{
  var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
  globoWorld.addLayer(placemarkLayer);

  var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

  placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.3,
      WorldWind.OFFSET_FRACTION, 0.0);

  placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
  placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
              WorldWind.OFFSET_FRACTION, 0.5,
              WorldWind.OFFSET_FRACTION, 1.0);


  var position = new WorldWind.Position(latitudeDeg, longitudeDeg, altura);
  var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

  var mark = '';
  if(type === 'DEBRIS'){
    mark = 'x';
  }else if (type === 'PAYLOAD') {
    mark = 'p';
  }else if (type === 'ROCKET_BODY') {
    mark = 'i';
  }else if (type === 'TBA') {
    mark = 't';
  }

  placemark.label = mark;
  placemark.alwaysOnTop = true;

  placemarkLayer.addRenderable(placemark);
}

export { addObject }
