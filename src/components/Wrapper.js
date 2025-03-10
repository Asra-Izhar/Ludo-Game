import { View, Text, ImageBackground, SafeAreaView ,StyleSheet} from 'react-native'
import React from 'react'
import BG from '../assets/images/bg.jpeg';
import { deviceHeight, deviceWidth } from '../constants/Scaling';





const Wrapper = ({children,style}) => {
  return (
    <ImageBackground source={BG} resizeMode='cover' style={StyleSheet.container}>
      <SafeAreaView 
      style={[styles.safeAreaView,{...style}]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItmes:'center',
    },
    safeAreaView:{
        height:deviceHeight,
        width:deviceWidth,
        justifyContent:'center',
        alignItmes:'center',
    }
})

export default Wrapper