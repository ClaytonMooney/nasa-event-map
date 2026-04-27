const fs = require('fs');
const data = JSON.parse(fs.readFileSync('map_data.json', 'utf8'));

const geojson = {
  type: "FeatureCollection",
  features: data.map(item => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [item.position[1], item.position[0]] // GeoJSON uses [lon, lat]
    },
    properties: {
      id: item.id,
      title: item.title,
      category: item.category
    }
  }))
};

fs.writeFileSync('events.geojson', JSON.stringify(geojson, null, 2));
