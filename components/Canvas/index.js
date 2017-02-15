import React, { Component } from 'react';
import {
    View,
    WebView
} from 'react-native';

export default class Canvas extends Component {
    render () {
        var contextString = JSON.stringify(this.props.context);
        var renderString = this.props.render.toString();

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
    (${renderString}).call(${contextString}, canvas, ${this.props.width}, ${this.props.height});
</script>`;

        return (
            <View>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html: html}}
                    opaque={false}
                    underlayColor={'transparent'}
                    style={this.props.style}
                />
            </View>
        );
    }
}
