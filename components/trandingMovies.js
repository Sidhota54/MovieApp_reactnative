import React from 'react'
import { View, Text, TouchableWithoutFeedback,Image } from "react-native"
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import { Dimensions } from 'react-native';
import { fallbackMoviePoster, image500 } from '../api/moviedb';


var { width, height } = Dimensions.get('window')

const TrandingMovies = ({data}) => {
    const navigation =useNavigation();

    const handleClick = (item) =>{
        navigation.navigate('Movie',item)
    }
    return (
        <View className="mb-8 pt-3">
            <Text  className='text-white text-2xl ml-4 font-semibold leading-relaxed text-left mb-8'> Tranding </Text>

            <Carousel data={data} renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                interactiveSliderOpacity={0.60}
                sliderWidth={width}
                
                itemWidth={width*0.62} slideStyle={{ display: 'flex', alignItems: 'center' }} />
        </View>
    )
}

const MovieCard = ({ item,handleClick }) => {

    return (

        <TouchableWithoutFeedback onPress={() =>handleClick(item)}>
            <View>
                <Image 
                source={{uri: image500(item?.poster_path) || fallbackMoviePoster}}
                // source={require('../assets/images/moviePoster2.webp')}
                    style={{
                        width: width * 0.6,
                        height: height *0.4
                    }} className="rounded-3xl" />
            {/* <Text className='text-white text-3xl'> Movies</Text> */}
            </View>

        </TouchableWithoutFeedback>

    )
}

export default TrandingMovies
