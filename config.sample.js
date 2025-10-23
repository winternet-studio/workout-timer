export const audioCueFiles = {
	work: 'ding.wav',
	rest: 'dong.wav',
	workoutComplete: 'tada.mp3',
};

export const programs = [
	{
		name: 'Monday Lower Body Strength',
		exercises: [
			{ name: 'Bodyweight Squats', sets: 3, work: null, rest: 30, repetitions: 12 },
			{ name: 'Glute Bridges', sets: 3, work: null, rest: 30, repetitions: 10 },
			{ name: 'Lunges', sets: 3, work: null, rest: 30, repetitions: 10, per: 'leg' },
			{ name: 'Calf Raises', sets: 3, work: null, rest: 30, repetitions: 15 },
			{ name: 'Kegels (integrate)', sets: 3, work: 5, rest: 5, repetitions: 10, restBetweenSets: 30 },
		],
	},
	{
		name: 'Tuesday HIIT Cardio',
		exercises: [
			{ name: 'High Knees', sets: 8, work: 30, rest: 30 },
			{ name: 'Burpees', sets: 6, work: 20, rest: 40 },
			{ name: 'Mountain Climbers', sets: 8, work: 30, rest: 30 },
			{ name: 'Jumping Jacks', sets: 4, work: 60, rest: 30 },
			{ name: 'Kegels', sets: 5, work: 10, rest: 10 },
		],
	},
	{
		name: 'Wednesday Core',
		exercises: [
			{ name: 'Planks', sets: 3, work: 30, rest: 60 },
			{ name: 'Russian Twists', sets: 3, work: null, rest: 60, repetitions: 12, per: 'side' },
			{ name: 'Bicycle Crunches', sets: 3, work: null, rest: 60, repetitions: 10, per: 'side' },
			{ name: 'Superman Holds', sets: 3, work: 15, rest: 30 },
			{ name: 'Kegels (Quick)', sets: 3, work: 1, rest: 1, repetitions: 20, restBetweenSets: 30 },
			{ name: 'Kegels (Long)', sets: 3, work: 10, rest: 10, repetitions: 5, restBetweenSets: 30 },
		],
	},
	{
		name: 'Thursday Upper Body Strength',
		exercises: [
			{ name: 'Push-Ups', sets: 3, work: null, rest: 30, repetitions: 12 },
			{ name: 'Dips', sets: 3, work: null, rest: 60, repetitions: 10 },
			{ name: 'Arm Circles', sets: 3, work: null, rest: 60, repetitions: 20, per: 'direction' },
			{ name: 'Superman Pulls', sets: 3, work: null, rest: 60, repetitions: 12 },
			{ name: 'Reverse Kegels (integrate)', sets: 3, work: 5, rest: 5, repetitions: 10, restBetweenSets: 30 },
		],
	},
	{
		name: 'Friday Yoga and Stretches',
		exercises: [
			{ name: 'Child’s Pose', sets: 3, work: 30, rest: 30 },
			{ name: 'Butterfly Stretch', sets: 3, work: 20, rest: 20 },
			{ name: 'Downward Dog', sets: 3, work: 20, rest: 20 },
			{ name: 'Happy Baby Pose', sets: 3, work: 30, rest: 30 },
			{ name: 'Cat-Cow Pose', sets: 3, work: 10, rest: 30 },
			{ name: 'Kegels (integrate)', sets: 3, work: 30, rest: 0 },
		],
	},
];
