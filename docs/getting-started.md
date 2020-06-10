# Getting started with Carbon
## Get up and running with the Carbon library and start developing your application with Carbon integration.

### Contents
[Installation](#installation)

[Peer Dependencies](#peer-dependencies)
* [Fonts](#fonts)
* [React and React DOM](#react-and-react-dom)
* [Base CSS](#base-css)
* [Theming](#theming)
* [AppWrapper](#appwrapper)
* [Quickstart](#quickstart)

### Installation
Carbon is available as an [npm package](https://www.npmjs.com/package/carbon-react), install it into your project with:

```js
npm install carbon-react
```

### Peer Dependencies
You will need to install the following dependencies in your project, these are peer-dependencies of carbon-react and are required.

```sh
npm install react@^16.12.0 react-dom@^16.12.0 i18n-js@^3.0.0 styled-components@^4.4.1
```

#### Fonts
##### CDN
`carbon-react` requires the `Lato` and `CarbonIcons` fonts to display correctly.

To embed the `Lato` font, copy the code below into the `<head>` of your HTML.
```
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900" rel="stylesheet">
``` 
The `CarbonIcons` font is not available on a CDN.

##### Self Hosted
Please be aware that the Google Fonts CDN provides the optimal stylesheet based on the browser `user-agent` string to limit "flash of unstyled text". It's important that you fully understand the [technical considerations](https://developers.google.com/fonts/docs/technical_considerations) before hosting any font yourself.

The `Lato` font can be downloaded from [Google Fonts](https://fonts.google.com/specimen/Lato).

```css
  @font-face {
    font-family: 'Lato';
    src: url('./fonts/Lato-Regular.eot') format('embedded-opentype');
    src: url('./fonts/Lato-Regular.svg') format('svg');
    src: url('./fonts/Lato-Regular.woff') format('woff');
    src: url('./fonts/Lato-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
```
_Note: You'll need to define a `@font-face` for each font-weight._

The path to the `CarbonIcons` font is `carbon-react/lib/style/fonts/carbon-icons-webfont.woff`.
```css
@font-face {
  font-family: 'CarbonIcons';
  src: url('./node_modules/carbon-react/lib/style/fonts/carbon-icons-webfont.woff') format("woff");
  font-weight: normal;
  font-style: normal;
}
```

If you are using `webpack`, you can use [file-loader](https://webpack.js.org/loaders/file-loader/) or [url-loader](https://webpack.js.org/loaders/url-loader/) to bundle the fonts with your application.
`url-loader` will allow any assets under a given limit to be embedded as a dataURL in `base64` and reduce network requests; `file-loader` can be used for any asset over the limit.

Example of `webpack.config.js`
```js
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8192,
            }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '/[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
      ...
    ]
  }
  ...
};
```

If you are not using webpack, you will need to ensure that the font files are available in your build and that the `@font-face` use the correct URL's.

You can move it to your build folder as part of your build.
```sh
mkdir -p dist/fonts
cp ./node_modules/carbon-react/lib/style/fonts/carbon-icons-webfont.woff ./dist/fonts/
```
Or publish it to a CDN such as Amazon S3.
```sh
aws s3 sync ./node_modules/carbon-react/lib/style/fonts/carbon-icons-webfont.woff s3://example.com/fonts/
```

While not required, we also recommend using [`webfontloader`](https://github.com/typekit/webfontloader#custom) to control the loading behaviour and avoid a "flash of unstyled text". `webfontloader` adds CSS classes to the `<body>` giving you finer control over the blocking behaviour.

```js
WebFont.load({
  custom: {
    families: ['CarbonIcons', 'Lato']
  }
});
```

#### React and React DOM
React and React DOM are imported from the [React library](https://reactjs.org/), which forms the basis for Carbon's components.
```js
import React from 'react';
import ReactDOM from 'react-dom';
```
#### Base CSS
Carbon provides some baseline CSS that is applied to `body` and other elements. You should import this into the root of your project.
```js
import 'carbon-react/lib/utils/css';	
```
#### Theming
Carbon uses the `ThemeProvider` from the [styled-components library](https://styled-components.com/docs/advanced#theming) to supply theme styles to your components. Themes are define within the Carbon library.
```js
import { ThemeProvider } from "styled-components";
import mintTheme from "carbon-react/lib/style/themes/mint";
```

```html
 <ThemeProvider theme={mintTheme}>
  Children
 </ThemeProvider>
```
#### AppWrapper
This component wraps all components within the width constrains of your application.
```html
<AppWrapper>
  Children
</AppWrapper>
```
You should refer to our [Storybook documentation](https://carbon.sage.com/?path=/docs/app-wrapper--default) for details.

#### Quickstart
A basic project `index.js` file would resemble this example. 
```js
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import mintTheme from "carbon-react/lib/style/themes/mint";
import "carbon-react/lib/utils/css";
import AppWrapper from "carbon-react/lib/components/app-wrapper";
import Button from "carbon-react/lib/components/button";

const App = props => {
  return (
    <ThemeProvider theme={mintTheme}>
      <AppWrapper>
        <Button>Hello Carbon</Button>
        <p>
          Please remember to select the appropriate version of Carbon.
        </p>
      </AppWrapper>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
```
This can also be found in our [Codesandbox template](https://codesandbox.io/s/carbon-quickstart-xi5jc).