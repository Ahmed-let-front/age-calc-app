const elements = {
  dayInp: document.getElementById('day'),
  monthInp: document.getElementById('month'),
  yearInp: document.getElementById('year'),
  allInps: document.querySelectorAll('.field-input'),
  resYearsEl: document.getElementById('res-years'),
  resDaysEl: document.getElementById('res-days'),
  resMonthEl: document.getElementById('res-months'),
  formInpClac: document.getElementById('formInpClac'),
  allRess: document.querySelectorAll('.result-number'),
  hasErr: false,
  currYear: 0,
  currDay: 0,
  currMonth: 0,
  get allStates() {
    return [
      [this.currDay, this.dayInp],
      [this.currYear, this.yearInp],
      [this.currMonth, this.monthInp],
    ];
  },
};
const calcAge = e => {
  returnInputToInitState();
  const inptsVal = Array.from(elements.allInps);
  const [DD, MM, YY] = inptsVal;
  inptsVal.forEach(el => {
    if (+el.value === 0) {
      displayErr(el, 'This field is requierd');
      elements.hasErr = true;
    }
  });
  const now = new Date();
  elements.currYear = now.getFullYear() - YY.value;
  elements.currDay = now.getDate() - DD.value;
  elements.currMonth = now.getMonth() + 1 - MM.value;
  elements.allStates.forEach(([val, inp]) => {
    const type = inp.closest('div').querySelector('label').textContent.toLowerCase();
    if (val < 0) {
      displayErr(inp, `Must be a vaild ${type}`);
      elements.hasErr = true;
    }
  });
  if (elements.hasErr) return;
  clearInputs();
  displayAge();
};
const clearInputs = () => {
  elements.allInps.forEach(el => (el.value = ''));
  document.activeElement.blur();
};
const returnUi = () => {
  elements.allInps.forEach(el => {
    const parentEl = el.closest('div');
    const messageLabel = parentEl.querySelector('.field-error');
    const fieldLabel = parentEl.querySelector('.field-label');
    const filedInput = parentEl.querySelector('.field-input');
    filedInput.classList.remove('border-red-400');
    fieldLabel.classList.remove('text-red-400');
    messageLabel.textContent = '';
  });
  elements.allRess.forEach(el => {
    el.textContent = '--';
  });
};
const returnStates = () => {
  elements.hasErr = false;
  elements.currDay = 0;
  elements.currMonth = 0;
  elements.currYear = 0;
};
const returnInputToInitState = () => {
  returnStates();
  returnUi();
};
const displayAge = () => {
  elements.resDaysEl.textContent = elements.currDay;
  elements.resMonthEl.textContent = elements.currMonth;
  elements.resYearsEl.textContent = elements.currYear;
};
const displayErr = (el, message) => {
  const parentEl = el.closest('div');
  const messageLabel = parentEl.querySelector('.field-error');
  const fieldLabel = parentEl.querySelector('.field-label');
  const filedInput = parentEl.querySelector('.field-input');
  filedInput.classList.add('border-red-400');
  fieldLabel.classList.add('text-red-400');
  messageLabel.textContent = message;
};
const handleCalc = () => {
  elements.formInpClac.addEventListener('submit', e => {
    e.preventDefault();
    calcAge(e);
  });
};
const init = () => {
  handleCalc();
};
init();
