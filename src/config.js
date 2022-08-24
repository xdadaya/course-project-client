const backendProtocol = 'http'
const backendAddress = '192.168.31.20'
const backendPort = '5000'

let backendUrl = `${backendProtocol}://${backendAddress}`
if (backendPort){
    backendUrl = backendUrl + `:${backendPort}`
}
