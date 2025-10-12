export const audioQueFiles = {
	work: 'ding.wav',
	rest: 'dong.wav',
	workoutComplete: 'tada.mp3',
};

export const programs = [
	{
		name: 'Monday Lower Body Strength',
		exercises: [
			{ name: 'Bodyweight Squats', sets: 3, work: 3, rest: 2 }, // ~12 reps
			{ name: 'Glute Bridges', sets: 3, work: 30, rest: 60 }, // ~10 reps
			{ name: 'Lunges', sets: 3, work: 40, rest: 60 }, // ~10 reps/leg
			{ name: 'Calf Raises', sets: 3, work: 30, rest: 60 }, // ~15 reps
			{ name: 'Kegels', sets: 3, work: 50, rest: 0 }, // 5x10-second holds
		],
	},
	{
		name: 'Tuesday HIIT Cardio',
		exercises: [
			{ name: 'High Knees', sets: 8, work: 30, rest: 30 },
			{ name: 'Burpees', sets: 6, work: 20, rest: 40 },
			{ name: 'Mountain Climbers', sets: 8, work: 30, rest: 30 },
			{ name: 'Jumping Jacks', sets: 4, work: 60, rest: 30 },
			{ name: 'Kegels', sets: 3, work: 50, rest: 0 }, // 5x10-second holds
		],
	},
	{
		name: 'Wednesday Core',
		exercises: [
			{ name: 'Planks', sets: 3, work: 30, rest: 60 }, // 20-30s holds
			{ name: 'Russian Twists', sets: 3, work: 30, rest: 60 }, // ~12 reps/side
			{ name: 'Bicycle Crunches', sets: 3, work: 30, rest: 60 }, // ~10 reps/side
			{ name: 'Superman Holds', sets: 3, work: 15, rest: 60 }, // 15s holds
			{ name: 'Kegels (Quick + Long)', sets: 3, work: 60, rest: 0 }, // Quick: 20x1s, Long: 5x10s
		],
	},
	{
		name: 'Thursday Upper Body Strength',
		exercises: [
			{ name: 'Push-Ups', sets: 3, work: 30, rest: 60 }, // ~8-12 reps
			{ name: 'Wall Push-Ups or Dips', sets: 3, work: 30, rest: 60 }, // ~10 reps
			{ name: 'Arm Circles', sets: 3, work: 40, rest: 60 }, // 20 circles each way
			{ name: 'Superman Pulls', sets: 3, work: 30, rest: 60 }, // ~12 reps
			{ name: 'Reverse Kegels', sets: 3, work: 50, rest: 0 }, // 10x5-second holds
		],
	},
	{
		name: 'Friday Yoga and Stretches',
		exercises: [
			{ name: 'Child’s Pose', sets: 3, work: 30, rest: 0 },
			{ name: 'Butterfly Stretch', sets: 3, work: 20, rest: 0 },
			{ name: 'Downward Dog', sets: 3, work: 20, rest: 0 },
			{ name: 'Happy Baby Pose', sets: 3, work: 30, rest: 0 },
			{ name: 'Cat-Cow Pose', sets: 3, work: 30, rest: 0 }, // ~10 reps
			{ name: 'Kegels', sets: 3, work: 30, rest: 0 }, // Integrated holds
		],
	},
];
