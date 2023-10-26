function submitForm(){
    document.getElementById("tokeninput").value = localStorage.getItem("token");
    document.getElementById("form").submit();
    closeForm();
}

function searchForm(){
    document.getElementById("searchToken").value = localStorage.getItem("token");
    document.getElementById("searchForm").submit();
}

function addProduct(){
    document.getElementById("overlay").style.display = "block";  
    document.getElementById("addForm").action = "http://localhost:8080/property/upload";
    document.getElementById("addForm").style.display = "block";
    document.getElementById("submitOrupdate").textContent = "上传";
    // closeForm();
}

function updateProduct(){
    document.getElementById("overlay").style.display = "block";  
    document.getElementById("addForm").action = "http://localhost:8080/property/updata";
    document.getElementById("submitOrupdate").textContent = "更新";
    document.getElementById("addForm").style.display = "block";
    // closeForm();
}

function closeForm(){
    document.getElementById("overlay").style.display = "none";
    document.getElementById("addForm").style.display = "none";
}

// 获取表格的引用
const assetTable = document.getElementById("assetTable");

// 模拟30条资产数据
const assetData = [
    ["资产1", "高", "2023-10-25 09:30:00", "是", "类别1", "品牌A", "部门X"]
];

// 循环添加每条资产数据
for (let i = 0; i < assetData.length; i++) {
    const data = assetData[i];
    const newRow = assetTable.insertRow(i + 1); // 插入行

    for (let j = 0; j < data.length; j++) {
        const cell = newRow.insertCell(j);
        cell.textContent = data[j];
    }
    // 添加"删除"按钮
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "删除";
    deleteButton.onclick = function() {
        var ppt_id = newRow.cells[0].innerHTML;
        var secure_level = newRow.cells[1].innerHTML;
        var token=localStorage.getItem("token");
        // post方法
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/property/delete",
            data: {
                ppt_id: ppt_id,
                secure_level: secure_level,
                token: token
            },
            success: function (data) {
                alert("删除成功");
                assetTable.deleteRow(newRow.rowIndex);
            },
            error: function (data) {
                alert("删除失败");
            }
        });
    };
    newRow.insertCell(data.length).appendChild(deleteButton);

    // 添加"更新"按钮
    const updateButton = document.createElement("button");
    updateButton.textContent = "更新";
    updateButton.onclick = updateProduct;
    newRow.insertCell(data.length + 1).appendChild(updateButton);
}
