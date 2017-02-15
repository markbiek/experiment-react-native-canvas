Experimenting with drawing to an HTML `<canvas>` element inside a react-native app.

The basic concept is from https://github.com/iddan/react-native-canvas.

Our demo uses ES6 to be a little tidier, plus adds a couple of extra props to the `<Canvas />` component.

The basic idea is, you have a JS function that's doing all the drawing. That function is passed to the `<Canvas />` component, converted to a string, inserted in a `<script>` tag in a `<WebView />` component, and then rexecuted.
