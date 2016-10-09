export default function infinityLoader(maxNum, articleSource, selector) {
  for (let i = 0; i < maxNum; i++) {
    //   console.log(articleSource[i]);
    selector.innerHTML += articleSource[i]
  }
  if (maxNum < articleSource.length) {
    selector.innerHTML += `<img id="infiniteLoader" src="../images/ajax_loader.gif" style="text-align:center; margin: 36px auto; clear: both; display: block;"/>`
  }

  window.addEventListener('scroll', event => {
    let bottomOffset = window.innerHeight + document.querySelector('body').scrollTop
    let bodyHeight = document.querySelector('body').clientHeight + 100
    if(bottomOffset > bodyHeight){
      console.log(`${bottomOffset} vs ${bodyHeight}`);
      setTimeout( function loader() {
        document.querySelector('#infiniteLoader').parentNode.removeChild(document.querySelector('#infiniteLoader'))
        // console.log("you are at the bottom");
        if (maxNum !== articleSource.length) {
          console.log(maxNum);
          console.log(articleSource.length);
          selector.innerHTML += articleSource[maxNum]
          maxNum ++
          selector.innerHTML += `<img id="infiniteLoader" src="../images/ajax_loader.gif" style="text-align:center; margin: 36px auto; clear: both; display: block;"/>`
        } else {
          maxNum = articleSource.length
        }
      }, 1000)
    }
  })

  return selector.innerHTML
}
