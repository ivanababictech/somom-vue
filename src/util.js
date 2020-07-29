import _ from 'lodash';

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * Clones the object keys (without null values)
 * support 2lvl nested objects
 * TODO add more nesting levels
 */
export function deepCloneKeys(object) {
  return _.cloneWith(object, customizer);
}

export function customizer (object) {
  if (_.isObject(object)) {
    return _.mapValues(object, objec => {
      if (_.isArray(objec)) {
        objec = objec[0];
        return [
          _.mapValues(objec, obje => null)
        ];
      }

      if (_.isObject(objec)) {
        return _.mapValues(objec, obje => {
          if (_.isArray(obje)) {
            obje = obje[0];
          }
          if (_.isObject(obje)) {
            return _.mapValues(obje, obj => null);
          }
          return null;
        });
      }
      return null;
    });
  }
  return null;
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  const a = path.split('.')
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (obj instanceof Object && k in obj) {
      obj = obj[k]
    } else {
      return
    }
  }
  return obj
}

export function searchArrayItems (items, search, props) {
  if (!search) {
    return items
  }
  search = search.toString().trim().toLowerCase()
  return items.filter(item => {
    return props.some(prop => {
      const val = getObjectValueByPath(item, prop)
      return val !== null &&
        ['undefined', 'boolean'].indexOf(typeof val) === -1 &&
        val.toString().toLowerCase().indexOf(search) !== -1
    })
  })
}

// Date helpers
export function formatDate (date) {
  if (!date) {
    return null
  }

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`
}
export function parseDate (date) {
  if (!date) {
    return null
  }

  const [day, month, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export function isEUCountry(country_code) {
  const euCountries = [
    'AT',
    'BE',
    'BG',
    'CY',
    'CZ',
    'DE',
    'DK',
    'EE',
    'ES',
    'FI',
    'FR',
    'GB',
    'GR',
    'HU',
    'HR',
    'IE',
    'IT',
    'LT',
    'LU',
    'LV',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SE',
    'SI',
    'SK'
  ]

  if (euCountries.indexOf(country_code.toUpperCase()) >= 0) {
    return true
  }
  return false
}

export function isMTVATNo (vatNo) {
  // cast vat no to upper case
  vatNo = vatNo.toUpperCase()
  // Remove spaces etc. from the VAT number to help validation
  vatNo = vatNo.replace (/(\s|-|\.)+/g, '')
  // MT vat no regular exppression
  const mtVatExp = /^(MT)([1-9]\d{7})$/
  return mtVatExp.test(vatNo)
}

export function isEUVATNo(vatNo) {
  const vatexp = []

  vatexp.push (/^(AT)U(\d{8})$/);                           //** Austria
  vatexp.push (/^(BE)(0?\d{9})$/);                          //** Belgium 
  vatexp.push (/^(BG)(\d{9,10})$/);                         //** Bulgaria 
  vatexp.push (/^(CHE)(\d{9})(MWST|TVA|IVA)?$/);            //** Switzerland
  vatexp.push (/^(CY)([0-59]\d{7}[A-Z])$/);                 //** Cyprus
  vatexp.push (/^(CZ)(\d{8,10})(\d{3})?$/);                 //** Czech Republic
  vatexp.push (/^(DE)([1-9]\d{8})$/);                       //** Germany 
  vatexp.push (/^(DK)(\d{8})$/);                            //** Denmark 
  vatexp.push (/^(EE)(10\d{7})$/);                          //** Estonia 
  vatexp.push (/^(EL)(\d{9})$/);                            //** Greece 
  vatexp.push (/^(ES)([A-Z]\d{8})$/);                       //** Spain (National juridical entities)
  vatexp.push (/^(ES)([A-HN-SW]\d{7}[A-J])$/);              //** Spain (Other juridical entities)
  vatexp.push (/^(ES)([0-9YZ]\d{7}[A-Z])$/);                //** Spain (Personal entities type 1)
  vatexp.push (/^(ES)([KLMX]\d{7}[A-Z])$/);                 //** Spain (Personal entities type 2)
  vatexp.push (/^(EU)(\d{9})$/);                            //** EU-type 
  vatexp.push (/^(FI)(\d{8})$/);                            //** Finland 
  vatexp.push (/^(FR)(\d{11})$/);                           //** France (1)
  vatexp.push (/^(FR)([A-HJ-NP-Z]\d{10})$/);                // France (2)
  vatexp.push (/^(FR)(\d[A-HJ-NP-Z]\d{9})$/);               // France (3)
  vatexp.push (/^(FR)([A-HJ-NP-Z]{2}\d{9})$/);              // France (4)
  vatexp.push (/^(GB)?(\d{9})$/);                           //** UK (Standard)
  vatexp.push (/^(GB)?(\d{12})$/);                          //** UK (Branches)
  vatexp.push (/^(GB)?(GD\d{3})$/);                         //** UK (Government)
  vatexp.push (/^(GB)?(HA\d{3})$/);                         //** UK (Health authority)
  vatexp.push (/^(HR)(\d{11})$/);                           //** Croatia 
  vatexp.push (/^(HU)(\d{8})$/);                            //** Hungary 
  vatexp.push (/^(IE)(\d{7}[A-W])$/);                       //** Ireland (1)
  vatexp.push (/^(IE)([7-9][A-Z\*\+)]\d{5}[A-W])$/);        //** Ireland (2)
  vatexp.push (/^(IE)(\d{7}[A-W][AH])$/);                   //** Ireland (3)
  vatexp.push (/^(IT)(\d{11})$/);                           //** Italy 
  vatexp.push (/^(LV)(\d{11})$/);                           //** Latvia 
  vatexp.push (/^(LT)(\d{9}|\d{12})$/);                     //** Lithunia
  vatexp.push (/^(LU)(\d{8})$/);                            //** Luxembourg 
  vatexp.push (/^(MT)([1-9]\d{7})$/);                       //** Malta
  vatexp.push (/^(NL)(\d{9})B\d{2}$/);                      //** Netherlands
  vatexp.push (/^(NO)(\d{9})$/);                            //** Norway (not EU)
  vatexp.push (/^(PL)(\d{10})$/);                           //** Poland
  vatexp.push (/^(PT)(\d{9})$/);                            //** Portugal
  vatexp.push (/^(RO)([1-9]\d{1,9})$/);                     //** Romania
  //vatexp.push (/^(RU)(\d{10}|\d{12})$/);                    //** Russia
  vatexp.push (/^(RS)(\d{9})$/);                            //** Serbia
  vatexp.push (/^(SI)([1-9]\d{7})$/);                       //** Slovenia
  vatexp.push (/^(SK)([1-9]\d[2346-9]\d{7})$/);             //** Slovakia Republic
  vatexp.push (/^(SE)(\d{10}01)$/);                         //** Sweden

  // Load up the string to check
  var VATNumber = toCheck.toUpperCase()
  
  // Remove spaces etc. from the VAT number to help validation
  VATNumber = VATNumber.replace (/(\s|-|\.)+/g, '')

  // Assume we're not going to find a valid VAT number
  let valid = false                     
  
  // Check the string against the regular expressions for all types of VAT numbers
  vatexp.forEach(exp => {
    if (exp.test(vatNo)) {
      valid = true
    }
  })
  
  return valid
}

export function findSubstringInArray(root, key, needle)
{
    return root[key].find((element) => _.includes(element.toLowerCase(), needle.toLowerCase()))
}