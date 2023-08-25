import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import gucci from "../assets/images/company/g.jpg";
import chanel from "../assets/images/company/c.webp";
import zara from "../assets/images/company/z.webp";
import m1 from "../assets/images/company/m1.jpg";
import m2 from "../assets/images/company/m2.png";
import m3 from "../assets/images/company/m3.png";
import m4 from "../assets/images/company/m4.png";
import m5 from "../assets/images/company/m5.png";
import n1 from "../assets/images/company/n1.webp";
import n2 from "../assets/images/company/n2.png";
import n3 from "../assets/images/company/n3.png";
import n4 from "../assets/images/company/n4.png";

const MapOffer = ({ pin }) => {
  const offerList = useSelector((state) => state.main.offerList);
  const [filterData, useFilterData] = useState([
    {
      name: "Nearby offers",
      active: true,
    },
    {
      name: "Fashion",
      active: false,
    },
    {
      name: "Travel",
      active: false,
    },
    {
      name: "Food",
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

  const [currOfferList, setCurrOfferList] = useState([
    {
      company: "Coca cola",
      offer: 14,
      delivery: false,
      image: m1,
    },
    {
      company: "McDonalds",
      offer: 20,
      delivery: true,
      image: m2,
    },
    {
      company: "Swiggy",
      offer: 30,
      delivery: true,
      image: m3,
    },
    {
      company: "Grofers",
      offer: 50,
      delivery: true,
      image: m4,
    },
    {
      company: "Jio Mart",
      offer: 6,
      delivery: true,
      image: m5,
    },
  ]);

  useEffect(() => {
    // const currName = filterData.find((item) => item.active === true).name;
    // const shuffledOfferList = shuffle(offerList);
    // const offers = shuffledOfferList.filter((item) => {
    //   return item.tag === currName.toLocaleLowerCase();
    // });
    // setCurrOfferList(offers);

    setTimeout(() => {
      setCurrOfferList([
        {
          company: "Infinity mall",
          offer: 34,
          delivery: true,
          image: n4,
        },
        {
          company: "Gucci",
          offer: 50,
          delivery: true,
          image: gucci,
          time: "5am - 9pm",
        },
        {
          company: "Chanel",
          offer: 20,
          delivery: true,
          image: chanel,
          time: "6am - 8pm",
        },
        {
          company: "Zara",
          offer: 30,
          delivery: true,
          image: zara,
          time: "9am - 10pm",
        },
        {
          company: "Adidas",
          offer: 30,
          delivery: true,
          image: n1,
        },
        {
          company: "Nike",
          offer: 23,
          delivery: true,
          image: n2,
        },
        {
          company: "Raymond",
          offer: 16,
          delivery: false,
          image: n3,
        },
      ]);
    }, 5000);

    return () => {
      setCurrOfferList([
        {
          company: "Coca cola",
          offer: 14,
          delivery: false,
          image: m1,
        },
        {
          company: "McDonalds",
          offer: 20,
          delivery: true,
          image: m2,
        },
        {
          company: "Swiggy",
          offer: 30,
          delivery: true,
          image: m3,
        },
        {
          company: "Grofers",
          offer: 50,
          delivery: true,
          image: m4,
        },
        {
          company: "Jio Mart",
          offer: 6,
          delivery: true,
          image: m5,
        },
      ]);
    };
  }, [filterData, offerList]);

  const handleItemChange = (item) => {
    const newData = filterData.map((dataItem) => {
      if (dataItem.name === item.name) {
        dataItem.active = true;
      } else {
        dataItem.active = false;
      }
      return dataItem;
    });
    useFilterData(newData);
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

  return (
    <View style={styles.NearbyOffers}>
      <View style={styles.header}>
        <Text style={styles.headText}>Nearby offers</Text>
      </View>

      <View style={styles.filterList}>
        <View style={styles.filterIcon}>
          <AntDesign name="filter" size={24} color="black" />
        </View>
        <FlatList
          horizontal
          data={filterData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={item.active ? styles.chipActive : styles.chip}
              onPress={() => handleItemChange(item)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: item.active ? "white" : "black",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        />
      </View>
      <ScrollView vertical={true} style={styles.scrollView}>
        <View style={styles.offers}>
          {currOfferList.map((item, index) => {
            return (
              <View style={styles.offer}>
                {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                <Image source={item.image} style={styles.image} />
                <View style={styles.offerDetails}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.ammount}>{item.offer}% off</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5
                        name="clock"
                        size={14}
                        color={Colors.gray2}
                      />
                      <Text style={styles.lightText}>9am - 10pm</Text>
                    </View>
                    <View style={styles.dot}></View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5
                        name="truck"
                        size={14}
                        color={Colors.gray2}
                      />
                      <Text style={styles.lightText}>
                        {item.delivery ? "Delivery" : "Pickup"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MapOffer;

const styles = StyleSheet.create({
  NearbyOffers: {},
  header: {
    marginVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    maxHeight: "78%",
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.gray2,
    display: "flex",
    alignSelf: "center",
    paddingTop: 0,
    paddingHorizontal: 15,
    paddingVertical: 3,
    paddingTop: 3,
    justifyContent: "center",
    resizeMode: "cover",
    borderRadius: 20,
    marginRight: 10,
  },
  ammount: {
    color: Colors.green,
    fontWeight: "bold",
  },
  chipActive: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    display: "flex",
    alignSelf: "center",
    paddingTop: 0,
    paddingHorizontal: 15,
    paddingVertical: 3,
    paddingTop: 3,
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  offers: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  offer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  offerDetails: {
    display: "flex",
    flex: 1,
    paddingRight: 6,
  },
  company: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lightText: {
    color: Colors.gray2,
    marginLeft: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.gray2,
    marginHorizontal: 8,
  },
});
