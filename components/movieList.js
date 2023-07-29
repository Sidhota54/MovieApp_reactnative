import React from 'react'
import { Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';



var { width, height } = Dimensions.get('window')

const MovieList = ({ title, data, hideSeeAll }) => {

    let movieName = "Ant-man and the Wasp: Quantumania"
    const navigation = useNavigation()

    return (
        <View className='mb-8 space-y-4'>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl '>{title} </Text>

                {!hideSeeAll ? <TouchableOpacity>
                    <Text style={styles.text} className='text-lg'> See All</Text>
                </TouchableOpacity>
                    : null}

            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
                            <View>

                                <View className='space-y-1 mr-4'>
                                    <Image
                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                        //  source={require('../assets/images/moviePoster1.jpg')}
                                        style={{
                                            width: width * 0.33,
                                            height: height * 0.22
                                        }} className='rounded-3xl' />
                                </View>
                                <Text className='text-neutral-300  ml-3 mt-2'>{item.title?.length > 14 ? item.title.slice(0, 14) + "..." : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}

            </ScrollView>
        </View>
    )
}

export default MovieList
