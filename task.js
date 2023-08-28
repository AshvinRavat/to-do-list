$(document).ready(function () {
    
    showTaskInput();
    var isValidationError = addTaskToList() == "empty";

    if (isValidationError) {
        $("#error").html("Pleas input something");            
        return;
    }
    addTaskToDone();
    removeTask();
});

function showTaskInput() {
    $("#create-task").click(function () {
        var newTaskContainerTemplate = $("#new-task-container-template").contents().clone(true);
        newTaskContainerTemplate.insertBefore("#task-container");
    });
}

function addTaskToList() {
    $(document).on("click", "#add-task", function () {
        
        var listItemTemplate = $("#list-item-template").contents().clone(true);

        var newTask = $("#task").val();
        if (newTask == '') {
            return "empty";
        }

        var taskListItem = listItemTemplate.filter("li").eq(0);
        
        taskListItem.children().eq(0).val(newTask);
        taskListItem.append(newTask);
        
        $("#current-task-container").append(listItemTemplate);

        hideTaskInputAndTaskStatus();
        message("Task Created", "Task added successfully");
    }); 
}

function hideTaskInputAndTaskStatus() {
    $("#task").val("");
    $("#info-task").hide();
}
    
function message(messageTitle, message) {
    $("#message-title").html(messageTitle);
    const toastLiveExample = $('#liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show();
    $("#message").html(message);
    $("#create-task-container").remove();
}

function removeTask() {
    $(document).on("click", ".btn-close", function () {
        if ($("#current-task-container").children("li").length == 1) {
            $("#info-task").show();
        }
        $(this).parent().remove();

        message("Task Removed", "Task clear successfully");
    });
}

function addTaskToDone()
{
    $(document).on("change", "input[type=checkbox]", function () {

        if ($("#current-task-container").children("li").length == 1) {
            $("#info-task").show();
        }
       
        var doneTask = $(this).parent().clone();
        var removeDoneTask = $(this).parent();
        
        doneTask.children("input").eq(0).remove();

        doneTask.addClass("bi bi-check");
        $("#info-done-task").hide();
        $("#done-task-list").append(doneTask);
        removeDoneTask.remove();

        message("Task Added", "Task done!");
        
    });
}