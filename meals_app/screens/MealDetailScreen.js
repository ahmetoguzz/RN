import { useLayoutEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import { MEALS } from '../data/dummy-data'
import { FavoritesContext } from '../store/context/favorites-context'
import { useContext } from "react";

import MealDetails from "../components/MealDetails";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import IconButton from "../components/IconButton";

function MealDetailScreen({ route, navigation }) {
    const favoriteMealsCtx = useContext(FavoritesContext);

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(mealId);
        } else {
            favoriteMealsCtx.addFavorite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={mealIsFavorite ? 'star' : 'star-outline'} color="white" onPress={changeFavoriteStatusHandler} />
            }
        })
    }, [navigation, changeFavoriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />

                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    subtitle: {
        color: '#e2b497',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 6,
        padding: 6,
        textAlign: 'center',
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
        marginHorizontal: 24
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%',

    }
})