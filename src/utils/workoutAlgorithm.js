import { exercises, WEEKLY_ROTATION, WORKOUT_TYPES, DIFFICULTY } from '../data/exercises';

// Generate a seeded random number for consistent daily workouts
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Get workout type for a given day
export function getWorkoutTypeForDay(date = new Date()) {
    const dayOfWeek = date.getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday = 0
    return WEEKLY_ROTATION[adjustedDay];
}

// Generate a unique daily workout
export function generateDailyWorkout(date = new Date(), difficulty = DIFFICULTY.INTERMEDIATE, durationMinutes = 30) {
    const workoutTypeId = getWorkoutTypeForDay(date);
    const workoutType = WORKOUT_TYPES.find(t => t.id === workoutTypeId);

    // Create seed from date for consistent daily workout
    const dateString = date.toISOString().split('T')[0];
    const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);

    // Filter exercises by muscle group and difficulty
    const availableExercises = exercises.filter(ex =>
        workoutType.muscleGroups.includes(ex.muscleGroup) &&
        ex.difficulty <= difficulty
    );

    // Shuffle exercises using seeded random
    const shuffled = [...availableExercises].sort((a, b) =>
        seededRandom(seed + a.id.charCodeAt(0)) - seededRandom(seed + b.id.charCodeAt(0))
    );

    // Build workout based on duration
    const workout = [];
    let totalDuration = 0;
    const targetDuration = durationMinutes * 60; // Convert to seconds

    // Always start with a warm-up cardio exercise
    const warmupExercise = exercises.find(ex => ex.id === 'jumping_jacks');
    if (warmupExercise) {
        workout.push({
            ...warmupExercise,
            sets: 1,
            isWarmup: true
        });
        totalDuration += warmupExercise.duration || 45;
    }

    // Add main exercises
    let exerciseIndex = 0;
    while (totalDuration < targetDuration - 60 && exerciseIndex < shuffled.length) {
        const exercise = shuffled[exerciseIndex];

        // Skip if already in workout
        if (!workout.find(w => w.id === exercise.id)) {
            const sets = difficulty === DIFFICULTY.BEGINNER ? 2 : difficulty === DIFFICULTY.ADVANCED ? 4 : 3;
            const exerciseDuration = exercise.isTimeBased
                ? exercise.duration * sets
                : (exercise.reps * 2) * sets; // Estimate 2 seconds per rep

            workout.push({
                ...exercise,
                sets,
                restBetweenSets: 30
            });

            totalDuration += exerciseDuration + (30 * (sets - 1)); // Add rest time
        }
        exerciseIndex++;
    }

    // Calculate estimated calories
    const estimatedCalories = workout.reduce((total, ex) => {
        return total + (ex.calories || 5) * (ex.sets || 1);
    }, 0);

    return {
        id: `workout_${dateString}`,
        date: dateString,
        type: workoutType,
        difficulty,
        exercises: workout,
        estimatedDuration: Math.ceil(totalDuration / 60),
        estimatedCalories
    };
}

// Format duration for display
export function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
}

// Get difficulty label
export function getDifficultyLabel(level) {
    switch (level) {
        case DIFFICULTY.BEGINNER: return 'Beginner';
        case DIFFICULTY.INTERMEDIATE: return 'Intermediate';
        case DIFFICULTY.ADVANCED: return 'Advanced';
        default: return 'Intermediate';
    }
}

// Calculate streak from workout history
export function calculateStreak(workoutHistory) {
    if (!workoutHistory || workoutHistory.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    // Check if worked out today or yesterday (to not break streak mid-day)
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = new Date(today - 86400000).toISOString().split('T')[0];

    const workedOutToday = workoutHistory.some(w => w.date === todayStr);
    const workedOutYesterday = workoutHistory.some(w => w.date === yesterdayStr);

    if (!workedOutToday && !workedOutYesterday) return 0;

    // Count backwards
    if (!workedOutToday) {
        currentDate = new Date(today - 86400000);
    }

    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (workoutHistory.some(w => w.date === dateStr)) {
            streak++;
            currentDate = new Date(currentDate - 86400000);
        } else {
            break;
        }
    }

    return streak;
}
