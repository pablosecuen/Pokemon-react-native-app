import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  searchBar: {
    width: "100%",
    height: "7%",
    backgroundColor: "yellow",
    marginTop: 35,
  },
  cardContainer: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    backgroundColor: "white",
  },
  cards: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    height: 350,
    width: 250,
  },

  image: {
    width: "90%",
    height: "15%",
  },

  statusBar: {
    width: "100%",
    height: "100px",
    backgroundColor: "black",
  },
  containerRender: {
    width: "100%",
    height: "100%",
    border: 10,
    backgroundColor: "green",
  },

  name: {
    fontSize: "16px",
    color: "green",
    border: "1px solid",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    marginVertical: 20,
  },
  image1: {
    borderRadius: 20,
    resizeMode: "contain",
    height: 350,
    width: "90%",
    paddingVertical: 100,
    alignSelf: "center",
  },
  sectionTitle: {
    height: 28,
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    paddingTop: 20,
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
  },
  detailContainer: {},
  stats: {
    display: "flex-row",
    width: "45%",
    fontSize: "16px",
    fontFamily: "Helvetica",
    backgroundColor: "grey",
    color: "white",
    padding: 6,
    marginVertical: 2,
    borderRadius: 100,
    textAlign: "center",
    textAlignVertical: "middle",
  },
  statsContainer: {
    marginVertical: 20,
    paddingVertical: 20,

    gap: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  stats1: {
    fontSize: "24px",
    fontFamily: "Helvetica",
    backgroundColor: "grey",
    color: "white",
    padding: 6,
    marginVertical: 2,
    borderRadius: 100,
    textAlign: "center",
    textAlignVertical: "middle",
  },
});

export default styles;
