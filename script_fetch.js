const tbody = document.getElementById("data-siswa");

// mapping ID kelas → nama kelas (contoh)
const classMap = {
  "0ae66b8b-3439-4561-89fc-c151d9d3d020": "XI-C2"
};

// fungsi bantu: kapitalisasi nama
function capitalizeName(name) {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

fetch("students_rows.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }
    return response.json();
  })
  .then(students => {
    students.forEach((student, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.nis}</td>
        <td>${capitalizeName(student.name)}</td>
        <td>${classMap[student.class_id] || "Tidak diketahui"}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error(error);
    tbody.innerHTML = `
      <tr>
        <td colspan="4">Data gagal dimuat</td>
      </tr>
    `;
  });







