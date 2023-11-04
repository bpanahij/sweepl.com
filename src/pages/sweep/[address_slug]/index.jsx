import {createMap} from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Geo} from "aws-amplify"
import Whisper from "@/components/Whisper";

const searchOptionsWithBiasPosition = {
  countries: ["USA"],
  maxResults: 1,
  biasPosition: [
    -122.4194,
    37.7749
  ]
}


function drawLineOnMap(map, coordinates) {
  // Create a GeoJSON LineString feature from the coordinates
  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
  };

  // Add the GeoJSON feature to the map as a layer
  map.addSource('line-source', {
    type: 'geojson',
    data: geojson,
  });

  // Add a layer to display the line
  map.addLayer({
    id: 'line-layer',
    type: 'line',
    source: 'line-source',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': 'blue', // You can customize the line color
      'line-width': 2,       // You can customize the line width
    },
  });
}


export default function NewPage() {
  const router = useRouter()
  console.log(router.query)
  const {address_slug} = router.query
  const address = address_slug?.replace(/_/g, ' ')

  const mapRef = useRef(null);
  const [imageMap, setImageMap] = useState(null);

  useEffect(() => {
    let map;
    if (address == null) return
    (async function initializeMap() {
      const result = await Geo.searchByText(address, searchOptionsWithBiasPosition)
      console.log(result)
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          zoom: 17,
          maxZoom: 30,
          center: result[0]?.geometry?.point
        });
        setImageMap(map);
        map.on('load', () => {
          drawLineOnMap(map, [
            [-122.4194, 37.7749], // Example starting point
            [-122.4082, 37.7896], // Example intermediate point
            [-122.4056, 37.7968], // Example ending point
          ])
        })
        map.resize()
      }
    })()
    return function cleanup() {
      if (map != null) map.remove();
    };

  }, [address]);


  return (
    <div className="w-screen h-screen bg-white max-w-7xl mx-auto">
      <div className="bg-white h-[50px] z-50 w-full mx-auto rounded-t p-3 justify-center">
        <h1 className="text-3xl mx-auto text-center">
          {address}
        </h1>
      </div>
      <div className="bg-white h-[100px] w-full mx-auto rounded-b">
        <Whisper/>
      </div>
      <div className="bg-white h-1/2 w-full mx-auto rounded-b">
        <div className="py-0 h-full rounded-b">
          <div ref={mapRef}
               id="map"
               className="h-full rounded-b"/>
        </div>
      </div>
      <div className="bg-white h-1/2 w-full mx-auto">
        <div className="grid grid-cols-7 divide-gray-500 divide-x h-full">
          <div className="col-span-1 grid content-center justify-center">
            Mon
          </div>
          <div className="col-span-1 grid content-center justify-center">
            Tues
          </div>
          <div className="col-span-1 grid content-center justify-center">
            Wed
          </div>
          <div className="col-span-1 grid content-center justify-center bg-green-600">
            Thurs @ 2:00am
          </div>
          <div className="col-span-1 grid content-center justify-center">
            Friday
          </div>
          <div className="col-span-1 grid content-center justify-center">
            Sat
          </div>
          <div className="col-span-1 grid content-center justify-center">
            Sun
          </div>
        </div>
      </div>
    </div>
  )
}