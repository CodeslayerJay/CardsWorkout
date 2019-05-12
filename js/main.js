/////////////////////////////////////////////////////////////
//  BodyCore Circuits
//  Simple random bodyweight workout generator
//
//  Author: Jeremy Willhelm
//  www.github.com/codeslayerjay
/////////////////////////////////////////////////////////////



/*****************************************
    Configure Default Settings, Etc
*******************************************/

// Initial Exercise Scheme
var exerciseScheme = ['squats', 'crunches', 'pushups', 'pikes'];

// Initial Rep Scheme
var repScheme = [displayTimer(0,30), displayTimer(0,20), displayTimer(0,10), displayReps(20), displayReps(10), displayReps(15)];

// 
var _workout = []; // The workout
var _completedExercises = [] // List of exercises completed from workout list
var _currentExerciseIndex = 0; // Workout list initializer
var _workoutComplete = false;
var _workoutStats = {
    duration: 0,
    exercises_completed: 0,
    reps_completed: 0
};

// APP SETTINGS
var settings = {
    restTimer: 2, // TIMER FOR REST PERIODS - Default: 2 mins
    totalCounter: 0, // COUNTER FOR TOTAL EXERCISES COMPLETED
    breakCounter: 0, // COUNTER TO KEEP TRACK WHEN START REST PERIODS
    workout: 'default', // EXERCISE LIST USED TO GENERATE WORKOUTS
    shuffleCount: 5 // TOTAL SHUFFLES ALLOWED PER WORKOUT
}

///////////////////////////////////////////
// PAGE ELEMENTS, COMPONENTS, NODES
///////////////////////////////////////////
var app = "app"; // Entry point of the app.
var exerciseTimerComponent = "";
var workoutTimerComponent = "";
var 

var pageNodes = {
    entryPoint: document.getElementById(app),
    
}

function displayTimer(mins, secs){

    var minsEle = document.getElementById("mins");
    var secsEle = document.getElementById("secs");
    
    if( mins == null || mins == undefined){
        mins = 0;
    }

    if( secs == null || secs == undefined){
        secs = 0;
    }
    
    setInterval(function () {
        
        if( secs > 59){
            minutes = minutes + 1;
            seconds = 0;
        }
        
        if( seconds < 10){
            secsEle.textContent = "0" + seconds;
        } 
        else {
            secsEle.textContent = seconds;
        }
        
        
        if( minutes < 10 ){
            minsEle.textContent = "0" + minutes;
        }
        else {
            minsEle.textContent = minutes;
        }
        
        seconds = seconds + 1;
        
        workoutStats.duration = minutes + "m : " + seconds + "s";
    }, 1000);
}

function displayReps(count){

}

/////////////////////////////////////////////////////////////
// ADD EXERCISE TO EXERCISE LIST
/////////////////////////////////////////////////////////////
function addExercise(name){
    
    exercises.push(name);
}

/////////////////////////////////////////////////////////////
// Build Workout
/////////////////////////////////////////////////////////////
function WorkoutBuilder(workout){
   
    // clear workout list
    _workout = [];
    
    // FILL WORKOUT LIST WITH EXERCISE AND REP SCHEME
    var i, j;
    for(i=0; i < exercises.length; i++){
        for(j=0; j < reps.length; j++){
            workoutList[i + j * exercises.length] = {
                exercise: exercises[i],
                reps: reps[j]
            }
        }
    }
    
    // SHUFFLE 
    ShuffleWorkout(workoutList);
    
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
    //settings.breakCounter = settings.breakCounter + 1;
    
    // UPDATE EXERCISE COMPLETED COUNTER
    settings.totalCounter = settings.totalCounter + 1;
    nodes.totalCounter.innerHTML = settings.totalCounter + "/" + 52;
    
    // CHECK IF WORKOUT IS COMPLETE
    if(settings.totalCounter >= 52){
        workoutComplete = true;
        
        // DEACTIVATE BUTTON
        document.getElementById("next_exercise_btn").disabled = true;
    }

}

/////////////////////////////////////////////////////////////
// SHUFFLE WORKOUT
/////////////////////////////////////////////////////////////
function ShuffleWorkout(workout) {
    var j, x, i;
    
    if( workout === null || workout === undefined){
        workout = _workout;
    }
    
    for (i = workout.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = workout[i];
        workout[i] = workout[j];
        workout[j] = x;
    }

    return workout;
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
            displayExercise("Rest", "1-3 Mins");

            // START TIMER
            //startRestTimer();
        } else {
            nextExercise();    
        }
    } else {
        completeWorkout();
    }
    
}

/////////////////////////////////////////////////////////////
// MOVE TO NEXT EXERCISE IN LIST
/////////////////////////////////////////////////////////////
function nextExercise(){
    exercise = workoutList[currentExerciseIndex];
    //currentExerciseIndex = currentExerciseIndex + 1;
    
    // UPDATE STATS
    workoutStats.reps_completed = workoutStats.reps_completed + exercise.reps;
    
    $('#page_content').hide(200, function(){
        
        
        completedExercises.push(exercise);
        workoutList.shift();
        
         $(this).show();
         displayExercise(workoutList[0].exercise, workoutList[0].reps);
    });
    
    
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
// COMPLETE WORKOUT
/////////////////////////////////////////////////////////////
function completeWorkout(){

    $('#workout_page').hide();
    $('#stats_page').show();
    
    $('#workout_duration_completed').text(workoutStats.duration);
    $('#workout_exercises_completed').text(settings.totalCounter);
    $('#workout_reps_completed').text(workoutStats.reps_completed);
}


/////////////////////////////////////////////////////////////
// WORKOUT TIMER
/////////////////////////////////////////////////////////////
function workoutTimer() { 
    
    //var display = document.getElementById("workout_timer");
    var minsEle = document.getElementById("mins");
    var secsEle = document.getElementById("secs");
    
    var minutes = 0;
    var seconds = 0;
    
    setInterval(function () {
        
        if( seconds > 59){
            minutes = minutes + 1;
            seconds = 0;
        }
        
        if( seconds < 10){
            secsEle.textContent = "0" + seconds;
        } 
        else {
            secsEle.textContent = seconds;
        }
        
        
        if( minutes < 10 ){
            minsEle.textContent = "0" + minutes;
        }
        else {
            minsEle.textContent = minutes;
        }
        
        seconds = seconds + 1;
        
        workoutStats.duration = minutes + "m : " + seconds + "s";
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
    
    // CHANGE THE REPS FOR PLANKS TO 1 MIN
    workoutList.forEach(function(val){
       
        if( val.exercise === 'plank'){
            val.reps = '1 min';
        }
    });
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


$('#shuffle_workout_btn').click(function(){
    
    // CHECK IF USER STILL HAS SHUFFLES
    if( settings.shuffleCount > 1 ){
        shuffleWorkoutList(workoutList);
        displayExercise(workoutList[currentExerciseIndex].exercise, workoutList[currentExerciseIndex].reps);
        
        //settings.shuffleCount = settings.shuffleCount - 1;
        //$(this).find('span').text(settings.shuffleCount);
    }
    else {
        $(this).remove();
        $('#next_exercise_btn').css('width', '300px').css('margin','0px');
    }
    
});

$('#workout_finish_btn').click(function(){
    completeWorkout();
});

$('#cancel_btn').click(function(){
   window.location.href="";  
});

$('#home_btn').click(function(){
   window.location.href="";  
});

$('#start_new_workout').click(function(){
   window.location.href="";  
});

/////////////////////////////////////////////////////////////
// KICKSTART APP
/////////////////////////////////////////////////////////////
//init();