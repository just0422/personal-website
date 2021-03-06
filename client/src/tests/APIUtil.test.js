import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import api from 'APIUtils';
import { projectsUrl, experiencesUrl, skillsUrl, contactUrl, resetUrl } from 'APIUtils';
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

	it('should create a screenshot associated with projects[0]', async () => {
		let project_id = projects[0]['id'];
		let screenshot = screenshots[0];
		mock.onPost(`${projectsUrl}/${project_id}${screenshotsPath}`).reply(201);

		let response = await api.projects().createScreenshot(project_id, screenshot);
		expect(response.status).toEqual(201);
	});

	it('should delete a comment associated with projects[0]', async () => {
		let project_id = projects[0]['id'];
		let comment_id = comments[0]['id'];
		mock.onDelete(`${projectsUrl}/${project_id}${commentsPath}/${comment_id}`).reply(200);

		let response = await api.projects().deleteComment(project_id, comment_id);
		expect(response.status).toEqual(200);
	});

	it('should update projects[0]', async () => {
		let project_id = projects[0]['id'];
		mock.onPatch(`${projectsUrl}/${project_id}`).reply(200);

		let response = await api.projects().updateProject(project_id, projects[0]);
		expect(response.status).toEqual(200);
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

describe('API contact', () => {
	it ('should create contact-me email', async () => {
		mock.onPost(contactUrl).reply(200);

		let response = await api.contact().emailContact()
		expect(response.status).toEqual(200);
	});
});

describe('API reset ', () => {
	it ('should reset the data', async () => {
		mock.onGet(resetUrl).reply(200);

		let response = await api.reset().get()
		expect(response.status).toEqual(200);
	});
});

