import React, { Component } from 'react';
import {
  ReactiveBase,
  ReactiveComponent,
  //ReactiveList,
  //ResultList,
  SingleList
} from "@appbaseio/reactivesearch";
import TabComponent from './TabComponent.js'
import { ReactiveGoogleMap } from '@appbaseio/reactivemaps';


class App extends Component {
	render() {
		return (
			<ReactiveBase
				app="apd_reports"
        url="https://vz5ub26znfu682o50c:rdrca5ixdrk6rqlw@espnap.vizion.ai:443"
        type="apd_reports"
				mapKey="AIzaSyB6kASRMis5abYOVOoo-j6Q-RT4RwBlKno"
			>
				<div
					style={{
            width: '100%',
            //height: '50%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<SingleList
						title="Crime Type"
						componentId="types"
						dataField="crime_type.keyword"
						size={50}
						showSearch={true}
					/>
					<ReactiveGoogleMap
            defaultZoom={12.8}
            defaultCenter={{ lat: 30.2591, lng: -97.801777 }}
            defaultOptions={{
              scrollwheel: false,
              zoomControl: true,
              mapTypeId: 'terrain',
              styles: [
                {
                  featureType: "water",
                  stylers: [
                    { saturation: 43 },
                    { lightness: -11 },
                    { hue: "#0088ff" }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "geometry.fill",
                  stylers: [
                    { hue: "#ff0000" },
                    { saturation: -100 },
                    { lightness: 99 }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#808080" }, { lightness: 54 }]
                },
                {
                  featureType: "landscape.man_made",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#ece2d9" }]
                },
                {
                  featureType: "poi.park",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#ccdca1" }]
                },
                {
                  featureType: "road",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#767676" }]
                },
                {
                  featureType: "road",
                  elementType: "labels.text.stroke",
                  stylers: [{ color: "#ffffff" }]
                },
                { featureType: "poi", stylers: [{ visibility: "on" }] },
                {
                  featureType: "landscape.natural",
                  elementType: "geometry.fill",
                  stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
                },
                { featureType: "poi.park", stylers: [{ visibility: "on" }] },
                {
                  featureType: "poi.sports_complex",
                  stylers: [{ visibility: "on" }]
                },
                { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
                {
                  featureType: "poi.business",
                  stylers: [{ visibility: "simplified" }]
                }
              ]
            }}
						componentId="map"
						dataField="location"
						react={{
							and: 'places',
						}}
						renderData={result => ({
							label: result.mag,
						})}
					/>
				</div>
        <ReactiveComponent
          componentId="APD_CRIME"
          showFilter
          defaultQuery={() => ({
            aggs: {
              'crime_type.keyword': {
                terms: {
                  field: 'crime_type.keyword',
                  order: {
                    _count: 'desc',
                  },
                  size: 5,
                },
              },
            },
          })}
          render={data => {
            return <TabComponent dataField="crime_type.keyword" {...data} />;
          }}
        />
      </ReactiveBase>
		);
	}
}

export default App;
