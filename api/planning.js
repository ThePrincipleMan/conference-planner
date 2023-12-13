const data = require('./data');

function planning(people){
    participants = []
    for(let i = 0; i<Object.keys(people).length; i+=1){
        participants.push([data.countrycode[people[i]["nationality"]][2], people[i]["nationality"], people[i]["name"], people[i]["city"]])
        participants.sort((a,b) => a[0] - b[0])
    }
    var visaFreeCountries = new Set();
    var entryEligibleCountries = new Set();
    var baseCountry = data.countrycode[participants[0][1]][3][0];
    for(let country in data.countrycode){
        var status = data.visa[baseCountry][data.countrycode[country][3][1]]
        if(status == 2){
            entryEligibleCountries.add(country)
        }
        else if(status == 1 || status > 2){
            visaFreeCountries.add(country)
        }
    }

    for(let i=1; i<Object.keys(participants).length; i+=1){
        if(visaFreeCountries.size == 0 && entryEligibleCountries.size == 0){
            break;
        }
        var baseCountry = participants[i][1];
        const visafreeIter = visaFreeCountries.values()
        const entryeligIter = entryEligibleCountries.values()
        for(let target of visafreeIter){
            const val = data.visa[data.countrycode[baseCountry][3][0]][data.countrycode[target][3][1]]
            if( val == 1 || val > 2){

            }
            else{
                visaFreeCountries.delete(target);
            }
        }
        for(let target of entryeligIter){
            const val = data.visa[data.countrycode[baseCountry][3][0]][data.countrycode[target][3][1]]
            if( val == 2 ){

            }
            else{
                entryEligibleCountries.delete(target);
            }
        }
    }
    const eligIter = entryEligibleCountries.keys();
    let eligible = []
    for(const ele of eligIter){
        eligible.push([data.countrycode[ele][2], ele])
    }
    eligible.sort((a,b)=> b[0]-a[0])
    
    const visaIter = visaFreeCountries.values();
    let visaFree = []
    for(const ele of visaIter){
        visaFree.push([data.countrycode[ele][2],ele])
    }
    visaFree.sort((a,b) => b[0]-a[0])

    var result = {}
    if(visaFreeCountries.size == 0 && entryEligibleCountries.size == 0){
        result["status"] = 20
        result["person"] = {}
        result["person"]["name"] = participants[0][2]
        result["person"]["nationality"] = participants[0][1]
        return result
    }
    else if(entryEligibleCountries.size == 0){
        result["status"] = 11
        result["countries"] = []
        let i = 0
        while(i < 3 && i < visaFree.length){
            result["countries"].push(data.countrycode[visaFree[i][1]][0])
            i += 1
        }
        return result
    }
    else if(visaFreeCountries.size == 0){
        result["status"] = 12
        result["countries"] = []
        let i = 0
        while(i<3 && i<eligible.length){
            result["countries"].push(data.countrycode[eligible[i][1]][0])
            i+=1
        }
        return result
    }
    else{
        result["status"] = 10
        result["visa_countries"] = []
        result["elig_countries"] = []
        let i = 0
        while(i<3 && i<eligible.length){
            result["elig_countries"].push(data.countrycode[eligible[i][1]][0])
            i+=1
        }
        i = 0
        while(i < 3 && i < visaFree.length){
            result["visa_countries"].push(data.countrycode[visaFree[i][1]][0])
            i += 1
        }
        return result
    }
}

module.exports.plan = planning;