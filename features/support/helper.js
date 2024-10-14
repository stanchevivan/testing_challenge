function getUrlForEnvironment(environment){
    switch (environment.trim()) {
        case "development":
            return "https://dev.saucedemo.com"
        case "stage":
            return "https://stage.saucedemo.com"
        case "production":
            return "https://www.saucedemo.com"
        default:
            throw new Error(`Environment ${environment} not recognised`)
    }
    
}

async function filterAsync(arr, callback) {
    return await arr.reduce(async (res, val) => {
        res = await res
        if (await callback(val)) {
            res.push(val)
        }
        return res
    }, Promise.resolve([]))
}

async function extractAmount(currencyString) {
    return /\d+(?:\.\d+)?/.exec(currencyString)[0]
}

async function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
      }
    
      arr1 = arr1.slice().sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
      arr2 = arr2.slice().sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    
      for (let i = 0; i < arr1.length; i++) {
        if (!deepEqual(arr1[i], arr2[i])) {
          return false;
        }
      }
      return true;
}

function isArraySortedDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (parseFloat(arr[i]) < parseFloat(arr[i + 1])) {
            return false;
        }
    }
    return true;
}

async function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

module.exports = {filterAsync, extractAmount, compareArrays, isArraySortedDescending, getUrlForEnvironment}