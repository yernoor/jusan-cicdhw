import Swal from "sweetalert2";
export default function AlertMsg(status, property) {
  if (status === "download") {
    Swal.fire("Отлично!", "Ваша анкета скачивается!", "success");
  }
}
