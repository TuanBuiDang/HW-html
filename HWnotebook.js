// Tạo ô thông tin table
function createtd(content) {
    const td = document.createElement("td");
    td.innerHTML = content;

    return td;
}


// Tạo hàng table
function createtr(task, index) {
    console.log(task);
    const tr = document.createElement("tr");

    // Tạo các ô & thêm vào hàng
    const tdSTT = createtd(index + 1);
    tr.appendChild(tdSTT);

    const tdTaskname = createtd(task.taskname);
    tr.appendChild(tdTaskname);

    const tdStart = createtd(task.start);
    tr.appendChild(tdStart);

    const tdFinish = createtd(task.finish);
    tr.appendChild(tdFinish);

    const tdStatus = createtd(task.status);
    tr.appendChild(tdStatus);

    const tdEditButton = createtd(`<i class="fa-solid fa-pen icon-button" onclick="displayEditForm(${index})"></i>`);
    tr.appendChild(tdEditButton);
    
    const tdDeleteButton = createtd(`<i class="fa-solid fa-trash icon-button" onclick="deleteTask(${index})"></i>`)
    tr.appendChild(tdDeleteButton);

    return tr;
}


// Báo lỗi khi nhập sai
function errorAlert(message, idName) {
    console.log(`Sửa ${idName}` );
    const error = document.getElementById(idName);
    error.style.display = 'block';
    error.innerText = message;
}


// Xóa thông báo lỗi 
function clearError(idName) {
    console.log(`Xóa ${idName}`);
    const error = document.getElementById(idName);
    error.style.display = 'none';
    error.innerText = "";
}


// Hiển thị thông tin table
function displayTasks() {
    const tasktable = document.getElementById("task-list");
    tasktable.innerHTML = "";

    // Tạo hàng cho mỗi phần tử trong array
    for(let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const tr = createtr(task, i);
        tasktable.appendChild(tr);
    }
}


// Chuyển đổi sang ngày / tháng / năm
function fomartDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}


// Xóa task
function deleteTask(index) {
    console.log(`Delete task ${index}`);

    tasks.splice(index, 1);
    console.log(tasks);

    displayTasks();
    saveTask();
}

function reFormatDate(date) {
    const dateArray = date.split('/');

    let day = dateArray[0];
    let month = dateArray[1];
    let year = dateArray[2];

    if(day.length == 1) {
        day = "0" + day;
    } 
    
    if(month.length == 1) {
        month = "0" + month;
    }
    
    const newDate = year + "-" + month + "-" + day;
    console.log(newDate);

    return newDate;
}

// TODO
function displayEditForm(index) {
    console.log(`Open edit form`);

    console.log(`Edit task ${index}`);

    let taskEdit = tasks[index];
    console.log(taskEdit);

    const editForm = document.getElementById('edit-form');
    editForm.style.display = 'block';
    console.log(editForm);

    const editHwComment = document.getElementById("edit-hw-comment");
    editHwComment.value = taskEdit.taskname;
    console.log(editHwComment);

    const editStartDate = document.getElementById("edit-start-date");
    editStartDate.value = reFormatDate(taskEdit.start);
    console.log(editStartDate);

    const editEndDate = document.getElementById("edit-end-date");
    editEndDate.value = reFormatDate(taskEdit.finish);
    console.log(editEndDate);

    if(taskEdit.status === "Chưa hoàn thiện") {
        const editStatus = document.getElementById("edit-status-not-complete")
        editStatus.checked = true;
        console.log(editStatus);
    } else {
        const editStatus = document.getElementById("edit-status-complete")
        editStatus.checked = true;
        console.log(editStatus);
    }

    let editedSubmit = document.getElementById("edit-submit");
    editedSubmit.onclick = function(){
        editTask(index);
        clearEditForm();
    };
}

function clearEditForm() {
    console.log(`Clear edit form`);

    const editForm = document.getElementById('edit-form');
    editForm.style.display = 'none';
    console.log(editForm);

    const editHwComment = document.getElementById("edit-hw-comment");
    editHwComment.value = "";
    console.log(editHwComment);

    const editStartDate = document.getElementById("edit-start-date");
    editStartDate.value = "";
    console.log(editStartDate);

    const editEndDate = document.getElementById("edit-end-date");
    editEndDate.value = "";
    console.log(editEndDate);

    const editStatus = "";
    console.log(editStatus);
}

