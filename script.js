// دالة لتسجيل الطالب في localStorage
function registerStudent() {
    const studentName = document.getElementById("studentName").value;
    const level = document.getElementById("level").value;

    if (studentName && level) {
        // التحقق إذا كان الاسم مسجل مسبقًا
        if (isNameRegistered(studentName)) {
            document.getElementById("error-message").style.display = "block";
            document.getElementById("confirmation-message").style.display = "none";
        } else {
            // حفظ البيانات في localStorage وعرض رسالة النجاح
            localStorage.setItem(studentName, JSON.stringify({ level: level }));
            document.getElementById("confirmation-message").style.display = "block";
            document.getElementById("error-message").style.display = "none";
        }
    }
}

// دالة للتحقق مما إذا كان الاسم مسجل مسبقًا
function isNameRegistered(name) {
    return localStorage.getItem(name) !== null;
}

// دالة إخفاء رسائل التأكيد والخطأ عند البدء بكتابة اسم جديد
function hideConfirmationMessage() {
    document.getElementById("confirmation-message").style.display = "none";
    document.getElementById("error-message").style.display = "none";
}

// دالة لتحميل قائمة المشاركين وعرضها في الجدول
function loadParticipants() {
    const tableBody = document.getElementById("participants-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // مسح محتويات الجدول قبل تحميل البيانات

    for (let i = 0; i < localStorage.length; i++) {
        const name = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(name));
        const level = data.level;

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const levelCell = document.createElement("td");
        levelCell.textContent = level;

        row.appendChild(nameCell);
        row.appendChild(levelCell);
        tableBody.appendChild(row);
    }
}

// تحميل قائمة المشاركين عند فتح صفحة participants.html
if (document.getElementById("participants-table")) {
    window.onload = loadParticipants;
}