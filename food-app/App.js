import React from "react";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  SafeAreaView,
          ScrollView,
          StyleSheet,
          Text,
          View,
          ImageBackground,
          Dimensions,
} from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(242, 242, 242)',
  },
};

export default function App() {
  const windowWidth = Dimensions.get('window').width;
  const Stack = createNativeStackNavigator();

  const restaurants = [
    {
      title: "Joe's Gelato",
      tagline: "Dessert, Ice cream, £££",
      eta: "10-30",
      imgUri: require('./images/ice-cream-header.jpg'),
      menus: [
        {
          title: "Gelato",
          contents: [
            { title: "Vanilla" },
            { title: "Chocolate" },
            { title: "Mint" },
          ],
        },
        {
          title: "Coffe",
          contents: [
            { title: "Flat White" },
            { title: "Latte" },
            { title: "Caffé Americano" },
          ],
        },
        // Add more menus for this restaurant
      ],
    },
    {
      title: "Joe's Dinner",
      tagline: "American, burgers, £££",
      eta: "50+",
      imgUri: require('./images/bar-chair-header.jpg'),
      menus: [
        {
          title: "Burgers",
          contents: [
            { title: "Classic Burger" },
            { title: "Cheeseburger" },
            { title: "Bacon Burger" },
          ],
        },
        // Add more menus for this restaurant
      ],
    },
    {
      title: "Sushi Delight",
      tagline: "Japanese, Sushi, ££",
      eta: "20-40",
      imgUri: require('./images/sushi-header.jpg'),
      menus: [
        {
          title: "Sushi Rolls",
          contents: [
            { title: "California Roll" },
            { title: "Spicy Tuna Roll" },
            { title: "Salmon Avocado Roll" },
          ],
        },
        {
          title: "Nigiri Sushi",
          contents: [
            { title: "Tuna Nigiri" },
            { title: "Salmon Nigiri" },
            { title: "Eel Nigiri" },
          ],
        },
        // Add more menus for this restaurant
      ],
    },
    {
      title: "Pizza Heaven",
      tagline: "Italian, Pizza, £££",
      eta: "30-50",
      imgUri: require('./images/pizza-header.jpg'),
      menus: [
        {
          title: "Pizza",
          contents: [
            { title: "Margherita Pizza" },
            { title: "Pepperoni Pizza" },
            { title: "Vegetarian Pizza" },
          ],
        },
        {
          title: "Pasta",
          contents: [
            { title: "Spaghetti Carbonara" },
            { title: "Lasagna" },
            { title: "Penne Alfredo" },
          ],
        },
        // Add more menus for this restaurant
      ],
    },
    // Add more restaurant objects here
  ];
  
  const MenuScreen = ({ route }) => {
  // Extract the selected restaurant from the route params
  const { selectedRestaurant } = route.params || {};

  // Find the selected restaurant in the restaurants array
  const restaurant = restaurants.find((r) => r.title === selectedRestaurant);

  return (
    <ScrollView style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
      <TableView
        style={{ height: '100%', width: '100%', backgroundColor: 'rgb(242, 242, 242)' }}
      >
        {restaurant && restaurant.menus.map((menu, i) => (
          <Section
            key={i}
            header={menu.title}
            separatorTintColor="black"
            hideSeparator={true}
          >
            {menu.contents.map((item, j) => (
              <MenuCell
                key={j}
                customLabel={item.title}
              />
            ))}
          </Section>
        ))}
      </TableView>
    </ScrollView>
  );
};

const MenuCell = (props) => (
  <Cell
    {...props}
    backgroundColor="white"
    cellContentView={
      <View style={{ flexDirection: 'column' }}>
        <Text>{props.customLabel}</Text>
      </View>
    }
  />
);

  const HomeScreen = ({ navigation }) => {
    return (
      <ScrollView style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
        <TableView
          style={{ height: '100%', width: '100%', backgroundColor: 'rgb(242, 242, 242)' }}
        >
          <Section
            name=""
            separatorTintColor="#ccc"
            hideSeparator={true}
          >
            {restaurants.map((restaurant, i) => (
              <HomeScreenCell
                key={i} // Make sure to provide a unique key
                title={restaurant.title}
                tagline={restaurant.tagline}
                eta={restaurant.eta}
                imgUri={restaurant.imgUri}
                navigation={navigation}
                action={() => {
                  navigation.navigate('Menu', { selectedRestaurant: restaurant.title });
                }}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    );
  };

  // Define the custom HomeScreenCell component
  const HomeScreenCell = (props) => {
    const { title, tagline, eta, imgUri, action } = props;

    return (
      <Cell {...props}
      onPress={props.action}
      backgroundColor="rgb(242, 242, 242)"
      style={styles.cell}
      cellContentView={
        <View style={styles.containerHomeScreen}>
          <ImageBackground
            source={imgUri}
            style={[styles.image,{width: 0.9 * windowWidth,}]}
            resizeMode="cover"
          />
          <View style={styles.etaContainer}>
              <Text style={[styles.eta,
                            {width:0.2*windowWidth,
                            left:0.66*windowWidth, bottom: -30}
                          ]}>{eta}{"\n"}mins</Text>
          </View>
          <View style={styles.infoContainer}>
            {<Text style={styles.title}>{title}</Text>}
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
        </View>
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer theme={MyTheme}>
    <Stack.Navigator initialRouteName="Restaurants">
      <Stack.Screen name="Restaurants" component={HomeScreen}/>
      <Stack.Screen name="Menu" component={MenuScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    height: 290,
    backgroundColor: "transparent",
    highlightColor: "#ccc",
  },
  containerHomeScreen: {
    flexDirection: "column", // Set flexDirection to column
    backgroundColor: 'rgb(242, 242, 242)',
  },
  image: {
    flex: 1, 
    height: 250,
    borderRadius: 6,
    overflow: "hidden",
    
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
  },
  tagline: {
    fontSize: 14,
    color: "#888",
    paddingBottom: 10,
  },
  etaContainer: {
    height: 'auto',
    width: '100',
    justifyContent:'center',
    alignItems: 'flex-end',
  },
  eta: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    position: "absolute",
  },
});
