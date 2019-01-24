/////////////////////////////////////////////////////////////
//  BodyCore Circuits
//  Simple random bodyweight workout generator
//
//  Author: Jeremy Willhelm
/////////////////////////////////////////////////////////////
var exercises = ['squats', 'crunches', 'pushups', 'pikes'];


// EXERCISES & REPS


var reps = [2,3,4,5,6,7,8,9,10,10,10,10,15];
var wildcardExercise1 = {
    exercise: "do each exercise",
    reps: 5
};
var wildcardExercise2 ={
    exercise: "do each exercise",
    reps: 8
};

// APP VARIABLES
var workoutList = []; // Array contains exercise + reps per exercise
var completedExercises = [] // List of exercises completed from workout list
var currentExerciseIndex = 0; // Workout list initializer
var workoutComplete = false;

// APP SETTINGS
var settings = {
    restTimer: 2, // TIMER FOR REST PERIODS - Default: 2 mins
    totalCounter: 0, // COUNTER FOR TOTAL EXERCISES COMPLETED
    breakCounter: 0, // COUNTER TO KEEP TRACK WHEN START REST PERIODS
    workout: 'default' // EXERCISE LIST USED TO GENERATE WORKOUTS
}


// PAGE ELEMENTS & NODES
var nodes = {
    totalCounter: document.getElementById('total_exercise_count'),
    exercise: document.getElementById('exercise_title'),
    reps: document.getElementById('exercise_count')
}

/////////////////////////////////////////////////////////////
// ADD EXERCISE TO EXERCISE LIST
/////////////////////////////////////////////////////////////
function addExercise(name){
    
    exercises.push(name);
}

/////////////////////////////////////////////////////////////
// CREATE WORKOUT
/////////////////////////////////////////////////////////////
function createWorkout(workout){
   
    // clear workout list
    workoutList = [];
    
    var i, j;

    // FILL WORKOUT LIST WITH EXERCISE AND REP SCHEME
    for(i=0; i < exercises.length; i++){
        for(j=0; j < reps.length; j++){
            workoutList[i + j * exercises.length] = {
                exercise: exercises[i],
                reps: reps[j]
            }
        }
    }
    
    // SHUFFLE 
    shuffleWorkoutList(workoutList);
    
    // ADD WILDCARD EXERCISES
    //workoutList.push(wildcardExercise1);
    //workoutList.push(wildcardExercise2);
}

/////////////////////////////////////////////////////////////
// REMOVE EXERCISE FROM LIST
/////////////////////////////////////////////////////////////
function removeExercise(name){
    
    // GET INDEX
    var i = exercises.indexOf(name);

    // CHECK IF IS IN ARRAY
    if( i !== -1){
        
        // REMOVE
        exercises.splice(i, 1);
        
    }
    
}

/////////////////////////////////////////////////////////////
// MOVE EXERCISE FROM WORKOUT LIST TO COMPLETED
/////////////////////////////////////////////////////////////
function moveExerciseToComplete(name){
    
    // CHECK IF EXERCISE IS IN WORKOUT LIST
    var i = workoutList.indexOf(name);
    
    if( i !== -1 ){
        completedExercises.push(workoutList[i]);
        workoutList.splice(i,1);
        
        // UPDATE COUNTER
        updateCounter();
    }
}

/////////////////////////////////////////////////////////////
// UPDATE TOTAL COUNTER ELEMENT/NODE
/////////////////////////////////////////////////////////////
function updateCounter(){
    
    // UPDATE BREAK COUNTER
    settings.breakCounter = settings.breakCounter + 1;
    
    // UPDATE EXERCISE COMPLETED COUNTER
    settings.totalCounter = settings.totalCounter + 1;
    nodes.totalCounter.innerHTML = settings.totalCounter + "/" + workoutList.length;
    
    // CHECK IF WORKOUT IS COMPLETE
    if(settings.totalCounter >= workoutList.length){
        workoutComplete = true;
        
        // DEACTIVATE BUTTON
        document.getElementById("next_exercise_btn").disabled = true;
    }

}

