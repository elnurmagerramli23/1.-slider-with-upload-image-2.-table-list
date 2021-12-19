const upload = document.querySelector('#upload-img');
const uploadContainer = document.querySelector('.upload__container');
const modalImage = document.querySelector('.modal img');
const closeIcon = document.querySelector('.modal .closeModal')
const nextBtn = document.querySelector('.modal .rightSlide')
const leftBtn = document.querySelector('.modal .leftSlide')

/*   Functions with keyboard buttons   */

document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' && (document.querySelector('.modal').style.display === 'flex')) {
    closeModal();
  }
  if (e.code === 'ArrowRight') nextSlide()
  if (e.code === 'ArrowLeft') nextSlide()
});

const imgs = [];

uploadContainer.addEventListener('click', function (e) {
  if (!e.target.src) return
  openModal(e.target.src)
})

/*  Upload image  */

upload.addEventListener('change', onUpload)

function onUpload(event) {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    if (!file.type.match('image')) return;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const { result } = e.target;
      uploadContainer.innerHTML += `<img src="${result}"  />`
      imgs.push(result)
    };

    reader.readAsDataURL(file);
  });
}

/*   Open Modal   */

function openModal(path) {
  document.querySelector('.modal').style.display = 'flex';
  modalImage.setAttribute('src', path);
}

/*   Close Modal   */

function closeModal() {
  document.querySelector('.modal').style.display = 'none';
}

/*   Close modal on click close   */

closeIcon.addEventListener('click', ()=>{
  closeModal()
})

/*   Close Modal on click outside   */

document.addEventListener('click', (e)=>{
  if (e.target.classList.contains('modal')){
    closeModal()
  }
})

/*   Next slide   */

function nextSlide() {
  const currentIndex = imgs.indexOf(modalImage.src)
  if (currentIndex === imgs.length - 1 ) {
    modalImage.src = imgs[0]
    return;
  }

  modalImage.src = imgs[currentIndex + 1]
}

nextBtn.addEventListener('click', function () {
  nextSlide()
})

function prevSlide() {
  const currentIndex = imgs.indexOf(modalImage.src)
  if (currentIndex === 0){
    modalImage.src = imgs[imgs.length - 1]
    return;
  }
  modalImage.src = imgs[currentIndex - 1]
}

leftBtn.addEventListener('click', function () {
  prevSlide()
})