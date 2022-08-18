## Description
This is the motor driver for the  **self-parking car**. This software is part of the [JavaScript self-parking car project](https://github.com/gcornetta/self-parking-car).

## Usage
To use this driver in your application follow the steps depicted in the sequel:
1. clone this repo typing `git clone https://github.com/gcornetta/rpi-car-motor-driver.git`.
2. copy the `Motor` folder in your project.
3. update your `package.json` file with the driver dependencies and type `npm install` to install the new packages.

Include the driver in your application:

```
const Motor = require('./Motor')
const motor = new Motor()
```

## Disclaimer
This software is still experimental and have been not testsed yet. Please do not use.
