import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Canvas from '../Canvas';
import renderCanvas from '../../modules/Render';

const { width, height } = Dimensions.get('window');

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Canvas
                    context={{message: 'Hello World'}}
                    render={renderCanvas}
                    style={{backgroundColor: 'red'}}
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
