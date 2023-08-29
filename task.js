$(document).ready (function () {

    var incrementedNumberForIdsLastNumber = 1; 
    var taskList = []; 

    function createTask(incrementedNumberForIdsLastNumber) {
    $(document).on("click", "#create-task-button", function () {

        var createTaskTemplate = $("#create-task-template").contents().clone(true);
        $(createTaskTemplate).find("input[type='text']").attr("id", "task-input-box" + incrementedNumberForIdsLastNumber);

        var taskAddButton = $(createTaskTemplate).find("button").attr("id", "task-add-button" + incrementedNumberForIdsLastNumber);
        taskAddButton.data("id", incrementedNumberForIdsLastNumber);

        $(createTaskTemplate).find("span").attr("id", "task-validation-message" + incrementedNumberForIdsLastNumber);
        incrementedNumberForIdsLastNumber++;

        // $("body").append(createTaskTemplate);
        $(createTaskTemplate).insertBefore("#task-container");
    });
    }

    function store(taskList) {
        $(document).on("click", ".store-button", function () {

        // validation 
        var idNumber = $(this).data("id");
        var isInputBlank = $("#task-input-box" + idNumber).val() == "";
        var inputBox = $("#task-input-box" + idNumber); 
        var spanTag = $("#task-validation-message" + idNumber);

        if (isInputBlank) {
            inputBox.addClass("is-invalid");
            spanTag.addClass("is-invalid");
            spanTag.html("Pleas input something");
        } 
        // store task to array
        else {
            taskList.push(inputBox.val());
            $(this).parent().parent().remove();

            listTask();
            message("Task created", "Task added to list successfully");
        }
    });
    }

    function listTask()
    {
        var taskListTemplate = $("#task-list-template").contents().clone(true);

        varListTag = $(taskListTemplate).children("#task-placeholder").eq(0);
        lastIndexOfTaskList = taskList.length - 1;

        varListTag.append(taskList[lastIndexOfTaskList]);
        $("#task-list").append(taskListTemplate);

        $("#task-status").hide();
    }

    
    function message(messageTitle, message) {
        $("#message-title").html(messageTitle);
        const toastLiveExample = $('#liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show();
        $("#message").html(message);
        $("#create-task-container").remove();
    }

    function markTaskAsDone()
    {
        $(document).on("change", "input[type=checkbox]", function () {
            var checkedTask = $(this).parent().parent().clone(true);
            $(checkedTask).children().children("input").remove();
            $("#done-task-list").append(checkedTask);
            $("#task-update-status").hide();

            $(this).parent().parent().remove();         
            message("Task Updated", "Task mark as done!");

            if ($("#task-list").children().length == 0) {
                $("#task-status").show();
            }

        });
    }

    function remove() {
        $(document).on("click", ".btn-delete", function () {
            $(this).parent().parent().remove();

            if ($("#task-list").children().length == 0) {
                $("#task-status").show();
            }

            if ($("#done-task-list").children().length == 0) {
                $("#task-update-status").show();
            }

            message("Task Removed", "Task has been removed");
        });
    }

    function showDeleteAllOption()
    {
        if ($("#task-list").children().length == 1) {
            $("#delete-all-pending-task").removeClass("d-none");
        }
        
        if ($("#done-task-list").children().length == 1) {
            $("#delete-all-done-task").removeClass("d-none");
        }

        if ($("#done-task-list").children().length == 0) {
            $("#delete-all-done-task").addClass("d-none");
        }

        if ($("#task-list").children().length == 0) {
            $("#delete-all-pending-task").addClass("d-none"); 
        }
    }

    function countTask() {
        var pendingTaskCount = $("#task-list").children().length;
        var completedTaskCount = $("#done-task-list").children().length;

        $("#pending-task-count").html(pendingTaskCount);
        $("#completed-task-count").html(completedTaskCount);
        $("#all-task-count").html(completedTaskCount + pendingTaskCount);
    }

    function deleteAllPendingTask() { 
        $(document).on("click", "#delete-all-task-button", function () {
            $("#task-list").html("");
            $("#task-status").show();

            message("Task delete", "All task has been removed");
        });


        $(document).on("click", "#delete-all-done-button", function () {
            $("#done-task-list").html("");
            $("#task-update-status").show();
            message("Task delete", "All task has been removed");
        });
     }

    createTask(incrementedNumberForIdsLastNumber);
    store(taskList);

    markTaskAsDone();
    remove();
    countTask();

    setInterval(countTask, 2);
    setInterval(showDeleteAllOption, 2);

    deleteAllPendingTask();
        

});

// create task





