module.exports = {
  TestLink:(link) => {
    let patt = /[\/]{1}[r]{1}[\/]{1}[u]{1}[s]{1}[\/]{1}[A-Za-z0-9]{64}/g


    let c_1 = link.substring(0, 3);
    let c_2 = link.substring(2, 6);
    let c_3 = link.substring(6, 70);

    if (link.match(patt) === null) {
      return false
    } else if (c_1 !== '/r/') {
      return false
    } else if (c_2 !== '/us/') {
      return false
    } else if (link.length !== 70) {
      return false
    } else if (c_3.includes('/')) {
      return false
    } else if (c_3.includes('(')) {
      return false
    } else if (c_3.includes(')')) {
      return false
    } else if (c_3.includes('"')) {
      return false
    } else if (c_3.includes('}')) {
      return false
    } else if (c_3.includes('{')) {
      return false
    } else if (c_3.includes('?')) {
      return false
    } else if (c_3.includes('!')) {
      return false
    } else if (c_3.includes('&')) {
      return false
    } else if (c_3.includes('\\')) {
      return false
    } else if (c_3.includes('\'')) {
      return false
    } else if (c_3.includes("'")) {
      return false
    } else {
      return c_3
    }

  }
}
