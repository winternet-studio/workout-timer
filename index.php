<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Workout Timer</title>
	<script src="https://unpkg.com/vue@3"></script>
	<script src="//cdn.jsdelivr.net/npm/element-plus"></script>
	<link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
	<link rel="stylesheet" href="components/ClassicSelect.css">
<style>
[v-cloak] {
	display: none;
}
body {
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: 0;
	background-color: #f4f4f4;
}
#app {
	text-align: center;
	background: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	max-width: 600px;
	width: 100%;
}
.timer {
	font-size: 3em;
	color: #ff4d4f;
	margin: 20px 0;
	font-weight: bold;
}
.exercise-info {
	margin: 10px 0;
	font-size: 1.2em;
	color: #333;
}
.el-select {
	margin-bottom: 20px;
}
.rest-buttons {
	margin-top: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
}
</style>
</head>
<body>

<div id="app" v-cloak>
	<h1>Workout Timer</h1>

	<!--
	<el-select v-model="selectedProgram" placeholder="Select Workout Day" @change="loadProgram">
		<el-option
			v-for="program in programs"
			:key="program.name"
			:label="program.name"
			:value="program.name"
		/>
	</el-select>
	-->
	<classic-select
		v-model="selectedProgram"
		:options="programs.map((pg, idx) => ({ label: pg.name, value: pg.name }))"
		@change="loadProgram"
		:fit-content="true"
	></classic-select>
	<el-segmented
		v-model="currentExerciseIndex"
		:options="currentExercises.map((exercise, key) => ({
			label: exercise.name,
			value: key
		}))"
		@change="exerciseChanged"
	/></el-segmented>
	<div v-if="isQuickTimerActive">
		<h2>Quick Timer</h2>
		<p class="exercise-info">&nbsp;<!-- Set X of X --></p>
		<p class="exercise-info">&nbsp;<!-- Rest --></p>
		<div class="timer">{{ formatTime(timeLeft) }}</div>
		<el-button v-if="!isRunning" type="primary" @click="startWorkout">Resume Workout</el-button>
		<el-button v-if="isRunning" type="warning" @click="pauseWorkout">Pause</el-button>
		<el-button type="danger" @click="resetWorkout">Reset</el-button>
	</div>
	<div v-else-if="currentExercise">
		<h2>{{ currentExercise.name }}</h2>
		<p class="exercise-info" @click="setClicked" :title="currentSet < currentExercise.sets ? 'Press to advance set' : null">Set {{ currentSet }} of {{ currentExercise.sets }}</p>
		<p class="exercise-info">{{ isWorkPhase ? 'Work' : 'Rest' }}</p>
		<div class="timer">{{ formatTime(timeLeft) }}</div>
		<el-button v-if="!isRunning" type="primary" @click="startWorkout">Start Workout</el-button>
		<el-button v-if="isRunning" type="warning" @click="pauseWorkout">Pause</el-button>
		<el-button type="danger" @click="() => resetWorkout({keepExercise: true})" @dblclick="() => resetWorkout({keepExercise: false})">Reset</el-button>
	</div>
	<div v-else>
		<p>Workout Complete!</p>
		<el-button type="success" @click="resetWorkout">Restart Workout</el-button>
	</div>
	<h3>Quick Timers</h3>
	<div class="rest-buttons">
		<el-button
			v-for="duration in [10, 20, 30, 45, 60, 90]"
			:key="duration"
			:disabled="isRunning"
			@click="startQuickTimer(duration)"
		>
			{{ duration }}s
		</el-button>
	</div>
</div>

<!-- Use ESM versions -->
<script>
const script = document.createElement('script');
script.type = 'module';
script.src = `app.js?v=${Date.now()}`;
document.head.appendChild(script);
</script>

</body>
</html>
