export const imageUpload = (ev, selectedFile, imageDisplay, imageUrl) => {
  const file=ev.target.files[0]
  selectedFile.value.push(file)
  // selectedFile.value=ev.target.files[0]
  const reader= new FileReader();
  reader.onload= () =>{
    if(imageUrl){
      imageUrl.value.push(reader.result)
      // imageUrl.value=reader.result
   }
      imageDisplay.value.push(reader.result)
      // imageDisplay.value=reader.result
  }
  reader.readAsDataURL(file)

};