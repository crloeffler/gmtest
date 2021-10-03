/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


export const SongRow = ({ artistName, trackName, collectionPrice, primaryGenreName }) => {
  return (
    <View style={styles.result}>
      <View style={styles.resultRow}>
        <Text>Artist </Text>
        <Text testId="artistName">{artistName}</Text>
      </View>

      <View style={styles.resultRow}>
        <Text>trackName </Text>
        <Text testId="trackName">{trackName}</Text>
      </View>
      <View style={styles.resultRow}>
        <Text>TrackPrice </Text>
        <Text testId="collectionPrice">{collectionPrice}</Text>
      </View>
      <View style={styles.resultRow}>
        <Text>primaryGenreName </Text>
        <Text testId="primaryGenreName">{primaryGenreName}</Text>
      </View>

    </View>
  )
}

const App = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const getInfo = () => {
    setData({});
    setLoading(true)
    fetch('https://itunes.apple.com/search?term=prince')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false)
      });
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity onPress={getInfo}>
          <Text testId="show_records">Show Records</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" />}
        {data.results?.map((song) =>
          <SongRow artistName={song.artistName} trackName={song.trackName} collectionPrice={song.collectionPrice} primaryGenreName={song.primaryGenreName} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  result: {
    margin: 20,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default App;
