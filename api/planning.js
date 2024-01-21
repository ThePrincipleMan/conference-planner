const data = require('./data');
// dont give kosovo i.e. xkx as an option

function planning(people){
    console.log(people)
    if(people == null){
        var result = {
            "status": 21,
            "message": "You Submitted an empty form" 
        }
    }
    participants = []
    for(let i = 0; i<Object.keys(people).length; i+=1){
        participants.push([data.countrycode[people[i]["nationality"]][2], people[i]["nationality"], people[i]["name"], people[i]["city"]])
        participants.sort((a,b) => a[0] - b[0])
    }
    // shortlist using visa start
    var visaFreeCountries = new Set(); 
    var entryEligibleCountries = new Set();
    var baseCountry = data.countrycode[participants[0][1]];
    for(let country in data.countrycode){
        var status = data.visa[baseCountry[3][0]][data.countrycode[country][3][1]]
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
                // do nothing
            }
            else{
                visaFreeCountries.delete(target);
            }
        }
        for(let target of entryeligIter){
            const val = data.visa[data.countrycode[baseCountry][3][0]][data.countrycode[target][3][1]]
            if( val == 2 ){
                // do nothing
            }
            else{
                entryEligibleCountries.delete(target);
            }
        }
    }

    // shortlist using visa end
    
    const eligIter = entryEligibleCountries.values();
    let eligible = []
    
    for(let ele of eligIter){
        eligible.push([data.countrycode[ele][2], ele])
    }
    eligible.sort((a,b)=> b[0]-a[0])
    
    const visaIter = visaFreeCountries.values();
    let visaFree = []
    for(const ele of visaIter){
        visaFree.push([data.countrycode[ele][2],ele])
    }
    visaFree.sort((a,b) => b[0]-a[0])
    visaFreeCountries = new Set()
    entryEligibleCountries = new Set()
    
    let i = 0
    while(i < visaFree.length && i < 45){
        visaFreeCountries.add(visaFree[i][1])
        i += 1
    }

    let j = 0
    while(j < eligible.length && j < 45){
        entryEligibleCountries.add(eligible[j][1])
        j += 1
    }
    // as already declared, simply reassigning no need to declare with var or let now
    visaFree = [] 
    eligible = []

    // shortlist using distance between places of travel (places of travel can be different from nationality)

    const visaIter1 = visaFreeCountries.values();
    const eligIter1 = entryEligibleCountries.values();

    for(const country of visaIter1){
        var cumulativedistance = 0
        for(let i = 0; i<Object.keys(participants).length; i+=1){
            cumulativedistance += data.distance[data.distmap[participants[i][3]]][data.distmap[country]]
        }
        visaFree.push([cumulativedistance, country])
    }

    for(const country of eligIter1){
        var cumulativedistance = 0
        for(let i = 0; i<Object.keys(participants).length; i+=1){
            cumulativedistance += data.distance[data.distmap[participants[i][3]]][data.distmap[country]]
        }
        eligible.push([cumulativedistance, country])
    }
    visaFree.sort((a,b) => a[0]-b[0])
    eligible.sort((a,b) => a[0]-b[0])
    //return [visaFree, eligible]

    //visaFree, eligible = ShortlistByDistance(visaFreeCountries, entryEligibleCountries)

    var result = {}
    if(Object.keys(visaFree).length == 0 && Object.keys(eligible).length == 0){
        result["status"] = 20
        result["person"] = {}
        result["person"]["name"] = participants[0][2]
        result["person"]["nationality"] = participants[0][1]
        result["person"]["city"] = participants[0][3]
        return result
    }
    else if(Object.keys(eligible).length == 0){
        result["status"] = 11
        result["countries"] = []
        let i = 0
        while(i < 20 && i < Object.keys(visaFree).length){
            result["countries"].push(data.countrycode[visaFree[i][1]][0])
            i += 1
        }
        return result
    }
    else if(Object.keys(visaFree).length == 0){
        result["status"] = 12
        result["countries"] = []
        let i = 0
        while(i<25 && i<Object.keys(eligible).length){
            result["countries"].push(data.countrycode[eligible[i][1]][0])
            i+=1
        }
        return result
    }
    else{
        result["status"] = 10
        result["visafree_countries"] = []
        result["eligible_countries"] = []
        let i = 0
        while(i<10 && i<eligible.length){
            result["eligible_countries"].push(data.countrycode[eligible[i][1]][0])
            i+=1
        }
        i = 0
        while(i < 25 && i < visaFree.length){
            result["visafree_countries"].push(data.countrycode[visaFree[i][1]][0])
            i += 1
        }
        return result
    }
}

module.exports.plan = planning;