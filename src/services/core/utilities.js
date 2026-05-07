// waitForReadyState
async function waitForReadyState() {
  if (typeof document !== 'undefined' && document.readyState !== 'complete') {
    await new Promise(resolve => {
      const cb = () => {
        window.requestAnimationFrame(resolve)
        window.removeEventListener('load', cb)
      }
      window.addEventListener('load', cb)
    })
  }
}

// scrollBehavior
async function scrollBehavior(to, from, savedPosition) {
  await waitForReadyState()
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    return { selector: to.hash }
  }
  return { x: 0, y: 0 }
}

// noop
function noop() {}
// isDefined
function isDefined(value) {
  return typeof value !== 'undefined'
}
// isFunction
function isFunction(value) {
  return typeof value === 'function'
}

// email regex checker
function isEmail(email) {
  // const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const ExEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/
  return ExEmail.test(email)
}

// uuid
function genUuId(baseStr) {
  let strTemplate = [1e7] + -9e3 + -4e3 + -8e3 + -3e11
  if (baseStr) strTemplate = baseStr
  return strTemplate.replace(/[013489]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
}

// move itesm in a sorted list
function moveItem(itemsArr, oldIndex, newIndex) {
  const itemRemovedArr = [...itemsArr.slice(0, oldIndex), ...itemsArr.slice(oldIndex + 1, itemsArr.length)]

  return [...itemRemovedArr.slice(0, newIndex), itemsArr[oldIndex], ...itemRemovedArr.slice(newIndex, itemRemovedArr.length)]
}

/**
 * A page can't be manipulated safely until the document is "ready." Here's how to make sure code isn't run prematurely.
 * @param {Function} callback - Function to run after dom loaded.
 * @returns {null}
 * Usage:
 * function run() {
 *  // do something here
 * }
 * onDOMContentLoaded(run)
 */
function onDOMContentLoaded(callback) {
  if (document.readyState != 'loading') {
    callback()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == 'complete') {
        callback()
      }
    })
  }
}

/**
 * Calculate the difference between two dates in years, months, and days.
 * @param {Date} startDate - The earlier date.
 * @param {Date} endDate - The later date.
 * @returns {{years: number, months: number, days: number}}
 * Usage:
 * const diff = preciseDateDiff(start, end);
 * console.log(`Difference: ${diff.years} years, ${diff.months} months, ${diff.days} days`);
 */
function preciseDateDiff(startDate, endDate) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error('Both arguments must be Date objects.')
  }
  if (endDate < startDate) {
    // Swap if dates are in wrong order
    ;[startDate, endDate] = [endDate, startDate]
  }

  let years = endDate.getFullYear() - startDate.getFullYear()
  let months = endDate.getMonth() - startDate.getMonth()
  let days = endDate.getDate() - startDate.getDate()

  // Adjust months and years if needed
  if (days < 0) {
    // Borrow days from previous month
    months--
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    months += 12
    years--
  }

  return { years, months, days }
}

export { scrollBehavior, noop, isFunction, isEmail, genUuId, moveItem, onDOMContentLoaded, preciseDateDiff }
