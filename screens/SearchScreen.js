import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useCallback } from 'react'
import { Dimensions } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { debounce } from 'lodash'
import { fallbackMoviePoster, fetchSearchMovies, image185 } from '../api/moviedb';


var { width, height } = Dimensions.get('window')
const SearchScreen = () => {
    const navigation = useNavigation();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (value) =>{
        if(value && value.length>2){
            setLoading(true)
            
            fetchSearchMovies({
                query: value,
                include_adult: false,
                language: 'en-US',
                page: '1'
            })
            .then(data=>{
                    setLoading(false);
                    if(data && data?.results) setResult(data.results)
            })
            
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[]);

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput onChangeText={handleTextDebounce} placeholder='Search Movie' placeholderTextColor={'lightgray'}
                    className=' pl-6 flex-1 font-semibold text-base text-white tracking-wide'
                />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}
                    className='rounded-full p-3 m-1 bg-neutral-500'>
                    <XMarkIcon size='25' color='white' />
                </TouchableOpacity>
            </View>

            {loading ? (<Loading />) : result?.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className='space-y-3'>
                    <Text className='text-white font-semibold ml-1'>Result ({result.length})</Text>
                    <View className='flex-row justify-between flex-wrap'>
                        {result?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                    onPress={() => navigation.push('Movie', item)}>
                                    <View className='space-y-2 mb-4'>
                                        <Image className='rounded-3xl ' 
                                        source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                            style={{ width: width * 0.44, height: height * 0.3 }} />
                                        <Text className='text-neutral-300 ml-1'> {item?.title?.length>21 ? item.title.slice(0,21)+"..."  : item.title} </Text>
                                    </View>

                                </TouchableOpacity>
                            );
                        })}

                    </View>
                </ScrollView>
            ) : (
                <View className='flex-row justify-center ' >
                    <Image source={require('../assets/images/movieTime.png')}
                        className='h-96 w-96' />
                </View>
            )}


        </SafeAreaView>

    )
}

export default SearchScreen

