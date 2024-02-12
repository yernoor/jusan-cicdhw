import Swal from 'sweetalert2';

export default function AlertMessage(message, status) {
  if (status === 'error') {
    Swal.fire(`${message}`, '', `${status}`).then((result) => {
      if (result.isConfirmed) {
        // window.location.reload();
      }
    });
  } else {
    Swal.fire('Успешно!', `${message}`, `${status}`).then((result) => {
      if (result.isConfirmed) {
        window.location = '/profile';
      }
    });
  }
}
