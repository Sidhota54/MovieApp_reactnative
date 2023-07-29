import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Platform, Image } from 'react-native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles, theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';


const ios = Platform.OS == 'ios';
const topMargin = ios ? "" : "mt-3";
var { width, height } = Dimensions.get('window')

const MovieScreen = () => {
    const [isFavourite, toggleFavourite] = useState();
    const [cast, setCast] = useState([1, 2, 3, 4]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState([]);

    const { params: item } = useRoute();
    const navigation = useNavigation();
    useEffect(() => {
        setLoading(true)
        getMoviesDetails(item.id);
        getMoviesCredits(item.id);
        getSimilarMovies(item.id);
    }, [item])

    const getMoviesDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        if (data) setMovie(data)
        setLoading(false)

    }
    const getMoviesCredits = async(id) =>{
        const data = await fetchMovieCredits(id)
        if (data && data.cast)  setCast(data.cast)
    }
    const getSimilarMovies = async(id) =>{
        const data = await fetchSimilarMovies(id)
         if (data && data.results)    setSimilarMovies(data.results)
    }
    
    return (
        <ScrollView contentContainerStyle={{ paddingButtom: 20 }} className="flex-1 bg-neutral-900">
            <View className='w-full relative'>
                <SafeAreaView className={` ${topMargin} absolute top-0  z-20 w-full flex-row justify-between items-center px-4`}>
                    <TouchableOpacity style={styles.background} onPress={() => navigation.goBack()} className='rounded-xl p-1'>
                        <ChevronLeftIcon size="30" stockWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size='35' color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {loading ? (<Loading />) : (
                    <View>
                        <View>
                            <Image
                                // source={require("../assets/images/moviePoster2.webp")}
                                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />

                            <LinearGradient style={{ width, height: height * 0.40 }} colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} className='absolute bottom-0' />
                        </View>

                        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                            <Text className='text-white text-center text-3xl font-bold tracking-wide'>{movie?.title}
                            </Text>
                        </View>
                        <Text className='text-neutral-400 font-semibold text-base text-center'>
                            {movie?.status}  *  {movie?.release_date?.split('-')[0]} *  {movie.runtime} min
                        </Text>

                        <View className='flex-row justify-center mx-4 space-x-4'>
                            {movie.genres?.map((genre, index) => {
                                let showDot = index+1 != movie.genres.length
                                return(
                                    <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>
                                    {genre.name} {showDot && ' * ' }
                                </Text>
                                );
                            })}

                        </View>
                        <Text className='text-neutral-400  text-center mx-4'>{movie?.overview}
                        </Text>


                        <Cast navigation={navigation} cast={cast} />

                        <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />
                    </View>

                )}
            </View>
        </ScrollView>


    )
}

export default MovieScreen
