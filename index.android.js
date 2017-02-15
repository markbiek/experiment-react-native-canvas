/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Canvas from './components/Canvas';
import renderCanvas from './modules/Render';

const { width, height } = Dimensions.get('window');

export default class NativeCanvasTest3 extends Component {
    render() {
        console.log('NativeCanvasTest3');
        console.log('render');
        console.log(`height=${height}, width=${width}`);
        return (
            <View style={styles.container}>
                <Canvas
                    context={{message: 'Hello World'}}
                    render={renderCanvas}
                    style={{backgroundColor: '#f0f0f0'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

AppRegistry.registerComponent('NativeCanvasTest3', () => NativeCanvasTest3);
