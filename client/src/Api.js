import axios from 'axios';

const apiPath = '/api/v1';
export const projectsPath = '/projects';
export const experiencesPath = '/experiences';
export const skillsPath = '/skills';

export const projectsUrl = apiPath + projectsPath;
export const experiencesUrl = apiPath + experiencesPath;
export const skillsUrl = apiPath + skillsPath;

export default {
	projects() {
		return {
			getAll: () => axios.get(projectsUrl),
			getSkills: (id) => axios.get(`${projectsUrl}/${id}${skillsPath}`)
		}
	},

	experiences() {
		return {
			getAll: () => axios.get(experiencesUrl),
			getSkills: (id) => axios.get(`${experiencesUrl}/${id}${skillsPath}`)
		}
	},

	skills () {
		return {
			getAll: () => axios.get(skillsUrl)
		}
	}
}
