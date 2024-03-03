// import React, { useState, useEffect, useRef } from "react";
// import MapGL, { Layer, Source } from "react-map-gl";
// import { Editor, EditingMode, DrawLineStringMode } from "react-map-gl-draw";
// import Geocoder from "react-map-gl-geocoder";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import axios from "axios";
// import simplify from "simplify-geojson";

// const App = ({ token }) => {
//   const [mode, setMode] = useState(new DrawLineStringMode());
//   const [viewport, setViewport] = useState({
//     width: 800,
//     height: 600,
//     longitude: -122.45,
//     latitude: 37.78,
//     zoom: 14,
//   });
//   const [settings] = useState({
//     dragPan: true,
//     dragRotate: false,
//     scrollZoom: true,
//     touchZoom: false,
//     touchRotate: false,
//     keyboard: false,
//     doubleClickZoom: false,
//     minZoom: 10,
//     maxZoom: 14,
//     minPitch: 0,
//     maxPitch: 85,
//   });
//   const [features, setFeatures] = useState([]);
//   const [legs, setLegs] = useState(null);
//   const [selectedFeature, setSelectedFeature] = useState(null);

//   const geoRef = useRef();
//   const editorRef = useRef();
//   const mapRef = useRef();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Your API endpoint for fetching data
//         const response = await axios.get("your-api-endpoint");
//         // Process the response and update state accordingly
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData(); // Call the fetchData function
//   }, [/* Add dependencies if needed */]);

//   const onViewportChange = (newViewport) => {
//     setViewport(newViewport);
//   };

//   const onEditorUpdate = ({ data, editType }) => {
//     setFeatures(data);
//     setMode(editType === "addFeature" ? new EditingMode() : mode);
//   };

//   const onEditorSelect = ({ selectedFeature }) => {
//     setSelectedFeature(selectedFeature);
//   };

//   const calculateRisk = ({ precipitationIntensity }) => {
//     // Your risk calculation logic here
//     // Return the risk level and color based on precipitation intensity
//   };

//   return (
//     <div style={{ height: "100vh" }}>
//       <div
//         ref={geoRef}
//         style={{ position: "absolute", top: 20, left: 20, zIndex: 2 }}
//       />
//       <div
//         style={{
//           textAlign: "left",
//           position: "absolute",
//           zIndex: 1,
//           lineHeight: "1.5",
//           top: "80px",
//           left: "20px",
//           width: "228px",
//           background: "white",
//           padding: "6px",
//           boxShadow: "0 0 10px 2px rgb(0 0 0 / 10%)",
//           borderRadius: "4px",
//           fontSize: "10px",
//           fontFamily: "Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif",
//           color: "#000000bf",
//         }}
//       >
//         <strong>Instructions:</strong> click map to create waypoints, double
//         click to confirm - reselect route to edit is at any time
//       </div>
//       <MapGL
//         {...viewport}
//         {...settings}
//         width="100%"
//         height="100%"
//         mapStyle={"mapbox://styles/mapbox/light-v9"}
//         onViewportChange={onViewportChange}
//         mapboxApiAccessToken={token}
//         ref={mapRef}
//       >
//         <Editor
//           clickRadius={12}
//           onUpdate={onEditorUpdate}
//           features={features}
//           mode={mode}
//           ref={editorRef}
//           onSelect={onEditorSelect}
//         />
//         <Geocoder
//           mapRef={mapRef}
//           containerRef={geoRef}
//           onViewportChange={onViewportChange}
//           mapboxApiAccessToken={token}
//           position="top-left"
//         />
//         {legs && (
//           <Source type="geojson" data={legs}>
//             <Layer
//               {...{
//                 id: "data",
//                 type: "line",
//                 paint: {
//                   "line-color": {
//                     property: ["get", "color"],
//                   },
//                   "line-width": 3,
//                 },
//               }}
//             />
//           </Source>
          
//         )}
//       </MapGL>
//     </div>
//   );
// };

// App.defaultProps = {
//   apikey: "LZBP01TNIzXI9zKYKf79czTEXoOPJuuv",
//   token: "pk.eyJ1IjoiZmxvcmVuem9iYXVlciIsImEiOiJjbHQ1NzNzd2cwYmtsMmlvN2s4bG8xb3N2In0.m2y4PrhADdS928lNzEh3JA",
//   fields: ["precipitationIntensity"],
// };

// export default App;
