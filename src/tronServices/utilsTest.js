
const tronUtils=require('./utils');


// ##########################################################################################################

tronUtils.getTransactionInfo('6af1482e15bcf3af0de392af58b519bc91aa51255646677077741eddc061cbfc').then(res=>{
    console.log(res)
    console.log(tronUtils.tronHexToAscii(res['resMessage']))
    console.log(tronUtils.tronHexToAscii(res['contractResult'][0]))
})


