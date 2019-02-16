import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import api from '../APIUtils';
import { projectsUrl, experiencesUrl, skillsUrl } from '../APIUtils';
import { skillsPath } from '../APIUtils';

import { projects, experience, skills } from './data';

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
});

describe('API Experiences', () => {
	it ('should get all experiences', async () => {
		mock.onGet(experiencesUrl).reply(200, experience);

		let response = await api.experiences().getAll().then(response => response.data);
		expect(response).toEqual(experience);
	});

	it('should get all skills association with experiences[0]', async () => {
		let id = experience['id'];
		mock.onGet(`${experiencesUrl}/${id}${skillsPath}`).reply(200, skills);

		let response = await api.experiences().getSkills(id).then(response => response.data);
		expect(response).toEqual(skills);
	});
});

describe('API skills', () => {
	it ('should get all skills', async () => {
		mock.onGet(skillsUrl).reply(200, skills);

		let response = await api.skills().getAll().then(response => response.data)
		expect(response).toEqual(skills);
	});
});
