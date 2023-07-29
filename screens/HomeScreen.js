import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { Bars3BottomLeftIcon, MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrandingMovies from '../components/trandingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrandingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios';

const HomeScreen = () => {
    const [tranding, setTraning] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation()

    useEffect(() => {
        getTrandingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])
    const getTrandingMovies = async () => {
        const data = await fetchTrandingMovies();
        // console.log('got trending movies: ',data)
        if (data && data.results) setTraning(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) setTopRated(data.results);
    }

    return (
        <View className="flex-1 bg-neutral-900 pt-2">
            <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
                <StatusBar barStyle="light"> </StatusBar>
                <View className='flex-row justify-between items-center mx-4'>
                    <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className='text-white text-3xl font-bold'>
                        <Text style={styles.text} >M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassCircleIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading ? (<Loading />) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                    {/*Tranding Movies carousal */}
                    {tranding.length > 0 && <TrandingMovies data={tranding} />}
                    {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
                    {topRated.length > 0 && <MovieList title="Top Rated" data={upcoming} />}
                </ScrollView>
            )}
        </View>

    )
}

export default HomeScreen