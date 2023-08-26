import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import MapOffer from '../components/MapOffer';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackActions, withNavigation } from '@react-navigation/native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Map from '../components/Map';
import { useSelector } from 'react-redux';
export default GeoLocationScreen = ({ navigation }) => {
  const snapPoints = useMemo(() => ['5%', '85%'], []);
  const CustomHandler = useCallback((e) => {
  }, []);
  const [pin, setPin] = useState({
    latitude: 18.5546,
    longitude: 73.958,
  });

  const offerList = useSelector((state) => state.main.offerList);
  const [filterData, useFilterData] = useState([
    {
      name: "Food",
      active: true,
    },
    {
      name: "Shopping",
      active: false,
    },
    {
      name: "Hotel",
      active: false,
    },
    {
      name: "Travel",
      active: false,
    },
    {
      name: "Grocery",
      active: false,
    },
    {
      name: "Gaming",
      active: false,
    },
  ]);

  const [currOfferList, setCurrOfferList] = useState([]);

  useEffect(() => {
    getNewOffers();
  }, [filterData, offerList]);

  const getNewOffers = (random) => {
    const currName = filterData.find((item) => item.active === true).name;
    const shuffledOfferList = random ? shuffle(offerList) : offerList;
    const offers = shuffledOfferList.filter((item) => {
      return item.tag === currName.toLocaleLowerCase();
    });
    setCurrOfferList(offers);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const handleBack = () => {
    navigation.navigate("Home");
  }

  const BackgroundMap = useCallback(() => {
    return (
      <Map pin={pin} setPin={setPin} getNewOffers={getNewOffers}></Map>
    );
  }, []);


  return (
    <BottomSheet
      index={0}
      backdropComponent={BackgroundMap}
      snapPoints={snapPoints}
      handleComponent={CustomHandler}
    >
      <View style={styles.offerContainer}>
        <View style={styles.tab} />
        <MapOffer pin={pin}
          currOfferList={currOfferList}
          filterData={filterData}
          useFilterData={useFilterData}
          getNewOffers={getNewOffers}
        />
      </View>

    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.primary,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 40,
  },
  tab: {
    backgroundColor: Colors.gray,
    height: 5,
    width: 200,
    marginTop: 20,
    alignSelf: "center",

  },
  offerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 18,
  },

});