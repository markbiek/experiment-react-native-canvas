import React, { Component } from 'react';
import {
    View,
    WebView,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Canvas extends Component {
    render () {
        var contextString = JSON.stringify(this.props.context);
        var renderString = this.props.render.toString();
        var canvasWidth = width;
        var canvasHeight = height;

        //Default is fullscreen = true
        if (this.props.hasOwnProperty('fullscreen') && !this.props.fullscreen) {
            canvasWidth = this.props.width;
            canvasHeight = this.props.height;
        }

        const html = `<style>
* {
    margin: 5;
    padding: 0;
}
canvas {
    position: absolute;
    transform: translateZ(0);
}
</style>
<canvas></canvas>
<script>
    var canvas = document.querySelector('canvas');
    (${renderString}).call(${contextString}, canvas, ${canvasWidth}, ${canvasHeight});
</script>`;

        return (
            <View>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html: html}}
                    opaque={false}
                    underlayColor={'transparent'}
                    style={{height: height, width: width, ...this.props.style}}
                />
            </View>
        );
    }
}
