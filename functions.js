
// Print message divider
module.exports.printd = function (option) {

    if (option) {
        console.log('');
        console.log(`--- ${option} -----------------`);
    }
    else {
        console.log('--------------------');
    }
}

// Print message divider
module.exports.printe = function (value) {
    console.log('');
    console.log(`--- Error! -----------------`);
    console.log(value);
    console.log(`----------------------------`);
}

// Print message
module.exports.printl = function (value) {
    console.log(value);
}

module.exports.param_check = function (userCMD) {
    
    if (!userCMD[3]) {
        App.printe('Missing parameters!');
    }
}