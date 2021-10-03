/**
 * @format
 */

import 'react-native';
import React from 'react';
import App, { SongRow } from '../App';


import renderer from 'react-test-renderer';
const tree = renderer.create(<App />)

const testIds = {
  artistName: 'artistName',
  trackName: 'trackName',
  collectionPrice: 'collectionPrice',
  primaryGenreName: 'primaryGenreName',
}


it('snapshot', () => {
  expect(tree).toMatchSnapshot();
});


test('pass args to song row', () => {

  const artistName = 'prince';
  const trackName = 'purpleRain';
  const collectionPrice = 1.00;
  const primaryGenreName = 'r&b';

  const testRenderer = renderer.create(<SongRow artistName={artistName} trackName={trackName} collectionPrice={collectionPrice} primaryGenreName={primaryGenreName} />);
  const testInstance = testRenderer.root;

  const artistField = testInstance.findByProps({ testId: testIds.artistName }).props
  const trackField = testInstance.findByProps({ testId: testIds.trackName }).props
  const priceField = testInstance.findByProps({ testId: testIds.collectionPrice }).props
  const genereField = testInstance.findByProps({ testId: testIds.primaryGenreName }).props

  expect(artistField.children).toEqual(artistName);
  expect(trackField.children).toEqual(trackName);
  expect(priceField.children).toEqual(collectionPrice);
  expect(genereField.children).toEqual(primaryGenreName);
});