function swalAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

function bookSuc(customerName, phone, amount, date, time) {
    Swal.fire({
        title: 'Book Information',
        html: `
<div style="background-color: #47635b; color: white; padding: 15px; border-radius: 8px; text-align: center;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <p>Name: </p>
        <p style="color: #feeedd;">${customerName}</p>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <p>Phone: </p>
        <p style="color: #feeedd;">${phone}</p>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <p>Amount Of People: </p>
        <p style="color: #feeedd;">${amount}</p>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <p>Date: </p>
        <p style="color: #feeedd;">${date}</p>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <p>Arrive Time: </p>
        <p style="color: #feeedd;">${time}</p>
    </div>
</div>
<hr>
<div style="text-align: center; margin-top: 10px; background-color: #feeedd; padding: 5px; border-radius: 8px;">
    <h3 style="color: red; font-weight: bold;">
        Successful Booking
    </h3>
    <div class="swal2-icon swal2-success swal2-icon-show" style="margin-top: 0;">
        <div class="swal2-success-ring"></div>
        <span class="swal2-success-line-tip" style="background-color:#ada28f;"></span>
        <span class="swal2-success-line-long" style="background-color:#ada28f;"></span>
    </div>
</div>`,
        confirmButtonText: 'Pre-order Foods',
        cancelButtonText: 'Back To Main',
        showCancelButton: true,
        background: '#274b44',
        color: '#feeedd',
        customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            confirmButton: 'swal-confirm-btn',
            cancelButton: 'swal-cancel-btn'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            preOrder(customerName, phone, amount, date, time);
        }
    });
}

