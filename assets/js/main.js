// section for Modal functionality

const overlay = document.querySelector("#overlay")
const modal = document.querySelector(".modal")
const openModalBtn = document.querySelector(".headBtn")
const closeModalBtn = document.querySelector("#close")
const okModal = document.querySelector("#ok")
const closeOkModal = document.querySelector("#dismiss")
const handleError = document.querySelector(".error")
const contactForm = document.querySelector("#contactForm")
const submitBtn = document.querySelector("#submit")

const messageElem = document.createElement("span");

function openModalForm() {
    modal.classList.remove("hide")
    overlay.classList.add("hidden")
    closeModalBtn.addEventListener("click", closeModalForm, {once: true});
  // addeventListner to retrieve form data when the action "submit" is trigger
    contactForm.addEventListener("submit", submitEmail)
}
function closeModalForm() {
    modal.classList.add("hide")
    overlay.classList.remove("hidden")
    contactForm.reset();
  // remove it when exit since there is no event to listen when the modal is closed
    contactForm.removeEventListener("submit", submitEmail)
}
function dismissModal() {
    okModal.classList.add("hide-note")
    overlay.classList.remove("hidden")
  // remove it when exit since there is no event to listen when the modal is closed
    contactForm.removeEventListener("submit", submitEmail)
}
function openOkModal() {
    modal.classList.add("hide")
    okModal.classList.remove("hide-note")
    closeOkModal.addEventListener("click", dismissModal, {once: true})
}

  // listening for contact Modal
openModalBtn.addEventListener("click", openModalForm);


// Function for submit Email
async function submitEmail(event) {
  event.preventDefault()

  submitBtn.innerText = "En cours d'envoi..."
  if (handleError.contains(messageElem)) {
    handleError.removeChild(messageElem)
  }

  const data = {
    firstName: document.querySelector("#firstname").value,
    lastName: document.querySelector("#lastname").value,
    email: document.querySelector("#email").value,
    message: document.querySelector("#message").value,
  }
  // console.log(data); 
  try {
    const response = await fetch("https://wiki-api-shueiyang.cyclic.app/form", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (response.status === 200) {
      openOkModal()
      contactForm.reset()
    } else {
      messageElem.innerText = "Error: impossible d'envoyer de message"
      handleError.appendChild(messageElem)
    }
  } catch (err) {
    console.error(err)
  } finally {
    submitBtn.innerText = "Envoyer le formulaire"
  }
}



// Section for Scrolling functionality

const scrollContainer1 = document.querySelector("#container1")
const scrollContainer2 = document.querySelector("#container2")
const scrollablePhoto = document.querySelector(".bloc-photo")
const scrollButtons = document.querySelectorAll("#scrollLeft-btn1, #scrollRight-btn1, #scrollLeft-btn2, #scrollRight-btn2")

const widthToScroll = (scrollablePhoto.offsetWidth + 30) * 3;

scrollContainer1.addEventListener("scroll", ()=> {
  displayScrollLeftBtn(scrollContainer1, scrollButtons[0])
})
scrollContainer1.addEventListener("scroll", ()=> {
  displayScrollRightBtn(scrollContainer1, scrollButtons[1])
})
scrollContainer2.addEventListener("scroll", ()=> {
  displayScrollLeftBtn(scrollContainer2, scrollButtons[2])
})
scrollContainer2.addEventListener("scroll", ()=> {
  displayScrollRightBtn(scrollContainer2, scrollButtons[3])
})


scrollButtons.forEach(scrollBtn => {
  switch(scrollBtn.id) {
    case "scrollLeft-btn1":
      scrollBtn.addEventListener("click", ()=> {
        smoothLeftScroll(scrollContainer1)
      })
      break;
    case "scrollRight-btn1":
      scrollBtn.addEventListener("click", ()=> {
        smoothRightScroll(scrollContainer1)
      })
      break;
    case "scrollLeft-btn2":
      scrollBtn.addEventListener("click", ()=> {
        smoothLeftScroll(scrollContainer2)
      })
      break;
    case "scrollRight-btn2":
      scrollBtn.addEventListener("click", ()=> {
        smoothRightScroll(scrollContainer2)
      })
      break;
    default:  // do nothing...
      break;
  }
});



function smoothLeftScroll(containerId) {
  const scrollPosition = containerId.scrollLeft + widthToScroll;
  containerId.scrollTo({
    left: scrollPosition,
    behavior: "smooth"
  })  
}
function smoothRightScroll(containerId) {
  const scrollPosition = containerId.scrollLeft - widthToScroll;
  containerId.scrollTo({
    left: scrollPosition,
    behavior: "smooth"
  })  
}

function displayScrollLeftBtn(containerId, buttonId) {
    const maxScrollLeft = containerId.scrollWidth - containerId.clientWidth;
    if(containerId.scrollLeft >= maxScrollLeft) {
      buttonId.style.display = "none"
    } else {
      buttonId.style.display = "block"
    }
}
function displayScrollRightBtn(containerId, buttonId) {
  if (containerId.scrollLeft === 0) {
    buttonId.style.display = "none"
  } else {
    buttonId.style.display = "block"
  }
}

