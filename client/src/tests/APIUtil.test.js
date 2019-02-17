import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import api from 'APIUtils';
import { projectsUrl, experiencesUrl, skillsUrl, commentsUrl } from 'APIUtils';
import { skillsPath, commentsPath, screenshotsPath } from 'APIUtils';
import { projects, experiences, skills, comments, screenshots } from './data';

let mock;
beforeEach(() => {
	mock = new MockAdapter(axios);
});

describe('API Projects', () => {
	it ('should get all projects', async () => {
		mock.onGet(projectsUrl).reply(200, projects);

		let response = await api.projects().getAll().then(response => response.data);
		expect(response).toEqual(projects);
	});

	it('should get all skills associated with projects[0]', async () => {
		let id = projects[0]['id'];
		mock.onGet(`${projectsUrl}/${id}${skillsPath}`).reply(200, skills);

		let response = await api.projects().getSkills(id).then(response => response.data);
		expect(response).toEqual(skills);
	});

	it('should get all comments associate with projects[0]', async () => {
		let id = projects[0]['id'];
		mock.onGet(`${projectsUrl}/${id}${commentsPath}`).reply(200, comments);

		let response = await api.projects().getComments(id).then(response => response.data);
		expect(response).toEqual(comments);
	});

	it('should get all screenshots associate with projects[0]', async () => {
		let id = projects[0]['id'];
		mock.onGet(`${projectsUrl}/${id}${screenshotsPath}`).reply(200, screenshots);

		let response = await api.projects().getScreenshots(id).then(response => response.data);
		expect(response).toEqual(screenshots);
	});
});

describe('API experiences', () => {
	it ('should get all experiences', async () => {
		mock.onGet(experiencesUrl).reply(200, experiences);

		let response = await api.experiences().getAll().then(response => response.data);
		expect(response).toEqual(experiences);
	});

	it('should get all skills association with experiences[0]', async () => {
		let id = experiences[0]['id'];
		mock.onGet(`${experiencesUrl}/${id}${skillsPath}`).reply(200, skills);

		let response = await api.experiences().getSkills(id).then(response => response.data);
		expect(response).toEqual(skills);
	});

	it('should get all comments associate with experiences[0]', async () => {
		let id = experiences[0]['id'];
		mock.onGet(`${experiencesUrl}/${id}${commentsPath}`).reply(200, comments);

		let response = await api.experiences().getComments(id).then(response => response.data);
		expect(response).toEqual(comments);
	});
});

describe('API skills', () => {
	it ('should get all skills', async () => {
		mock.onGet(skillsUrl).reply(200, skills);

		let response = await api.skills().getAll().then(response => response.data)
		expect(response).toEqual(skills);
	});
});

describe('API comments', () => {
	it ('should get all comments', async () => {
		mock.onGet(commentsUrl).reply(200, comments);

		let response = await api.comments().getAll().then(response => response.data)
		expect(response).toEqual(comments);
	});
});
