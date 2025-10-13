/**
 * Classic Element Plus component - no border, arrow below, detached dropdown floats below
 *
 * Example:
 * ```
 * <classic-select
 * 	v-model="currentExerciseIndex"
 * 	:options="currentExercises.map((ex, idx) => ({ label: ex.name, value: idx }))"
 * 	@change="exerciseChanged"
 * 	:fit-content="true"
 * ></classic-select>
 * ```
 */
export const ClassicSelect = {
	name: 'ClassicSelect',
	props: {
		modelValue: { type: [Number, String], default: null },
		options: { type: Array, required: true },  // [{ label, value }]
		fitContent: { type: Boolean, required: false, default: false },  // NOTE: this current doesn't center the popover unfortunately
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return { visible: false };
	},
	computed: {
		currentLabel() {
			const selected = this.options.find(
				(opt, idx) => opt.value === this.modelValue || idx === this.modelValue
			);
			return selected ? selected.label : 'Select';
		},
	},
	methods: {
		selectOption(index) {
			const value = this.options[index].value ?? index;
			this.$emit('update:modelValue', value);
			this.$emit('change', value);
			this.visible = false;
		},
	},
	template: `
		<div class="classic-select-wrapper">
			<el-popover
				v-model:visible="visible"
				trigger="manual"
				placement="bottom-start"
				:popper-class="{'classic-select-dropdown': true, 'dropdown-fit-content': fitContent}"
			>
				<!-- Options list -->
				<div>
					<button
						v-for="(option, index) in options"
						:key="index"
						class="classic-select-option"
						@click="selectOption(index)"
					>
						{{ option.label }}
					</button>
				</div>

				<!-- Reference element for popover -->
				<template #reference>
					<div class="classic-select-label" @click="visible = !visible">
						<span>{{ currentLabel }}</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1024 1024" class="classic-select-arrow">
							<path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path>
						</svg>
					</div>
				</template>
			</el-popover>
		</div>
	`
};
