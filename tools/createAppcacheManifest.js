var fs = require('fs')
var read = require('fs-readdir-recursive')
var rndm = require('rndm')
var path = require('path')
var buildPath = path.resolve(__dirname, '../build')
var manifestPath = path.resolve(buildPath, 'manifest.appcache')
var newLine = '\n'

// Don't include hidden files
var filter = function (x) {
  return !(
    x[0] === '.' ||             // Don't include hidden files
    x.includes('.js.map') ||    // Don't include .js.map
    x.includes('.template') ||  // Don't include templates
    x.includes('.appcache')     // Don't include .appcache
  )
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this
    return target.split(search).join(replacement)
}

var allFiles = read(buildPath, filter)
  .map(function(item){
    return item.replaceAll('\\', '/') // Needed if running on Windows
  })

var writeStream = fs.createWriteStream(manifestPath)

/***** CREATE APPCACHE MANIFEST *****/

/* START HEAD */
writeStream.write('CACHE MANIFEST' + newLine)
writeStream.write(newLine)
writeStream.write('# This manifest is auto-generated by createAppcacheManifest.js' + newLine)
writeStream.write('# in the tools dir. Do not modify this file directly!' + newLine)
writeStream.write(newLine)
writeStream.write('CACHE:' + newLine)
/* END HEAD */

/* START BODY */
allFiles.map(function(item){
  writeStream.write(item + newLine)
})
/* END BODY */

/* START FOOTER */
writeStream.write(newLine)
writeStream.write('NETWORK:' + newLine)
writeStream.write('*' + newLine)
writeStream.write(newLine)
writeStream.write('# Hash from Node script:' + newLine)
writeStream.write('# ' + rndm(32) + newLine)
// writeStream.write(newLine)
// writeStream.write('# Hash from deployment:' + newLine)
// writeStream.write('# StringToBeReplacedAtDeployment' + newLine)
/* END FOOTER */

writeStream.end()

console.log('Appcache manifest created!')
