import axios from 'axios';

const apiPath = '/api/v1';
export const projectsPath = '/projects';
export const experiencesPath = '/experiences';
export const skillsPath = '/skills';
export const commentsPath = '/comments';
export const screenshotsPath = '/screenshots';

export const projectsUrl = apiPath + projectsPath;
export const experiencesUrl = apiPath + experiencesPath;
export const skillsUrl = apiPath + skillsPath;

export default {
	projects() {
		return {
			getAll: () => axios.get(projectsUrl),
			getSkills: (id) => axios.get(`${projectsUrl}/${id}${skillsPath}`),
			getComments: (id) => axios.get(`${projectsUrl}/${id}${commentsPath}`),
			getScreenshots: (id) => axios.get(`${projectsUrl}/${id}${screenshotsPath}`),
			createScreenshot: (id, screenshot) => axios.post(`${projectsUrl}/${id}${screenshotsPath}`)
		}
	},

	experiences() {
		return {
			getAll: () => axios.get(experiencesUrl),
			getSkills: (id) => axios.get(`${experiencesUrl}/${id}${skillsPath}`),
			getComments: (id) => axios.get(`${experiencesUrl}/${id}${commentsPath}`)
		}
	},

	skills () {
		return {
			getAll: () => axios.get(skillsUrl)
		}
	},
}
