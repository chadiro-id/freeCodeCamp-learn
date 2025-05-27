/* file: script.js */
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');

const orderNo = document.getElementById('order-no');
const productCode = document.getElementById('product-code');
const quantity = document.getElementById('quantity');

const complaintsGroup = document.getElementById('complaints-group');
const complaintDescription = document.getElementById('complaint-description');

const solutionsGroup = document.getElementById('solutions-group');
const solutionDescription = document.getElementById('solution-description');

const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');

const otherComplaint = document.getElementById('other-complaint');
const otherSolution = document.getElementById('other-solution');

function validateForm() {
  const validatingObject = {};
  const minComplaintDescription = otherComplaint.checked ? 20 : 0;
  const minSolutionDescription = otherSolution.checked ? 20 : 0;

  validatingObject['full-name'] = fullName.value.trim() !== '';
  validatingObject['email'] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  validatingObject['order-no'] = /^(2024)\d{6}/.test(orderNo.value);
  validatingObject['product-code'] = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/.test(productCode.value);
  validatingObject['quantity'] = quantity.value > 0;

  validatingObject['complaints-group'] = complaintsGroup.querySelectorAll('input[type="checkbox"]:checked').length > 0;
  validatingObject['complaint-description'] = complaintDescription.value.trim().length >= minComplaintDescription;

  validatingObject['solutions-group'] = solutionsGroup.querySelectorAll('input[type="radio"]:checked').length > 0;
  validatingObject['solution-description'] = solutionDescription.value.trim().length >= minSolutionDescription;
  
  return validatingObject;
}

function isValid(validateForm) {
  for (const key in validateForm) {
    if (!validateForm[key]) {
      return false;
    }
  }
  return true;
}

form.addEventListener('change', (e) => {
  const target = e.target;
  const fieldName = target.id;
  const isValidField = validateForm()[fieldName];
  
  if(target.tagName === 'INPUT') {
    if(target.type !== 'checkbox' && target.type !== 'radio') {
      target.style.borderColor = isValidField ? 'green' : 'red';
    }
  }

  complaintDescription.style.borderColor = isValidField ? 'green' : 'red';
  solutionDescription.style.borderColor = isValidField ? 'green' : 'red';

  complaintsGroup.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
      const isChecked = Array.from(complaintsGroup.querySelectorAll('input')).some(checkbox => checkbox.checked);
      complaintsGroup.style.borderColor = isChecked ? 'green' : 'red';
    });
  });
  
  solutionsGroup.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
      const isChecked = Array.from(solutionsGroup.querySelectorAll('input')).some(checkbox => checkbox.checked);
      solutionsGroup.style.borderColor = isChecked ? 'green' : 'red';
    });
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(isValid(validateForm())) {
    form.submit();
  }
});