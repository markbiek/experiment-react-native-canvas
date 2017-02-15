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
        var canvasWidth = width - 100;
        var canvasHeight = height - 100;

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
#console {
    width: 95%;
    height: 100px;
    margin: 0 auto;
    border: 1px solid black;
    background: white;
    font-size: 8;
    overflow: scroll;
}
</style>
<div id="console"></div>
<canvas></canvas>
<script>
    console.log = function(msg) {
        var c = document.getElementById('console');
        var html = c.innerHTML;

        c.innerHTML += msg + '<br />';
    };

    (${renderString}).call(${contextString}, ${canvasWidth}, ${canvasHeight});
</script>`;

        return (
            <View>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html: html}}
                    opaque={false}
                    underlayColor={'transparent'}
                    scrollEnabled={false}
                    style={{height: height, width: width, ...this.props.style}}
                />
            </View>
        );
    }
}
