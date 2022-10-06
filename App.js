import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Botao from './Botao';

export default function App() {

  const [primeiroNum, setPrimeiroNum] = useState(0);
  const [segundoNum, setSegundoNum] = useState(0);
  const [sinal, setSinal] = useState('');

  const [stringCalc, setStringCalc] = useState('0');

  var numeros = [];

  for (var i = 0; i <= 9; i++) {
    numeros.push(i);
  }

  function logicaCalculadora(n) {
    if (sinal == '') {
      setPrimeiroNum(parseInt(primeiroNum.toString() + n.toString()));
      setStringCalc(parseInt(primeiroNum.toString() + n.toString()))
    }

    if ((n == '/' || n == '*' || n == '+' || n == '-') && segundoNum == 0) {
      setStringCalc(primeiroNum.toString() + n);
      setSinal(n);
    }

    if (sinal != '') {
      setSegundoNum(parseInt(segundoNum.toString() + n.toString()));
      setStringCalc(primeiroNum + sinal + parseInt(segundoNum.toString() + n.toString()))
    }

    if (n == '=') {
      let resultado = 0;
      if (sinal == '+') {
        resultado = primeiroNum + segundoNum;
      } else if (sinal == '-') {
        resultado = primeiroNum - segundoNum;
      } else if (sinal == '/') {
        resultado = primeiroNum / segundoNum;
      } else if (sinal == '*') {
        resultado = primeiroNum * segundoNum;
      }
      setStringCalc(resultado);
      setSinal('');
      setPrimeiroNum(resultado);
      setSegundoNum(0);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar hidden />
      <View style={styles.topo}>
        <Text style={{ fontSize: 24, color: 'white' }}>{stringCalc}</Text>
      </View>

      <View style={{ flexDirection: 'row', height: '16.6%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => logicaCalculadora('+')} style={styles.btnSinais}>
          <Text style={{ fontSize: 24, color: 'white' }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logicaCalculadora('-')} style={styles.btnSinais}>
          <Text style={{ fontSize: 24, color: 'white' }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logicaCalculadora('*')} style={styles.btnSinais}>
          <Text style={{ fontSize: 24, color: 'white' }}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logicaCalculadora('/')} style={styles.btnSinais}>
          <Text style={{ fontSize: 24, color: 'white' }}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logicaCalculadora('=')} style={styles.btnSinais}>
          <Text style={{ fontSize: 24, color: 'white' }}>=</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderTopColor: 'black', borderTopWidth: 2, height: '66.8%' }}>
        {
          numeros.map(function (e) {
            return (<Botao logicaCalculadora={logicaCalculadora} numero={e}></Botao>);
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  topo: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: 'rgb(20,20,20)',
    height: '16.6%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  btnSinais: {
    width: '20%',
    backgroundColor: 'rgb(20,20,20)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});
