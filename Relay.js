const Gpio = require('onoff').Gpio
const hap = require('hap-nodejs')
const EventEmitter = require('events')

module.exports = class Relay extends EventEmitter {

    constructor(pin,name,pinCode,mac) {
        super()
        this.name = name
        this.accessoryUuid = hap.uuid.generate(name)
        this.accessory = new hap.Accessory(name, this.accessoryUuid)
        this.switchService = new hap.Service.Switch(this.name)
        this.currentSwitchState = false
        this.relay = new Gpio(pin,'out')
        this.onCharacteristic = this.switchService.getCharacteristic(hap.Characteristic.On)

        this.onCharacteristic.on(hap.CharacteristicEventTypes.GET, callback => {
            console.log('Queried current light state: ', this.currentSwitchState)
            callback(undefined, this.currentSwitchState)
        })

        this.onCharacteristic.on(hap.CharacteristicEventTypes.SET, (value,callback) => {
            console.log('Setting switch state to ', value)
            this.currentSwitchState = value
            this.toggleRelay(value)
            callback()
        })

        this.accessory.addService(this.switchService)
        this.accessory.publish({
            username: mac,
            pincode: pinCode,
            port: 0,
            category: hap.Categories.SWITCH
        })
    }

    toggleRelay(value) {
        this.relay.writeSync(value ? 1 : 0)
        this.emit('toggled',this.currentSwitchState,this.name)
    }

    turnOffRelay() {
        console.log('turn off relay')
        this.relay.writeSync(0)
        this.currentSwitchState = false
        this.onCharacteristic.updateValue(false)
    }

    turnOnRelay() {
        console.log('turn off relay')
        this.relay.writeSync(1)
        this.currentSwitchState = true
        this.onCharacteristic.updateValue(true)
    }

    unexportOnClose() {
        this.relay.writeSync(0)
        this.relay.unexport()
    }
}