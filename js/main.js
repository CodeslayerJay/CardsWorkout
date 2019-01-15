/////////////////////////////////////////////////////////////
//  BodyCircuits/z
//  Simple random bodyweight workout generator
//
//  Author: Jeremy Willhelm
/////////////////////////////////////////////////////////////

// EXERCISES & REPS
var exercises = ['squats', 'crunches', 'pushups', 'pikes'];
var reps = [2,3,4,5,6,7,8,9,10,10,10,10,15];
var wildcardExercise1 = {
    exercise: "do all",
    reps: 5
};
var wildcardExercise2 ={
    exercise: "do all",
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
    breakCounter: 0 // COUNTER TO KEEP TRACK WHEN START REST PERIODS
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
function createWorkout(){
   
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
    
    // ADD WILDCARD EXERCISES
    workoutList.push(wildcardExercise1);
    workoutList.push(wildcardExercise2);
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
            displayExercise("Take a break", "2 mins");

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
// KICKSTART APP
/////////////////////////////////////////////////////////////
init();