/////////////////////////////////////////////////////////////
// SHUFFLE WORKOUT LIST
/////////////////////////////////////////////////////////////
function shuffleWorkoutList(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/////////////////////////////////////////////////////////////
// UPDATE EXERCISE TO DISPLAY
// MOVE TO NEXT EXERCISE IN LIST
/////////////////////////////////////////////////////////////
function updateExercise(){
    
    updateCounter();
    
    if( !workoutComplete ){
        // CHECK IF COUNTER IS AT 10, THEN DISPLAY REST PERIOD
        if( settings.breakCounter === 10){

            settings.breakCounter = 0; // RESET COUNTER TO 0

            // UPDATE TEXT
            displayExercise("Rest", "2 mins");

            // START TIMER
            //startRestTimer();
        } else {
            nextExercise();    
        }
    } else {
        nodes.exercise.innerHTML = "Way to go!";
        nodes.reps.innerHTML = "Workout is complete.";
    }
    
}

/////////////////////////////////////////////////////////////
// MOVE TO NEXT EXERCISE IN LIST
/////////////////////////////////////////////////////////////
function nextExercise(){
    currentExerciseIndex = currentExerciseIndex + 1;

    displayExercise(workoutList[currentExerciseIndex].exercise, workoutList[currentExerciseIndex].reps);
}

/////////////////////////////////////////////////////////////
// INITIALIZE APP
/////////////////////////////////////////////////////////////
function init(){
    createWorkout();
    shuffleWorkoutList(workoutList);
    
    // DISPLAY
    updateCounter();
    workoutTimer();
    displayExercise(workoutList[currentExerciseIndex].exercise, workoutList[currentExerciseIndex].reps);
}

/////////////////////////////////////////////////////////////
// UPDATE/DISPLAY EXERCISE AND REPS TEXT
/////////////////////////////////////////////////////////////
function displayExercise(main, sub){
        
    nodes.exercise.innerHTML = main; // MAIN HEADER TEXT
    nodes.reps.innerHTML = sub; // SUBHEADER TEXT
    
}

/////////////////////////////////////////////////////////////
// WORKOUT TIMER
/////////////////////////////////////////////////////////////
function workoutTimer() { 
    
    var display = document.getElementById("workout_timer");
    var minutes = 0;
    var seconds = 0;
    
    setInterval(function () {
        
        if( seconds > 60){
            minutes = minutes + 1;
            seconds = 0;
        }
        
        if( seconds < 10){
            display.textContent = "0" + minutes + ":0" + seconds;
        } 
        else {
            display.textContent =  "0" + minutes + ":" + seconds;
        }
        
        seconds = seconds + 1;
    }, 1000);
}


/////////////////////////////////////////////////////////
// UI INTERACTIVITY - JQuery
/////////////////////////////////////////////////////////
$('#show_info_page_btn').click(function(){
    $('#front_page').hide();
    $('#more_info_page').show();
});

$('#info_back_btn').click(function(){
    $('#more_info_page').hide();
    $('#front_page').show();
});

$('#beginner_workout_btn').click(function(){
    $('#front_page').hide();
    $('#workout_page').show();
    init();
});

$('#int_workout_btn').click(function(){
    $('#front_page').hide();
    $('#workout_page').show();
    
    exercises = ['incline pushups', 'elevated pikes', 'situps', 'pushups'];
    init();
});

$('#adv_workout_btn').click(function(){
    $('#front_page').hide();
    $('#workout_page').show();
    
    exercises = ['incline pushups', 'elevated pikes', 'burpees', 'pull-ups'];
    init();
});

$('#upper_body_workout_btn').click(function(){
    $('#front_page').hide();
    $('#workout_page').show();
    
    exercises = ['incline pushups', 'pikes', 'pushups', 'pull-ups'];
    init();
});

$('#lower_body_workout_btn').click(function(){
    $('#front_page').hide();
    $('#workout_page').show();
    
    exercises = ['squats', 'lunges', 'bridges', 'knee-highs'];
    init();
});

$('#core_workout_btn').click(function(){
    $('#front_page').hide();
    $('#workout_page').show();
    
    exercises = ['crunches', 'plank', 'leg raises', 'mountain climber'];
    init();
});

$('#custom_workout_btn').click(function(){
    $('#front_page').hide();
    $('#edit_page').show();
    
});

$('#custom_workout_form').on('submit', function(e){
    e.preventDefault();
    
    var data = $(this).serializeArray();
    exercises = [];
    
    data.forEach(function(el){
        exercises.push(el.value);   
    });
    
    $('#edit_page').hide();
    $('#workout_page').show();
    
    init();
});



$('#cancel_btn').click(function(){
   window.location.href="";  
});

$('#home_btn').click(function(){
   window.location.href="";  
});

/////////////////////////////////////////////////////////////
// KICKSTART APP
/////////////////////////////////////////////////////////////
//init();