const Gpio = require('pigpio').Gpio

class Motor {
	#maxSpeed
    #minSpeed
	#motor

	/**
	 * 
	 * @param { number } channel - the device channel 
	 * @param { number } pwm - pwm value
	 * @param { number } speed - motor speed (0 - 100)
	 * @param { Boolean } forward - direction (forward, backward)
	 */
	constructor (channel, pwm, speed=0, forward=true) {
		this.channel = channel
		this.speed = speed
		this.forward = forward

		// private properties
		this.#maxSpeed = 100
		this.#minSpeed = 0
		this.#motor = new Gpio(this.channel, {
			mode: Gpio.OUTPUT
		})

		this.pwm = pwm === undefined 
			? this.#motor.pwmWrite(this.speed) 
			| pwm
	}

	/**
	 * #checkSpeed - check if the speed falls within the allowed range
	 * 
	 * @param { number } s 
	 * @returns { number }  
	 */
	#checkSpeed(s) {
		let speed = s
		if (speed < this.#minSpeed) {
			speed = this.#minSpeed
		}
		if (speed > this.#maxSpeed) {
			speed = this.#maxSpeed
		}
		return speed	
	}

	/**
	 * getter: returns speed
	 */
	get speed () {
		return this.speed 
	}

	/**
	 * setter: set speed
	 * 
	 * @param { number } s - the new speed  
	 */
	set speed (s) {
		this.speed = this.#checkSpeed(s)
		this.pwm = this.#motor.pwmWrite(this.speed) 

	} 

	/**
	 * getter: pwm value
	 */
	get pwm () {
		return this.pwm 
	}

	/**
	 * setter: pwm value
	 * 
	 * @param {number} p - the new pwm value
	 */
	set pwm (p) {
		this.pwm = this.#motor.pwmWrite(p)
	} 

	/**
	 * forward: make the car go forward
	 * 
	 * @param { number } speed  - the car speed
	 */
	forward (speed) {
		const val = this.forward ? 1 : 0
		this.speed = this.#checkSpeed (speed)
		this.#motor.digitalWrite(val)
	}

	/**
	 * backward: make the car go backward
	 * 
	 * @param { number } speed -the car speed 
	 */
	backward (speed) {
		const val = this.forward ? 0 : 1
		this.speed = this.#checkSpeed (speed)
		this.#motor.digitalWrite(val)
	}

	/**
	 * stop: make the car stop by setting its speed to 0
	 */
	stop () {
		this.speed = 0
	}

} 

//named export
module.exports = { Motor }
