maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.BRIGHT,
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 14, // starting zoom
});

// const baseMaps = {
//   STREETS: {
//     img: "https://cloud.maptiler.com/static/img/maps/streets.png",
//   },
//   WINTER: {
//     img: "https://cloud.maptiler.com/static/img/maps/winter.png",
//   },
//   HYBRID: {
//     img: "https://cloud.maptiler.com/static/img/maps/hybrid.png",
//   },
// };

// const initialStyle = maptilersdk.MapStyle[Object.keys(baseMaps)[0]];
// maptilersdk.config.apiKey = maptilerApiKey;
// const map = new maptilersdk.Map({
//   container: "map", // container id
//   style: initialStyle,
//   center: campground.geometry.coordinates, // starting position [lng, lat]
//   zoom: 10.82, // starting zoom
// });

// class layerSwitcherControl {
//   constructor(options) {
//     this._options = { ...options };
//     this._container = document.createElement("div");
//     this._container.classList.add("maplibregl-ctrl");
//     this._container.classList.add("maplibregl-ctrl-basemaps");
//     this._container.classList.add("closed");
//     switch (this._options.expandDirection || "right") {
//       case "top":
//         this._container.classList.add("reverse");
//       case "down":
//         this._container.classList.add("column");
//         break;
//       case "left":
//         this._container.classList.add("reverse");
//       case "right":
//         this._container.classList.add("row");
//     }
//     this._container.addEventListener("mouseenter", () => {
//       this._container.classList.remove("closed");
//     });
//     this._container.addEventListener("mouseleave", () => {
//       this._container.classList.add("closed");
//     });
//   }

//   onAdd(map) {
//     this._map = map;
//     const basemaps = this._options.basemaps;
//     Object.keys(basemaps).forEach((layerId) => {
//       const base = basemaps[layerId];
//       const basemapContainer = document.createElement("img");
//       basemapContainer.src = base.img;
//       basemapContainer.classList.add("basemap");
//       basemapContainer.dataset.id = layerId;
//       basemapContainer.addEventListener("click", () => {
//         const activeElement = this._container.querySelector(".active");
//         activeElement.classList.remove("active");
//         basemapContainer.classList.add("active");
//         map.setStyle(maptilersdk.MapStyle[layerId]);
//       });
//       basemapContainer.classList.add("hidden");
//       this._container.appendChild(basemapContainer);
//       if (this._options.initialBasemap.id === layerId) {
//         basemapContainer.classList.add("active");
//       }
//     });
//     return this._container;
//   }

//   onRemove() {
//     this._container.parentNode?.removeChild(this._container);
//     delete this._map;
//   }
// }

// map.addControl(new layerSwitcherControl({ basemaps: baseMaps, initialBasemap: initialStyle }), "bottom-left");

new maptilersdk.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(new maptilersdk.Popup({ offset: 25 }).setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`))
  .addTo(map);
