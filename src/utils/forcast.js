const request = require('request')

const forcast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=210c5a67336e94039bcaf4bbbf7e2478&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+ '&unit=f'

    request({url, json: true},(error, response)=>{
        if(error){
            callback('Unable to send the service request!',undefined)
        }else if(response.body.error){
            callback('Error Response and error code is : '+response.body.error.code, undefined)
        }else{
            callback(undefined,{
                temperature: response.body.current.temperature,
                weather: 'forcast is: '+ response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports={
    forcast: forcast
}