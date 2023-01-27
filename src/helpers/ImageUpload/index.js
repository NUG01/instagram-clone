export const imageUpload = (ev, selectedFile, imageDisplay, imageUrl) => {
  const file=ev.target.files[0]
  selectedFile.value.push(file)
  const reader= new FileReader();
  reader.onload= () =>{
    if(imageUrl){
      imageUrl.value.push(reader.result)
   }
      imageDisplay.value.push(reader.result)
  }
  reader.readAsDataURL(file)

};