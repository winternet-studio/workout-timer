async function importNonCached(path) {
	return import(`${path}?v=${Date.now()}`);
}

const { createApp, ref, computed, onMounted, watch } = Vue;
const { programs, audioCueFiles } = await importNonCached('./config.js');
const { ClassicSelect } = await importNonCached('./components/ClassicSelect.js');
const { default: WakeLockManager } = await importNonCached('./helpers/WakeLockManager.js');

const app = createApp({
	setup() {
		const isRunning = ref(false);
		const currentExerciseIndex = ref(0);
		const currentSet = ref(1);
		const isWorkPhase = ref(true);
		const isQuickTimerActive = ref(false); // New state for quick rest timers
		const timeLeft = ref(0);
		const timerId = ref(null);
		const selectedProgram = ref(programs[0]?.name || ''); // Default to first program
		const currentExercises = ref(programs[0]?.exercises || []);
		const workAudio = new Audio(audioCueFiles.work);
		const restAudio = new Audio(audioCueFiles.rest);
		const workoutCompleteAudio = new Audio(audioCueFiles.workoutComplete);

		let wakeLockManager = null;

		const currentExercise = computed(() => {
			return currentExerciseIndex.value < currentExercises.value.length
				? currentExercises.value[currentExerciseIndex.value]
				: null;
		});

		const formatTime = (seconds) => {
			const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
			const secs = (seconds % 60).toString().padStart(2, '0');
			return `${mins}:${secs}`;
		};

		const startTimer = (duration) => {
			timeLeft.value = duration;
			isRunning.value = true;
			timerId.value = setInterval(() => {
				if (timeLeft.value <= 0) {
					clearInterval(timerId.value);
					if (isQuickTimerActive.value) {
						// End of quick rest timer, return to workout
						isQuickTimerActive.value = false;
						isRunning.value = false;
						timeLeft.value = currentExercises.value[currentExerciseIndex.value]?.work || 0;
					} else if (isWorkPhase.value && currentExercise.value?.rest) {
						// Switch to rest phase
						isWorkPhase.value = false;
						startTimer(currentExercise.value.rest);
					} else {
						// End of rest or work-only exercise, move to next set or exercise
						isWorkPhase.value = true;
						if (currentSet.value < currentExercise.value?.sets) {
							currentSet.value++;
							startTimer(currentExercise.value.work);
						} else {
							currentExerciseIndex.value++;
							currentSet.value = 1;
							if (currentExerciseIndex.value < currentExercises.value.length) {
								startTimer(currentExercises.value[currentExerciseIndex.value].work);
							} else {
								isRunning.value = false; // Workout complete
							}
						}
					}
				} else {
					timeLeft.value--;
				}
				if (timeLeft.value <= 0) {
					if (currentExercise.value || isQuickTimerActive.value) {
						if (isWorkPhase.value) {  // isWorkPhase doesn't change until next interval
							restAudio.play().catch(e => console.error('Rest audio play failed:', e));
						} else {
							workAudio.play().catch(e => console.error('Work audio play failed:', e));
						}
					} else {
						workoutCompleteAudio.play().catch(e => console.error('Work audio play failed:', e));
					}
				}
			}, 1000);
		};

		// Workout controls
		const startWorkout = () => {
			if (!isRunning.value && !isQuickTimerActive.value && currentExercise.value) {
				startTimer(currentExercise.value.work);
			}
		};

		const pauseWorkout = () => {
			clearInterval(timerId.value);
			isRunning.value = false;
		};

		const resetWorkout = (options = {}) => {
			clearInterval(timerId.value);
			isRunning.value = false;
			isQuickTimerActive.value = false;
			if (!options.keepExercise) {
				currentExerciseIndex.value = 0;
			}
			currentSet.value = 1;
			isWorkPhase.value = true;
			timeLeft.value = currentExercises.value[currentExerciseIndex.value]?.work || 0;
		};

		// Quick timer
		const startQuickTimer = (duration) => {
			if (!isRunning.value) {
				isQuickTimerActive.value = true;
				startTimer(duration);
			}
		};

		const loadProgram = (programName) => {
			const program = programs.find(p => p.name === programName);
			if (program) {
				currentExercises.value = program.exercises;
				resetWorkout();
			}
		};

		const exerciseChanged = () => {
			resetWorkout({keepExercise: true});
		};

		const setClicked = () => {
			if (currentSet.value < currentExercise.value.sets) {
				currentSet.value++;
			}
		};

		watch(isRunning, (newVal, oldVal) => {
			if (newVal) {
				wakeLockManager.requestKeepScreenOn();
			} else {
				wakeLockManager.releaseKeepScreenOn();
			}
		});

		onMounted(() => {
			wakeLockManager = new WakeLockManager();
			window.addEventListener('WakeLockManager.logMessage', (ev) => {
				if (ev.detail.type == 'info') return;
				ElementPlus.ElMessage({
					message: ev.detail.message + (ev.detail.err ? ' '+ JSON.stringify(ev.detail.err) : ''),
					type: (ev.detail.type == 'warn' ? 'warning' : ev.detail.type), // 'success' | 'warning' | 'info' | 'error'
				});
			});
		});

		// Initialize
		if (currentExercises.value.length > 0) {
			timeLeft.value = currentExercises.value[0].work;
		}

		return {
			isRunning,
			currentExerciseIndex,
			currentExercise,
			currentSet,
			isWorkPhase,
			isQuickTimerActive,
			timeLeft,
			formatTime,
			startWorkout,
			pauseWorkout,
			resetWorkout,
			startQuickTimer,
			selectedProgram,
			currentExercises,
			programs,
			loadProgram,
			exerciseChanged,
			setClicked,
		};
	},
});

app.use(ElementPlus);
app.component('classic-select', ClassicSelect);
app.mount('#app');