// TODO
// Chỉnh sửa task
function editTask(index) {
    clearError("error-edit-comment-message");
    clearError("error-edit-start-date-message");
    clearError("error-edit-end-date-message");

    console.log(`Chỉnh sửa task.`);

    // Lấy giá trị nhập vào
    let repariHwComment = document.getElementById("edit-hw-comment").value;
    let repairStartDateInput = document.getElementById("edit-start-date").value;
    let repairEndDateInput = document.getElementById("edit-end-date").value;
    let repairStatus = '';
    if(document.getElementById("edit-status-complete").checked) {
        repairStatus = "Hoàn thiện";
    } else if(document.getElementById("edit-status-not-complete").checked) {
        repairStatus = "Chưa hoàn thiện";
    }

    console.log(`Nội dung task: ${repariHwComment}`);
    console.log(`Ngày giao: ${repairStartDateInput}`);
    console.log(`Ngày hoàn thiện: ${repairEndDateInput}`);
    console.log(`Trạng thái: ${repairStatus}`);

    // Format ngày tháng năm
    let repairStartDate = new Date(repairStartDateInput);
    let repairEndDate = new Date(repairEndDateInput);
    
    console.log(`Ngày giao: ${repairStartDate}`);
    console.log(`Ngày hoàn thiện: ${repairEndDate}`);
    
    // Kiểm tra điều kiện nhập
    let isValid = true;
    if (repariHwComment.length === 0) {
        console.log("Vui lòng nhập nội dung!");
        errorAlert("Vui lòng nhập nội dung!", "error-edit-comment-message");
        isValid = false;
    }
    
    if (isNaN(repairStartDate)) {
        console.log("Vui lòng nhập ngày giao!");
        errorAlert("Vui lòng nhập ngày giao!", "error-edit-start-date-message");
        isValid = false;
    }
    
    if (isNaN(repairEndDate)) {
        console.log("Vui lòng nhập ngày hoàn thiện!");
        errorAlert("Vui lòng nhập ngày hoàn thiện!", "error-edit-end-date-message");
        isValid = false;
    }
    
    if (repairStartDate > repairEndDate) {
        console.log("Ngày hoàn thiện không được trước ngày giao!");
        errorAlert("Ngày hoàn thiện không được trước ngày giao!", "error-edit-end-date-message");
        isValid = false;
    }

    if(isValid === true) {
        // Tạo task mới
        let editedTask = {
            taskname: repariHwComment, 
            start: fomartDate(repairStartDate), 
            finish: fomartDate(repairEndDate),
            status: repairStatus
        };
        console.log(editedTask);

        tasks[index] = editedTask;
        console.log(tasks);

        displayTasks();
        saveTask();

        const editForm = document.getElementById('edit-form');
        editForm.style.display = 'none';
    }
}


//Lưu dữ liệu
function saveTask() {
    const taskJSON = JSON.stringify(tasks);
    localStorage.setItem("taskList", taskJSON);
}


// Thêm task mới
function addTask() {
    // Xóa thông báo lỗi
    clearError("error-add-comment-message");
    clearError("error-add-start-date-message");
    clearError("error-add-finish-date-message");

    console.log(`Task mới.`);

    // Lấy giá trị nhập vào
    let hwcomment = document.getElementById("add-hw-comment").value;
    let startdateInput = document.getElementById("add-start-date").value;
    let enddateInput = document.getElementById("add-end-date").value;

    console.log(`Nội dung task: ${hwcomment}`);
    console.log(`Ngày giao: ${startdateInput}`);
    console.log(`Ngày hoàn thiện: ${enddateInput}`);

    // Format ngày tháng năm
    let startDate = new Date(startdateInput);
    let endDate = new Date(enddateInput);
    
    console.log(`Ngày giao: ${startDate}`);
    console.log(`Ngày hoàn thiện: ${endDate}`);
    
    // Kiểm tra điều kiện nhập
    let isValid = true;
    if (hwcomment.length === 0) {
        console.log("Vui lòng nhập nội dung!");
        errorAlert("Vui lòng nhập nội dung!", "error-add-comment-message");
        isValid = false;
    }
    
    if (isNaN(startDate)) {
        console.log("Vui lòng nhập ngày giao!");
        errorAlert("Vui lòng nhập ngày giao!", "error-add-start-date-message");
        isValid = false;
    }
    
    if (isNaN(endDate)) {
        console.log("Vui lòng nhập ngày hoàn thiện!");
        errorAlert("Vui lòng nhập ngày hoàn thiện!", "error-add-finish-date-message");
        isValid = false;
    }
    
    if (startDate > endDate) {
        console.log("Ngày hoàn thiện không được trước ngày giao!");
        errorAlert("Ngày hoàn thiện không được trước ngày giao!", "error-add-finish-date-message");
        isValid = false;
    }

    if(isValid === true) {
        // Tạo task mới
        let newTask = {
            taskname: hwcomment, 
            start: fomartDate(startDate), 
            finish: fomartDate(endDate),
            status: "Chưa hoàn thiện"
        };
        console.log(newTask);

        // Thêm phần tử ở cuối Array
        tasks.push(newTask);
        console.log(tasks);

        // Cập nhật hiển thi
        displayTasks();
        saveTask();
    }
}


let taskInfo = localStorage.getItem("taskList");
let tasks = JSON.parse(taskInfo);
console.log(tasks);

displayTasks();

console.log(tasks);


