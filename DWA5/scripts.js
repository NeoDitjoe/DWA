const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  try {
    
    if (divider === '' || dividend === ''){
      result.innerText = 'Division not performed. Both values are required in inputs. Try again'
    }
    else if (dividend < 0 || divider < 0){
      result.innerText = 'Division not performed. Invalid number provided. Try again'
      throw 'Division not performed. Invalid number provided. Try again'
    }
    else if (isNaN(divider) || isNaN(dividend)){
      document.querySelector('body').innerText = 'Something critical went wrong. Please reload the page'
      throw 'Something critical went wrong. Please reload the page'
    }
    else{
      result.innerText = parseInt(dividend / divider);
    }
  } catch (error) {
    console.error(new Error(error))
  }
});