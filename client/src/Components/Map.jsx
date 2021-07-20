import React, {useEffect, useState} from 'react';
import {GoogleMap,useLoadScript, Marker,InfoWindow} from '@react-google-maps/api';
import mapStyles from './mapStyles'
import Error from '../Errors/Error'

export default function Map({cuisine}) {

    const [restaurants, setRestaurants] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const longitude= 153.021072;
    const latitude= -27.470125;


      const req = `/restaurants/?lat=${latitude.toString()}&lng=${longitude.toString()}&name=${cuisine}`;
      useEffect(() => {
          getRestaurants();
      }, []);
  
      const getRestaurants = () => {
          fetch(req)
        .then((res) => {
            if(res.status == 200){
                return res.json()
            }else{
                setError(true)
                setErrorMessage(res.message)
                return res.json();
            } 
        })
        .then((data) => {
            data.error === true ? setErrorMessage(data.message) :
            setRestaurants(data.data.restaurants)
        })
      }

    const mapContainerStyle = {
        margin: 'auto',
        width: '80vw',
        height: '50vh'
    };

    const options = {
        //styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    };

    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCLBUl0LVA2g2eBEHhhzTiptFqpHVmnKWA'
    });

    if(loadError) return "Error Loading Map";
    if(!isLoaded) return "Loading Maps";

    return (
        <div>
            {error === true ? <Error message= {errorMessage}/> :
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={{lat:latitude, lng:longitude}}
            options={options}
          >

                  {restaurants.map((restaurant) => (
                    <Marker 
                        key={restaurant.restaurant.id}
                        position={{lat: parseFloat(restaurant.restaurant.location.latitude), 
                            lng: parseFloat(restaurant.restaurant.location.longitude)}}
                            onClick={() => {
                                setSelected(restaurant)
                            }}
                    />
                ))}

{selected ? (<InfoWindow  position={{lat: parseFloat(selected.restaurant.location.latitude), 
                            lng: parseFloat(selected.restaurant.location.longitude)}}
                            onCloseClick={() => {setSelected(null)}}>
                    <div>
                        <h3>{selected.restaurant.name}</h3>
                        <p>{selected.restaurant.location.address}</p>
                        <p>Rating:{selected.restaurant.user_rating.aggregate_rating}</p>
                    </div>
                </InfoWindow>) : null}

          </GoogleMap>
}
        </div>
    )
}

