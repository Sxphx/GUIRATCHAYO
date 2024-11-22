document.getElementById('phone').addEventListener('input', function (event) {
  let value = event.target.value.replace(/\D/g, '');
  if (value.length > 3 && value.length <= 6) {
    value = value.replace(/(\d{3})(\d{1,})/, '$1-$2');
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1-$2-$3');
  }
  event.target.value = value;
});

const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");

const today = new Date();
const maxDate = new Date();
maxDate.setDate(today.getDate() + 7);

dateInput.min = today.toISOString().split("T")[0];
dateInput.max = maxDate.toISOString().split("T")[0];

dateInput.addEventListener("change", () => {
  const selectedDate = new Date(dateInput.value);
  const day = selectedDate.getDay(6);

  const times = {
    0: ["18:00", "01:00"],
    1: ["18:00", "01:00"],
    2: ["18:00", "01:00"],
    3: null,
    4: ["18:00", "01:00"],
    5: ["18:00", "03:00"],
    6: ["18:00", "03:00"],
  };

  if (times[day] === null) {
    alert("Sorry, we are closed on Wednesdays!");
    dateInput.value = "";
    return;
  }

  const [startTime, endTime] = times[day];
  generateTimeOptions(startTime, endTime);
});

function generateTimeOptions(start, end) {
  let [startHour, startMinute] = start.split(":").map(Number);
  let [endHour, endMinute] = end.split(":").map(Number);

  if (endHour < startHour) {
    endHour += 24;
  }

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute <= endMinute)
  ) {
    const hour = startHour % 24;
    const formattedTime = `${String(hour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`;
    const option = document.createElement("option");
    option.value = formattedTime;
    option.textContent = formattedTime;
    timeSelect.appendChild(option);

    startMinute += 30;
    if (startMinute >= 60) {
      startMinute -= 60;
      startHour += 1;
    }
  }
}

function validateBooking() {
  const form = document.getElementById("book-form");

  const customerName = form.customerName.value;
  const phone = form.phone.value;
  const date = form.date.value;
  const time = form.time.value;
  const amountOfPeople = form.amountOfPeople.value;

  if (customerName && phone && date && time && amountOfPeople) {
    bookSuc(customerName, phone, amountOfPeople, date, time);
  } else {
    swalAlert("error", "Please fill all required fields.", "Please check your information.");
  }
}

function showBookModal(customerName, phone, date, time, amountOfPeople) {
  const bookModal = document.getElementById("Book-modal");

  document.getElementById("bookedName").textContent = "Name: " + customerName;
  document.getElementById("bookedPhone").textContent = "Phone: " + phone;
  document.getElementById("bookedAmount").textContent = "Amount of People: " + amountOfPeople;
  document.getElementById("bookedDate").textContent = "Date: " + date;
  document.getElementById("bookedTime").textContent = "Time: " + time;

  const modalInstance = new bootstrap.Modal(bookModal);
  modalInstance.show();
}

function preOrder(customerName, phone, amount, date, time) {
  const url = `Menu.html?customerName=${customerName}&phone=${phone}&amount=${amount}&date=${date}&time=${time}`;

  window.open(url, '_blank');
}

