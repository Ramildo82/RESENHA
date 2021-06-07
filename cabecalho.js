import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import logo from './assets/logo.png';
import Bola from './assets/bola.png';

export default function Cabecalho() {
  return (
    <View style={styles.box}>
      <Image source={Bola} style={styles.imagemcabe}></Image>
      <Text style={styles.cabecalho}>Entre nesta RESENHA</Text>
      <Image source={logo} style={styles.imagemcabe}></Image>
    </View>

  )
}

const styles = StyleSheet.create({
  cabecalho: {
    flex: 2,
    fontSize: 25,
    padding: 10,
    textAlign: "center",
    color: '#ffffff'
  },
  box: {
    flexDirection: 'row-reverse',
    backgroundColor: '#009933',
    justifyContent: 'space-between'
  },
  imagemcabe: {
    width: '100%',
    height: '100%',
    flex: 1,

  }
});