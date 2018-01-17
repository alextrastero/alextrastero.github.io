(() => {
  var style = `
    font-family: 'Georgia';
    font-weight: 600;
    font-size: 1.5em;
    background: -webkit-linear-gradient(33deg, #283c86, #45a247);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #283c86;
  `

  const log = (text) => console.log(`%c ${text[0]} `, style)

  log`Alexander Garth Odell`
  log`Frontend Developer based in Berlin`
  log`Current: babbel`
  log`Previous: wimdu | gameduell | betvictor`
  log`+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
  log`github.com/alextrastero`
  log`linkedin.com/in/alexandergarthodell`
})()
