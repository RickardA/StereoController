const Gpio = require('onoff').Gpio
const hap = require('hap-nodejs')
const Relay = require('./Relay')

const Accessory = hap.Accessory
const Characteristic = hap.Characteristic
const CharacteristicEventTypes = hap.CharacteristicEventTypes
const Service = hap.Service

let relay1 = new Relay(4,'relay1','678-90-876','54:52:00:00:7f:bb')
let relay2 = new Relay(17,'relay2','678-90-877','54:52:00:50:43:76')
let relay3 = new Relay(27,'relay3','678-90-878','54:52:00:9b:54:39')
let relay4 = new Relay(22,'relay4','678-90-879','54:52:00:4c:25:fd')

let relays = [
    relay1,
    relay2,
    relay3,
    relay4
]

relays.forEach( relay => {
    relay.on('toggled', (data,name) => {
        if (data) {
            console.log('Toggled ',name)
            switch (name) {
                case 'relay1':
                    relay2.turnOnRelay()
                    relay3.turnOffRelay()
                    relay4.turnOffRelay()
                    break
                case 'relay2':
                    relay1.turnOnRelay()
                    relay3.turnOffRelay()
                    relay4.turnOffRelay()
                    break
                case 'relay3':
                    relay4.turnOnRelay()
                    relay1.turnOffRelay()
                    relay2.turnOffRelay()
                    break
                case 'relay4':
                    relay3.turnOnRelay()
                    relay1.turnOffRelay()
                    relay2.turnOffRelay()
                    break
            }
            /*const relaysToTurnOff = relays.filter((relay) => {
                if (relay.name = "relay1")  
                relay.name != name
            })
            console.log(relaysToTurnOff.length)
            relaysToTurnOff.forEach(rel => {
                rel.turnOffRelay()
            })
            for (const relayToTrunOff in relaysToTurnOff) {
                relaysToTurnOff.toggleRelay(false)
            }*/
        }
    })
}) 
