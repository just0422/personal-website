import axios from 'axios';

const apiUrl = '/api/v1';
export const projectsUrl = apiUrl + '/projects';
export const experiencesUrl = apiUrl + '/experiences';
export const skillsUrl = apiUrl + '/skills';

export default {
	projects() {
		return {
			getAll: () => axios.get(projectsUrl)
		}
	},

	experiences() {
		return {
			getAll: () => axios.get(experiencesUrl)
		}
	},

	skills () {
		return {
			getAll: () => axios.get(skillsUrl)
		}
	}
}
