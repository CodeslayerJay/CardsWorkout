// DEFINE VARIABLES AND SETTINGS
var exercises = ['squats', 'crunches', 'pushups', 'pikes'];
var reps = [2,3,4,5,6,7,8,9,10,10,10,10,15];
var workoutList = []; // Array contains exercise + reps per exercise
var completedExercises = [] // List of exercises completed from workout list
var currentExerciseIndex = 0;
var breakCounter = 0;


// PAGE ELEMENTS & NODES
var totalCounter = 0;
var totalCounterEle = document.getElementById('total_exercise_count');
var exerciseTitleEle = document.getElementById('exercise_title');
var exerciseRepEle = document.getElementById('exercise_count');

// ADD EXERCISE TO LIST
function addExercise(name){
    
    // check that name is not empty string
    if(name === "" || name === undefined){
        return;
    }
    
    exercises.push(name);
}

// CREATE WORKOUT
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
    
    //shuffle(workoutList);
}

// REMOVE EXERCISE FROM LIST
function removeExercise(name){
    
    // GET INDEX
    var i = exercises.indexOf(name);

    // CHECK IF IS IN ARRAY
    if( i !== -1){
        
        // REMOVE
        exercises.splice(i, 1);
        
    }
    
}

// MOVE EXERCISE FROM WORKOUT LIST TO COMPLETED
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

// UPDATE TOTAL EXERCISE COUNTER
function updateCounter(){
    
    totalCounter = totalCounter + 1;
    totalCounterEle.innerHTML = totalCounter + "/" + reps.length * exercises.length;

}


// SHUFFLE WORKOUT LIST
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

// NEXT EXERCISE
function updateExercise(){
    
    if( breakCounter === 10){
        exerciseTitleEle.innerHTML = "Take a break";
        exerciseRepEle.innerHTML = "3 mins";
        
        breakCounter = 0;
    }
    
    
    if( totalCounter >= 52 && totalCounter <= 54){
        exerciseTitleEle.innerHTML = "Do all";
        exerciseRepEle.innerHTML = "5";
        
        
    }
    
    
    if( totalCounter >= 54 ){
        exerciseTitleEle.innerHTML = "Way to go!";
        exerciseRepEle.innerHTML = "Workout is complete.";
    }
    else {
        updateCounter();

        currentExerciseIndex = currentExerciseIndex + 1;

        displayExercise();
        breakCounter = breakCounter + 1;
    }
}

function init(){
    createWorkout();
    shuffleWorkoutList(workoutList);
    
    // DISPLAY
    displayExercise();
}

function displayExercise(){
    exerciseTitleEle.innerHTML = workoutList[currentExerciseIndex].exercise;
    exerciseRepEle.innerHTML = workoutList[currentExerciseIndex].reps;
}

// KICKSTART APP
init();