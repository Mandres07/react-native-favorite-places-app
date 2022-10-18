import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../util/database';

const AllPlaces = ({ navigation }) => {
   const [places, setPlaces] = useState([]);
   const isFocused = useIsFocused();

   useEffect(() => {
      async function loadPlaces() {
         const placesList = await fetchPlaces();
         setPlaces(placesList);
      }
      if (isFocused) {
         loadPlaces();
      }
   }, [isFocused]);

   return <PlacesList places={places} />;
};

export default AllPlaces;