import "./style.css"
import { Map, View } from "ol"
import { ScaleLine, Zoom, defaults } from "ol/control"
import { TopoJSON } from "ol/format"
import { Tile, Vector as VectorLayer } from "ol/layer"
import { fromLonLat } from 'ol/proj'
import { Vector as VectorSource, XYZ } from "ol/source"
import { Fill, Stroke, Style } from "ol/style"

const DATA_DIRECTORY = "data/"
const DATA_PREFIX = "layer_"
const YEARS = ["1993", "2000", "2010", "diff"]
const COLORMAP = [
  [255, 85, 50],  // 1993
  [205, 30, 45],  // 2000
  [115, 20, 50],  // 2010
  [223, 223, 223] // Sprawl
]
const OPACITY = 0.75

const CARTO_URL = "http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
const ETHNIC_URL = "https://api.mapbox.com/styles/v1/wootan67/ciu2gqznf006r2ho8duk33v6i/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid29vdGFuNjciLCJhIjoiY2lxeG1id2J4MDA0amh0bmo2b3ZrM284cyJ9.dZofdSG7bDjCRNKQQrYrPg"
const HOUSEHOLD_URL = "https://api.mapbox.com/styles/v1/wootan67/ciu2gbj18006h2hq5scs431g9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid29vdGFuNjciLCJhIjoiY2lxeG1id2J4MDA0amh0bmo2b3ZrM284cyJ9.dZofdSG7bDjCRNKQQrYrPg"
const MAP_COORDINATES = [-95.20027, 29.84328]
const ZOOM_LEVEL = 10
const SOURCE_EPSG = "EPSG:4326"
const TARGET_EPSG = "EPSG:3857"

// Create map and controls
var map = new Map({
  target: "map",
  layers: [
    new Tile({
      source: new XYZ({
        url: CARTO_URL,
      })
    }),
  ],
  view: new View({
    projection: TARGET_EPSG,
    center: fromLonLat(MAP_COORDINATES),
    zoom: ZOOM_LEVEL,
  }),
  controls: defaults().extend([
    new ScaleLine(),
    new Zoom(),
  ])
})

// Create styled vector layers based on TopoJSON files 
const data = {}

YEARS.forEach((year, index) => {
  const layerName = `${DATA_PREFIX}${year}`

  data[layerName] = new VectorLayer({
    source: new VectorSource({
      url: `${DATA_DIRECTORY}${DATA_PREFIX}${year}.json`,
      format: new TopoJSON({
        dataProjection: SOURCE_EPSG,
      })
    }),
    title: layerName,
    style: new Style({
      fill: new Fill({
        color: `rgba(${COLORMAP[index].join(",")},${OPACITY})`,
      }),
    }),
    zIndex: index + 1
  })
})

const harrisCounty = new VectorLayer({
  source: new VectorSource({
    url: `${DATA_DIRECTORY}harrisCounty.json`,
    format: new TopoJSON({
      dataProjection: SOURCE_EPSG,
    }),
  }),
  title: "Harris County",
  style: new Style({
    stroke: new Stroke({
      color: "rgba(255, 255, 255, 1)",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(255, 255, 255, 0)",
    }),
  }),
})

// Add layers hosted on Mapbox
data["layer_ethnic"] = new Tile({
  source: new XYZ({
    url: ETHNIC_URL,
  }),
  zIndex: 99,
})

data["layer_house"] = new Tile({
  source: new XYZ({
    url: HOUSEHOLD_URL,
  }),
  zIndex: 99,
})

// Add event listeners and classes to DOM elements
const $layers = document.querySelectorAll(".layer")

$layers.forEach(item => {
  item.addEventListener("pointerup", () => {
    const layer = data[item.dataset.layer] 
    
    item.classList.toggle("active")

    if (item.classList.contains("active")) {
      map.addLayer(layer)
    } else {
      map.removeLayer(layer)
    }
  })
})

// Setup base view
map.addLayer(harrisCounty)
map.addLayer(data[[...$layers].shift().dataset.layer])
$layers[0].classList.add("active")
