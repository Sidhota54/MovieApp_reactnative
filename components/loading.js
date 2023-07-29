import {  Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

var { width, height } = Dimensions.get('window')


const Loading = () => {
  return (
    <View style={{height,width}} className='absolute bg-transparent  flex-row justify-center items-center'>
      <Progress.CircleSnail thickness={12}  size={160} color={theme.background} indeterminate={true} />
    </View>
  )
}

export default Loading

