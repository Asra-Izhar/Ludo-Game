import { View, Text, StyleSheet, TouchableOpacity,Image, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from '../components/Wrapper';
import MenuIcon from '../assets/images/menu.png'
import { playSound } from '../helpers/SoundUtility';
import MenuModal from '../components/MenuModal';

import { useIsFocused } from '@react-navigation/native';
import StartGame from '../assets/images/start.png'
import { useSelector } from 'react-redux';
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../redux/reducers/gameSelectore';
import WinModal from '../components/WinModal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Dice from '../components/Dice';

const LudoBoardScreen = () => {
  const player1 =useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch =useSelector(selectDiceTouch);
  const winner =useSelector(state => state.game.winner);
  const isFocused =useIsFocused();
  const opacity = useRef(new Animated.Value(1)).current;
  const [menuVisible,setMenuVisible] =useState(false);
  const [showStartImage,setShowStartImage] = useState(false);
  const handleMenuPress =useCallback(()=>{
    playSound('ui');
    setMenuVisible(true);
  },[]);



  useEffect(()=>{

    if(isFocused){
      setShowStartImage(true);
      const blinkAnimation  =Animated.loop(
        Animated.sequence([
          Animated.timing(opacity,{
            toValue:0,
            duration:500,
            useNativeDriver:true,
          }),
          Animated.timing(opacity,{
            toValue:1,
            duration:500,
            useNativeDriver:true,
          }),
        ]),
      );
      blinkAnimation.start();

      const timeout =setTimeout(()=>{
        blinkAnimation.stop();
        setShowStartImage(false);
      },2500);
      //clean up animation on component unmount or when focus is lost

      return()=>{
        blinkAnimation.stop();
        clearTimeout(timeout);
      }
    }

  },[isFocused])



  return (
   <Wrapper >
     <TouchableOpacity onPress={handleMenuPress} style={styles.menuIcon}>
      <Image  source={MenuIcon} style={styles.menuIconImage}/>
     </TouchableOpacity>

    <View style={styles.container}>
      <View
      style={styles.flexRow}
      pointerEvents={isDiceTouch ? 'none' : 'auto'}>  
        <Dice color={Colors.green} player={2} data={player2} />
        <Dice color={Colors.yellow} player={3} data={player3} />
      
           </View>
        <View style={styles.ludoBoard}></View>
      <View>
      <Dice color={Colors.red} player={1} data={player1} />
      <Dice color={Colors.blue} player={4} data={player4} />
      </View>
    
    </View>

     {
      showStartImage && (
        <Animated.Image
        source={StartGame}
        style={{
          width:deviceWidth *0.5,
        height:deviceHeight* 0.2,
        position:'absolute',
        opacity,
        alignSelf:'center',
        }} />
      )
     }

    {winner !=null && <WinModal winner={winner}/>}

      {menuVisible && (
        <MenuModal
        onPressHide ={()=>setMenuVisible(false)}
        visible={menuVisible}/>
      )}
   </Wrapper>
  )
}

const styles =StyleSheet.create({
  container:{
    alignSelf:'center',
    height:deviceHeight * 0.5,
    width:deviceWidth,
    justifyContent:'center',
  },
  ludoBoard:{
    width:'100%',
    height:'100%',
    alignSelf:'center',
    padding:10,
  },
  menuIcon:{
    position:'absolute',
    top:20,
    left:20,
    
  },
  menuIconImage:{
    width:30,
    height:30,
    
  },
  flexRow:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:30,
  }
})
export default LudoBoardScreen