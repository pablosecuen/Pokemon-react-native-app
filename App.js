import {
  Image,
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import fetchPokemons from "./axios.js";
import card1 from "./assets/types/normal.png";
import spinner from "./assets/Spinner/pika.gif";
import styles from "./styles.js";

export default function App() {
  const [pokemons, setPokemons] = useState([]); //state for storing the pokemons retrieved from the api (only the firs 20 limited by query on purpose)
  const [isLoading, setIsLoading] = useState(true); //state for the spinner, with a set timeout of 2 seconds so you can appriciate it, also know how to use skeletons that are very modern and looks really fine
  const [showModal, setShowModal] = useState(false); //state for modal
  const [selectedPokemon, setSelectedPokemon] = useState(null); //state for selecting pokemons that will be rendered along with their props in modal
  const [searchTerm, setSearchTerm] = useState(""); // state for the search bar

  const toggleModal = () => {
    //toggler for modal
    setShowModal(!showModal);
  };

  const handleCardPress = (item) => {
    //handler for the card pressing
    setSelectedPokemon(item);
    toggleModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      // Wait for 2 seconds before fetching data, function async and previous error handling in it's own separate module
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await fetchPokemons();
      setPokemons(data);
      setIsLoading(false); // set loading state to false once data is fetched
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    //renderItem is the correct mapping method for react native
    if (
      searchTerm &&
      !item.name.toLowerCase().includes(searchTerm.toLowerCase()) //searchbar logic, simple basic, not scalable due to beeing a simple example app for the interview
    ) {
      return null;
    }

    return (
      <TouchableWithoutFeedback onPress={() => handleCardPress(item)}>
        <View style={styles.cards}>
          <ImageBackground
            source={{ uri: card1 }}
            resizeMode="cover"
            style={{ height: 320, width: 250 }}
          >
            <Text
              // styles in line just to show it can be donde this way if the proyect requires it for any reason
              style={{
                fontSize: 16,
                backgroundColor: "grey",
                height: 30,
                width: 100,
                alignSelf: "start",
                textAlign: "center",
                paddingTop: 2,
                marginTop: 15,
                marginLeft: 8,

                color: "white",
                borderRadius: 20,
              }}
            >
              {item.name}
            </Text>
            <Image
              source={item.sprites.other.dream_world.front_default}
              style={{
                minWidth: 160,
                minHeight: 160,
                maxWidth: 160,
                maxHeight: 180,
                alignSelf: "center",
                marginTop: 50,
              }}
            />
            <Text>{item.attack}</Text>
            <Text>{item.defense}</Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  if (isLoading) {
    //spinner with a nice walking pikachu, probably reading some Riley app news
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting there ;)</Text>
        <Image source={spinner} style={{ width: "50%", height: "30%" }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* making the entire card pressable to render a details modal */}
      <Image source={require("./assets/pokelogo.png")} style={styles.image} />
      <View style={styles.searchBar}>
        <TextInput
          style={{
            marginTop: 6,
            width: 350,
            height: "80%",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 50,
            textAlign: "center",
            alignSelf: "center",
            padding: 4,
            backgroundColor: "white",
          }}
          placeholder="Search for a Pokemon"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
      </View>
      <SectionList
        // aldo i'm rendering a flat list, i rather let the component ready to be scalated in case i occur to add sections like the types of pokemons (fire, grass, dragons, etx)
        style={styles.cardContainer}
        sections={[{ data: pokemons }]}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        renderSectionHeader={() => (
          <Text
            style={{
              fontSize: 20,
              fontFamily: "helvetica",
              paddingVertical: 30,
            }}
          >
            Gotta catch'em all
          </Text>
        )}
      />

      {/* modal is hidden by default and it only renders on press, and shows properties mapped for every single card, this is easy to implement for scalability so i did it
no mattarer how many objects in the array it will always display there properties correctly */}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Button
            onPress={() => setShowModal(false)}
            title="close"
            style={{
              // in some cases y coded inline styling just to show i can if necessary, or if the proyect demands it for any reason
              fontSize: 16,
              letterSpacing: 4,
              height: 40,
              backgroundColor: "paleturquoise",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Close details
          </Button>

          <View style={styles.detailContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.stats1}>{selectedPokemon?.name}</Text>
              {/* this is a common map method en plain react to show i'm know how to do it */}
              {selectedPokemon?.types.map((el, i) => (
                <Text style={styles.stats1} key={i}>
                  {el.type.name}
                </Text>
              ))}
            </View>
            <Image
              source={selectedPokemon?.sprites.other.dream_world.front_default}
              style={styles.image1}
            />
            <View style={styles.statsContainer}>
              {/* of course this could be better by doing props filtering a proper initial states so i could be able to map them, but i want to show i'm able to access
            the properties of any objects no regards of how it is structured */}
              <Text style={styles.stats}>
                Attack: {selectedPokemon?.stats[0].base_stat}
              </Text>
              <Text style={styles.stats}>
                Defense: {selectedPokemon?.stats[2].base_stat}
              </Text>
              <Text style={styles.stats}>
                Hp: {selectedPokemon?.stats[0].base_stat}
              </Text>
              <Text style={styles.stats}>
                Speed: {selectedPokemon?.stats[3].base_stat}
              </Text>
              <Text style={styles.stats}>
                Ability: {selectedPokemon?.abilities[0].ability.name}
              </Text>
              <Text style={styles.stats}>
                Ability: {selectedPokemon?.abilities[1].ability.name}
              </Text>
              <Text style={styles.stats}>
                Move: {selectedPokemon?.moves[0].move.name}
              </Text>
              <Text style={styles.stats}>
                Move: {selectedPokemon?.moves[1].move.name}
              </Text>
              <Text style={styles.stats}>
                Height: {selectedPokemon?.height}
              </Text>
              <Text style={styles.stats}>
                Weight: {selectedPokemon?.wheight}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// all styles have been taken to a different module to reduce code lines in the main file
