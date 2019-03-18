import axios from 'axios';

const fileHeader = { headers: { 'Content-Type': 'multipart/form-data' } }

const apiPath = '/api/v1';
export const projectsPath = '/projects';
export const experiencesPath = '/experiences';
export const skillsPath = '/skills';
export const commentsPath = '/comments';
export const screenshotsPath = '/screenshots';
export const contactPath = '/contact'

export const projectsUrl = apiPath + projectsPath;
export const experiencesUrl = apiPath + experiencesPath;
export const skillsUrl = apiPath + skillsPath;
export const contactUrl = apiPath + contactPath;
export const resetUrl = '/reset';

export default {
  projects() {
    return {
      getAll: () => axios.get(projectsUrl),
      getSkills: id => axios.get(`${projectsUrl}/${id}${skillsPath}`),
      getComments: id => axios.get(`${projectsUrl}/${id}${commentsPath}`),
			getScreenshot: (project_id, screenshot_id) => axios.get(`${projectsUrl}/${project_id}${screenshotsPath}/${screenshot_id}`),
      getScreenshots: id => axios.get(`${projectsUrl}/${id}${screenshotsPath}`),
      createScreenshot: (id, screenshot) => axios.post(`${projectsUrl}/${id}${screenshotsPath}`, screenshot, fileHeader),
      updateProject: (id, project) => axios.patch(`${projectsUrl}/${id}`, project),
			deleteComment: (project_id, comment_id) => axios.delete(`${projectsUrl}/${project_id}${commentsPath}/${comment_id}`),
    };
  },

  experiences() {
    return {
      getAll: () => axios.get(experiencesUrl),
      getSkills: id => axios.get(`${experiencesUrl}/${id}${skillsPath}`),
      getComments: id => axios.get(`${experiencesUrl}/${id}${commentsPath}`),
    };
  },

  skills() {
    return {
      getAll: () => axios.get(skillsUrl),
    };
	},

	contact() {
		return {
			emailContact: (contact) => axios.post(contactUrl, contact),
		}
	},

	reset() {
		return {
			get: () => axios.get(resetUrl)
		}
	}
};
